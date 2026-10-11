import { SYSTEM_PROMPT } from './knowledge.js'

// Shared by the Vercel function (api/chat.js) and the local Vite dev middleware (vite.config.js).

const MAX_MESSAGES = 12
const MAX_CHARS = 600
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 12

// Best-effort per-IP limit. Serverless instances are short-lived, so this only stops bursts from one
// visitor; Gemini's own quota is the hard ceiling.
const hits = new Map()
const rateLimited = (ip) => {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

const json = (status, body) => ({ status, body })

/**
 * @param {{ messages: unknown, ip: string, origin: string | null, host: string | null, env: Record<string,string|undefined> }} input
 */
export async function answer({ messages, ip, origin, host, env }) {
  // Only accept calls from this site, not from other websites embedding the endpoint.
  if (origin && host && new URL(origin).host !== host) return json(403, { error: 'Forbidden' })

  if (!env.GEMINI_API_KEY) return json(503, { error: 'The assistant is not configured yet.' })
  if (rateLimited(ip || 'unknown')) return json(429, { error: 'Too many questions at once. Please wait a minute.' })

  if (!Array.isArray(messages) || messages.length === 0) return json(400, { error: 'No message.' })
  const clean = messages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
  if (clean.length === 0 || clean[clean.length - 1].role !== 'user') return json(400, { error: 'No message.' })

  const model = env.GEMINI_MODEL || 'gemini-2.5-flash'
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: clean.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 500,
        // Flash 2.5 "thinks" by default; this assistant only needs fast, factual lookups.
        ...(model.includes('2.5-flash') ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
      },
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('Gemini error', res.status, detail.slice(0, 300))
    if (res.status === 429) return json(429, { error: 'The assistant is busy right now. Please try again shortly.' })
    return json(502, { error: 'The assistant is unavailable right now.' })
  }

  const data = await res.json()
  const reply = (data.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || '')
    .join('')
    .trim()
  if (!reply) return json(502, { error: 'The assistant had no answer. Please rephrase your question.' })
  return json(200, { reply })
}
