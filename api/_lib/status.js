// Builds the data for the themed /status page from Better Stack.
// The Better Stack token stays on the server; the browser only sees this summary.

const API = 'https://uptime.betterstack.com/api/v2'
const DAYS = 90
const REGION_NAMES = { us: 'North America', eu: 'Europe', as: 'Asia', au: 'Australia' }

const day = (d) => d.toISOString().slice(0, 10)

async function bs(path, token) {
  const res = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`Better Stack ${path} -> ${res.status}`)
  return res.json()
}

async function all(path, token) {
  const out = []
  let next = path
  for (let i = 0; next && i < 10; i++) {
    const data = await bs(next, token)
    out.push(...(data.data || []))
    next = data.pagination?.next ? data.pagination.next.replace(API, '') : null
  }
  return out
}

export async function buildStatus(env) {
  const token = env.BETTERSTACK_API_TOKEN
  const pageId = env.BETTERSTACK_STATUS_PAGE_ID
  if (!token || !pageId) return { status: 503, body: { error: 'Status page is not configured.' } }

  const now = new Date()
  const from = new Date(now.getTime() - (DAYS - 1) * 864e5)

  // The status page's own layout (sections, public names, order) drives what we show.
  const [sections, resources, monitors] = await Promise.all([
    all(`/status-pages/${pageId}/sections`, token),
    all(`/status-pages/${pageId}/resources`, token),
    all('/monitors', token),
  ])
  const monitorById = Object.fromEntries(monitors.map((m) => [m.id, m.attributes]))
  const shown = resources
    .map((r) => r.attributes)
    .filter((r) => r.resource_type === 'Monitor' && monitorById[String(r.resource_id)])

  const ids = new Set(shown.map((r) => String(r.resource_id)))
  // Response times for the main website monitor (first one shown).
  const primary = shown[0]

  // Incidents, per-monitor uptime and response times are independent: fetch them in parallel.
  const [rawIncidents, slas, rt] = await Promise.all([
    all(`/incidents?from=${day(from)}&to=${day(now)}&per_page=50`, token),
    Promise.all(
      shown.map((r) =>
        bs(`/monitors/${r.resource_id}/sla?from=${day(from)}&to=${day(now)}`, token)
          .then((d) => d.data.attributes.availability)
          .catch(() => null)
      )
    ),
    primary ? bs(`/monitors/${primary.resource_id}/response-times`, token).catch(() => null) : null,
  ])
  const incidents = rawIncidents
    .map((i) => ({ id: i.id, ...i.attributes, monitorId: String(i.relationships?.monitor?.data?.id || '') }))
    .filter((i) => ids.has(i.monitorId))

  let regions = []
  if (rt) {
    try {
      regions = (rt.data.attributes.regions || []).map((r) => {
        const points = r.response_times.slice(-30).map((p) => Math.round(p.response_time * 1000))
        return {
          code: r.region,
          name: REGION_NAMES[r.region] || r.region.toUpperCase(),
          latest: points[points.length - 1] ?? null,
          average: points.length ? Math.round(points.reduce((a, b) => a + b, 0) / points.length) : null,
          points,
        }
      })
    } catch {
      regions = []
    }
  }

  const components = shown
    .map((r) => {
      const m = monitorById[String(r.resource_id)]
      const created = new Date(m.created_at)
      const own = incidents.filter((i) => i.monitorId === String(r.resource_id))
      const days = []
      for (let i = 0; i < DAYS; i++) {
        const d = new Date(from.getTime() + i * 864e5)
        const key = day(d)
        if (key < day(created)) {
          days.push({ date: key, state: 'none' })
          continue
        }
        const start = new Date(`${key}T00:00:00Z`).getTime()
        const end = start + 864e5
        const downMs = own.reduce((sum, inc) => {
          const s = Math.max(start, new Date(inc.started_at).getTime())
          const e = Math.min(end, inc.resolved_at ? new Date(inc.resolved_at).getTime() : Date.now())
          return sum + Math.max(0, e - s)
        }, 0)
        days.push({ date: key, state: downMs === 0 ? 'up' : downMs < 30 * 60e3 ? 'degraded' : 'down', downMinutes: Math.round(downMs / 60e3) })
      }
      const state = m.paused ? 'paused' : m.status === 'up' ? 'operational' : m.status === 'down' ? 'down' : m.status === 'validating' || m.status === 'pending' ? 'operational' : 'degraded'
      return {
        id: String(r.resource_id),
        name: r.public_name || m.pronounceable_name,
        description: r.explanation || '',
        section: String(r.status_page_section_id || ''),
        state,
        uptime: slas[shown.indexOf(r)] ?? null,
        lastChecked: m.last_checked_at,
        days,
        primary: primary ? String(r.resource_id) === String(primary.resource_id) : false,
      }
    })

  const states = components.map((c) => c.state)
  const overall = states.includes('down') ? 'major' : states.includes('degraded') ? 'partial' : 'operational'

  return {
    status: 200,
    body: {
      generatedAt: now.toISOString(),
      overall,
      sections: sections
        .map((s) => ({ id: String(s.id), name: s.attributes.name, position: s.attributes.position }))
        .sort((a, b) => a.position - b.position),
      components,
      regions,
      incidents: incidents
        .sort((a, b) => new Date(b.started_at) - new Date(a.started_at))
        .slice(0, 20)
        .map((i) => ({
          id: i.id,
          component: components.find((c) => c.id === i.monitorId)?.name || i.name,
          cause: i.cause,
          startedAt: i.started_at,
          resolvedAt: i.resolved_at,
        })),
    },
  }
}
