import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { HiSparkles, HiXMark, HiPaperAirplane, HiArrowPath } from 'react-icons/hi2'
import avatar from '../../images/mrinalgupta-avatar.webp'
import { Bio } from '../../data/constants'

// Shown only once the server has a Gemini key (set VITE_ASSISTANT_ENABLED=true alongside GEMINI_API_KEY).
export const ASSISTANT_ENABLED = import.meta.env.VITE_ASSISTANT_ENABLED === 'true'

export const OPEN_ASSISTANT_EVENT = 'open-assistant'
export const openAssistant = (question) =>
  window.dispatchEvent(new CustomEvent(OPEN_ASSISTANT_EVENT, { detail: { question } }))

const SUGGESTIONS = [
  'What did he build at Keychain?',
  'What are his AI skills?',
  'Tell me about his experience',
  'How can I contact him?',
]

const GREETING = {
  role: 'assistant',
  content: `Hi! I'm Mrinal's AI. Ask me anything about his experience, AI projects, skills or certifications.`,
}

/* ---------- styles ---------- */

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(232, 93, 117, 0.55); }
  70% { box-shadow: 0 0 0 14px rgba(232, 93, 117, 0); }
  100% { box-shadow: 0 0 0 0 rgba(232, 93, 117, 0); }
`
const blink = keyframes`
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
`

const Launcher = styled(motion.button)`
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 150;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 54px;
  padding: 0 20px 0 8px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14.5px;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.gradient};
  box-shadow: 0 14px 36px -12px ${({ theme }) => theme.accent};
  animation: ${pulse} 2.6s infinite;
  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.85);
    object-fit: cover;
  }
  @media (max-width: 520px) {
    right: 14px;
    bottom: 14px;
    padding: 0 8px;
    span.label {
      display: none;
    }
  }
`

const Panel = styled(motion.section)`
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 160;
  width: 390px;
  height: min(600px, calc(100vh - 44px));
  height: min(600px, calc(100svh - 44px));
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  isolation: isolate;
  background: rgba(16, 16, 26, 0.92);
  border: 1px solid ${({ theme }) => theme.borderStrong};
  backdrop-filter: saturate(160%) blur(22px);
  -webkit-backdrop-filter: saturate(160%) blur(22px);
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.85);
  @media (max-width: 520px) {
    right: 8px;
    left: 8px;
    bottom: 8px;
    width: auto;
    height: calc(100svh - 16px);
  }
`

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 16px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: radial-gradient(120% 140% at 0% 0%, rgba(244, 162, 97, 0.16), transparent 60%);
  .who {
    flex: 1;
    min-width: 0;
    strong {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16px;
      color: ${({ theme }) => theme.text_primary};
      svg {
        color: ${({ theme }) => theme.primary};
      }
    }
    span {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
      font-size: 12.5px;
      color: ${({ theme }) => theme.text_secondary};
      &::before {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #34d399;
        box-shadow: 0 0 8px #34d399;
      }
    }
  }
`

const HeadAvatar = styled.div`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  padding: 2px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient};
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #10101a;
  }
`

const IconBtn = styled.button`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 17px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    border-color: ${({ theme }) => theme.borderStrong};
  }
`

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 18px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Bubble = styled(motion.div)`
  max-width: 86%;
  padding: 11px 14px;
  border-radius: 18px;
  font-size: 14.5px;
  line-height: 1.6;
  word-break: break-word;
  ${({ $user, theme }) =>
    $user
      ? `
    align-self: flex-end;
    color: #fff;
    background: ${theme.gradient};
    border-bottom-right-radius: 6px;
  `
      : `
    align-self: flex-start;
    color: ${theme.text_primary};
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid ${theme.border};
    border-bottom-left-radius: 6px;
  `}
  strong {
    font-weight: 600;
    color: ${({ $user, theme }) => ($user ? '#fff' : theme.primary)};
  }
  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  ul {
    margin: 4px 0;
    padding-left: 18px;
  }
  p + p,
  p + ul,
  ul + p {
    margin-top: 6px;
  }
`

const Typing = styled(Bubble)`
  display: flex;
  gap: 5px;
  padding: 14px 16px;
  span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.text_secondary};
    animation: ${blink} 1.2s infinite;
  }
  span:nth-child(2) {
    animation-delay: 0.15s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
`

const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 16px 12px;
  button {
    padding: 8px 12px;
    border-radius: 999px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + '12'};
    border: 1px solid ${({ theme }) => theme.primary + '33'};
    transition: background 0.2s ease;
    &:hover {
      background: ${({ theme }) => theme.primary + '22'};
    }
  }
`

const Composer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px 14px 14px;
  border-top: 1px solid ${({ theme }) => theme.border};
  textarea {
    flex: 1;
    resize: none;
    max-height: 120px;
    padding: 12px 14px;
    border-radius: 16px;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.4;
    color: ${({ theme }) => theme.text_primary};
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid ${({ theme }) => theme.borderStrong};
    outline: none;
    &:focus {
      border-color: ${({ theme }) => theme.primary};
    }
    &::placeholder {
      color: ${({ theme }) => theme.text_secondary};
    }
  }
  button {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    font-size: 18px;
    color: #fff;
    background: ${({ theme }) => theme.gradient};
    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
`

const Footnote = styled.p`
  padding: 0 16px 12px;
  font-size: 11.5px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.8;
`

/* ---------- tiny formatter: **bold**, bullets, links, emails ---------- */

const inline = (text, key) =>
  text.split(/(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s)]+|(?:linkedin|github)\.com\/[^\s),]+)/g).map((part, i) => {
    if (!part) return null
    if (part.startsWith('**')) return <strong key={`${key}-${i}`}>{part.slice(2, -2)}</strong>
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) return <a key={`${key}-${i}`} href={`mailto:${part}`}>{part}</a>
    if (/^(https?:\/\/|linkedin\.com|github\.com)/.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`
      return (
        <a key={`${key}-${i}`} href={href} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      )
    }
    return <React.Fragment key={`${key}-${i}`}>{part}</React.Fragment>
  })

const Formatted = ({ text }) => {
  const blocks = []
  let list = null
  text.split('\n').forEach((raw, i) => {
    const line = raw.trim()
    if (/^[-*•]\s+/.test(line)) {
      list = list || []
      list.push(<li key={i}>{inline(line.replace(/^[-*•]\s+/, ''), i)}</li>)
      return
    }
    if (list) {
      blocks.push(<ul key={`ul-${i}`}>{list}</ul>)
      list = null
    }
    if (line) blocks.push(<p key={i}>{inline(line, i)}</p>)
  })
  if (list) blocks.push(<ul key="ul-end">{list}</ul>)
  return blocks
}

/* ---------- component ---------- */

const Assistant = () => (ASSISTANT_ENABLED ? <AssistantWidget /> : null)

const AssistantWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const pendingQuestion = useRef(null)

  const send = async (text) => {
    const question = (text ?? input).trim()
    if (!question || loading) return
    const next = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
      })
      const data = await res.json().catch(() => ({}))
      const reply = res.ok && data.reply ? data.reply : data.error || 'Something went wrong. Please try again.'
      setMessages((m) => [...m, { role: 'assistant', content: reply, error: !res.ok }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: `I can't connect right now. You can email Mrinal at ${Bio.email}.`, error: true },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Open from anywhere (command palette, buttons), optionally with a question to ask straight away.
  useEffect(() => {
    const onOpen = (e) => {
      setOpen(true)
      if (e.detail?.question) pendingQuestion.current = e.detail.question
    }
    window.addEventListener(OPEN_ASSISTANT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (open && pendingQuestion.current) {
      const q = pendingQuestion.current
      pendingQuestion.current = null
      send(q)
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 250)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const showSuggestions = messages.length === 1 && !loading

  return (
    <>
      <AnimatePresence>
        {!open && (
          <Launcher
            key="launcher"
            onClick={() => setOpen(true)}
            aria-label="Ask Mrinal's AI"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={avatar} alt="" width={38} height={38} />
            <span className="label">Ask my AI</span>
          </Launcher>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <Panel
            key="panel"
            role="dialog"
            aria-label="Ask Mrinal's AI"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.18 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <Header>
              <HeadAvatar>
                <img src={avatar} alt="" width={38} height={38} />
              </HeadAvatar>
              <div className="who">
                <strong>
                  Mrinal's AI <HiSparkles />
                </strong>
                <span>Answers from his resume</span>
              </div>
              <IconBtn onClick={() => setMessages([GREETING])} aria-label="Start a new chat" title="New chat">
                <HiArrowPath />
              </IconBtn>
              <IconBtn onClick={() => setOpen(false)} aria-label="Close chat">
                <HiXMark />
              </IconBtn>
            </Header>

            <Messages ref={listRef} aria-live="polite">
              {messages.map((m, i) => (
                <Bubble
                  key={i}
                  $user={m.role === 'user'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Formatted text={m.content} />
                </Bubble>
              ))}
              {loading && (
                <Typing aria-label="Thinking">
                  <span />
                  <span />
                  <span />
                </Typing>
              )}
            </Messages>

            {showSuggestions && (
              <Suggestions>
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </Suggestions>
            )}

            <Composer
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={600}
                placeholder="Ask about Mrinal..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
              />
              <button type="submit" disabled={!input.trim() || loading} aria-label="Send">
                <HiPaperAirplane />
              </button>
            </Composer>
            <Footnote>AI can make mistakes. For anything important, email {Bio.email}.</Footnote>
          </Panel>
        )}
      </AnimatePresence>
    </>
  )
}

export default Assistant
