import { buildStatus } from './_lib/status.js'

// GET /api/status: live status for the themed /status page (cached briefly at the edge).
export async function GET() {
  try {
    const { status, body } = await buildStatus(process.env)
    return Response.json(body, {
      status,
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch (err) {
    console.error('status failed', err)
    return Response.json({ error: 'Status is temporarily unavailable.' }, { status: 502 })
  }
}
