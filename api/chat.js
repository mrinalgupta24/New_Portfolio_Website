import { answer } from './_lib/assistant.js'

// Vercel serverless function: POST /api/chat  { messages: [{ role: 'user' | 'assistant', content }] }
export async function POST(request) {
  let payload = {}
  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  try {
    const { status, body } = await answer({
      messages: payload.messages,
      ip: (request.headers.get('x-forwarded-for') || '').split(',')[0].trim(),
      origin: request.headers.get('origin'),
      host: request.headers.get('host'),
      env: process.env,
    })
    return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    console.error('chat function failed', err)
    return Response.json({ error: 'The assistant is unavailable right now.' }, { status: 500 })
  }
}
