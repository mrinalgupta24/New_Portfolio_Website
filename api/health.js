import { health } from './_lib/health.js'

// GET /api/health            all services
// GET /api/health?service=ai single service (used by the status page monitors)
export async function GET(request) {
  const service = new URL(request.url).searchParams.get('service')
  const { status, body } = await health(service, process.env)
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}
