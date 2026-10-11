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
 * @param {{ messages: unknown, ip: string, origin: string | null, host: string | null, env: Record<string,string|undefined>, geo?: { country?: string, city?: string } }} input
 */
export async function answer({ messages, ip, origin, host, env, geo = {} }) {
  // Only accept calls from this site, not from other websites embedding the endpoint.
  if (origin && host && new URL(origin).host !== host) return json(403, { error: 'Forbidden' })

  if (!env.GEMINI_API_KEY && !env.GROQ_API_KEY) return json(503, { error: 'The assistant is not configured yet.' })
  if (rateLimited(ip || 'unknown')) return json(429, { error: 'Too many questions at once. Please wait a minute.' })

  if (!Array.isArray(messages) || messages.length === 0) return json(400, { error: 'No message.' })
  const clean = messages
    .slice(-MAX_MESSAGES)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
  if (clean.length === 0 || clean[clean.length - 1].role !== 'user') return json(400, { error: 'No message.' })

  let provider = 'gemini'
  let reply = await askGemini(clean, env)
  if (!reply) {
    provider = 'groq'
    reply = await askGroq(clean, env)
  }
  // Logging runs after the reply is sent (the caller schedules `background`), so it never slows the chat.
  const background = () => logQuestion(env, {
    question: clean[clean.length - 1].content,
    turn: clean.filter((m) => m.role === 'user').length,
    provider: reply ? provider : 'failed',
    answer: reply ? reply.slice(0, 2000) : '',
    country: geo.country || '',
    city: geo.city || '',
  })
  if (reply) return { ...json(200, { reply }), background }
  return { ...json(502, { error: 'The assistant is busy right now. Please try again in a moment.' }), background }
}

// Sends each question to a Google Sheet (Apps Script web app) so Mrinal can see what visitors ask.
// Never blocks or breaks the chat: it gives up after 2.5 s and ignores errors.
async function logQuestion(env, entry) {
  if (!env.CHAT_LOG_WEBHOOK_URL) return
  try {
    // Apps Script saves the row, then answers with a 302 to its result page. Follow that hop
    // ourselves with a plain GET (automatic redirect-following re-sends the POST and fails).
    const res = await fetch(env.CHAT_LOG_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ secret: env.CHAT_LOG_SECRET || '', time: new Date().toISOString(), ...entry }),
      redirect: 'manual',
      signal: AbortSignal.timeout(4000),
    })
    const next = res.headers.get('location')
    if (next) await fetch(next, { signal: AbortSignal.timeout(2500) }).catch(() => {})
  } catch {
    /* logging is best-effort */
  }
}

// Gemini first, with a tight time budget: when Google is overloaded it can hang, and Groq (the backup)
// answers in about a second, so it's faster to hand over than to wait or retry another Gemini model.
const GEMINI_TIMEOUT_MS = 5000

async function askGemini(messages, env) {
  if (!env.GEMINI_API_KEY) return null
  const models = [env.GEMINI_MODEL || 'gemini-flash-latest']
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
    // Low thinking keeps answers fast; this assistant only does factual lookups.
    generationConfig: { temperature: 0.4, maxOutputTokens: 600, thinkingConfig: { thinkingLevel: 'low' } },
  })
  for (const model of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body,
        signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      })
      if (!res.ok) {
        console.error(`Gemini ${model} error`, res.status, (await res.text().catch(() => '')).slice(0, 200))
        continue
      }
      const data = await res.json()
      const text = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim()
      if (text) return text
    } catch (err) {
      console.error(`Gemini ${model} failed`, err.message)
    }
  }
  return null
}

// Groq (OpenAI-compatible) as the backup when Gemini is down or rate-limited.
async function askGroq(messages, env) {
  if (!env.GROQ_API_KEY) return null
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: env.GROQ_MODEL || 'openai/gpt-oss-120b',
        temperature: 0.4,
        max_tokens: 700,
        reasoning_effort: 'low',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) {
      console.error('Groq error', res.status, (await res.text().catch(() => '')).slice(0, 200))
      return null
    }
    const data = await res.json()
    return data.choices?.[0]?.message?.content?.trim() || null
  } catch (err) {
    console.error('Groq failed', err.message)
    return null
  }
}
