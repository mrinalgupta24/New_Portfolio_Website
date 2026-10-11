// Lightweight service checks for the status page. They never call the AI model itself,
// so monitoring costs no tokens.

const ping = async (url, headers) => {
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(6000) })
    return res.ok
  } catch {
    return false
  }
}

const checks = {
  // The AI is up if at least one provider accepts our key.
  ai: async (env) => {
    const [gemini, groq] = await Promise.all([
      env.GEMINI_API_KEY
        ? ping('https://generativelanguage.googleapis.com/v1beta/models?pageSize=1', { 'x-goog-api-key': env.GEMINI_API_KEY })
        : false,
      env.GROQ_API_KEY ? ping('https://api.groq.com/openai/v1/models', { Authorization: `Bearer ${env.GROQ_API_KEY}` }) : false,
    ])
    return { ok: gemini || groq, detail: { gemini, groq } }
  },
  // Web3Forms blocks automated probes, so this confirms the form is configured.
  contact: async (env) => ({ ok: Boolean(env.VITE_WEB3FORMS_ACCESS_KEY), detail: {} }),
}

export async function health(service, env) {
  const names = service && checks[service] ? [service] : Object.keys(checks)
  const results = Object.fromEntries(await Promise.all(names.map(async (n) => [n, await checks[n](env)])))
  const ok = Object.values(results).every((r) => r.ok)
  return {
    status: ok ? 200 : 503,
    body: {
      status: ok ? 'ok' : 'degraded',
      checkedAt: new Date().toISOString(),
      services: Object.fromEntries(Object.entries(results).map(([n, r]) => [n, r.ok ? 'operational' : 'down'])),
    },
  }
}
