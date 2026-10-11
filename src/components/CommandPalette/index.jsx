import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'
import {
  HiMagnifyingGlass, HiSparkles, HiEnvelope, HiDocumentText, HiClipboardDocument, HiArrowRight,
  HiUser, HiBriefcase, HiWrenchScrewdriver, HiCube, HiCheckBadge, HiAcademicCap, HiChatBubbleLeftRight,
  HiGlobeAlt, HiPaperAirplane, HiSignal,
} from 'react-icons/hi2'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Bio } from '../../data/constants'
import { openAssistant, ASSISTANT_ENABLED } from '../Assistant'

export const OPEN_PALETTE_EVENT = 'open-command-palette'
export const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const visit = (url) => window.open(url, '_blank', 'noopener,noreferrer')

const ALL_ACTIONS = [
  { group: 'Ask', label: "Ask Mrinal's AI", hint: 'Chat about his experience', icon: <HiSparkles />, run: () => openAssistant(), keywords: 'chat ai assistant question' },
  { group: 'Ask', label: 'What did he build with AI?', icon: <HiChatBubbleLeftRight />, run: () => openAssistant('What AI agents has Mrinal built?'), keywords: 'ai agents projects' },
  { group: 'Navigate', label: 'About', icon: <HiUser />, run: () => go('about'), keywords: 'home top intro' },
  { group: 'Navigate', label: 'Global reach', icon: <HiGlobeAlt />, run: () => go('reach'), keywords: 'globe clients countries' },
  { group: 'Navigate', label: 'Experience', icon: <HiBriefcase />, run: () => go('experience'), keywords: 'work jobs keychain dronahq career' },
  { group: 'Navigate', label: 'Skills', icon: <HiWrenchScrewdriver />, run: () => go('skills'), keywords: 'tools stack tech' },
  { group: 'Navigate', label: 'Projects', icon: <HiCube />, run: () => go('projects'), keywords: 'portfolio work galaxy' },
  { group: 'Navigate', label: 'Certifications', icon: <HiCheckBadge />, run: () => go('certifications'), keywords: 'badges credentials google azure oracle' },
  { group: 'Navigate', label: 'Education', icon: <HiAcademicCap />, run: () => go('education'), keywords: 'mca bca degree' },
  { group: 'Navigate', label: 'Contact', icon: <HiPaperAirplane />, run: () => go('contact'), keywords: 'message hire form' },
  {
    group: 'Connect',
    label: 'Copy email address',
    hint: Bio.email,
    icon: <HiClipboardDocument />,
    run: async () => {
      try {
        await navigator.clipboard.writeText(Bio.email)
        toast.success('Email copied to clipboard')
      } catch {
        window.location.href = `mailto:${Bio.email}`
      }
    },
    keywords: 'mail contact',
  },
  { group: 'Connect', label: 'Send an email', icon: <HiEnvelope />, run: () => (window.location.href = `mailto:${Bio.email}`), keywords: 'mail contact' },
  { group: 'Connect', label: 'View resume', icon: <HiDocumentText />, run: () => visit(Bio.resume), keywords: 'cv pdf download' },
  { group: 'Connect', label: 'LinkedIn', icon: <FaLinkedinIn />, run: () => visit(Bio.linkedin), keywords: 'social profile' },
  { group: 'Connect', label: 'GitHub', icon: <FaGithub />, run: () => visit(Bio.github), keywords: 'code repos social' },
  { group: 'Connect', label: 'System status', hint: 'Uptime of the site, AI and contact form', icon: <HiSignal />, run: () => (window.location.href = Bio.status), keywords: 'uptime status health monitoring' },
]

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 14vh 16px 16px;
  background: rgba(5, 5, 10, 0.7);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`

const Box = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(18, 18, 30, 0.96);
  border: 1px solid ${({ theme }) => theme.borderStrong};
  box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
`

const SearchRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  svg {
    flex-shrink: 0;
    font-size: 20px;
    color: ${({ theme }) => theme.text_secondary};
  }
  input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 16px;
    color: ${({ theme }) => theme.text_primary};
    &::placeholder {
      color: ${({ theme }) => theme.text_secondary};
    }
  }
`

const Kbd = styled.kbd`
  padding: 3px 7px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 11.5px;
  color: ${({ theme }) => theme.text_secondary};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${({ theme }) => theme.border};
`

const List = styled.div`
  max-height: min(420px, 55vh);
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 8px;
`

const Group = styled.div`
  padding: 10px 10px 6px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
`

const Item = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  background: ${({ $active, theme }) => ($active ? theme.primary + '18' : 'transparent')};
  color: ${({ theme }) => theme.text_primary};
  .ic {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 10px;
    font-size: 16px;
    color: ${({ $active, theme }) => ($active ? '#fff' : theme.text_secondary)};
    background: ${({ $active, theme }) => ($active ? theme.gradient : 'rgba(255,255,255,0.05)')};
  }
  .text {
    flex: 1;
    min-width: 0;
    font-size: 14.5px;
    font-weight: 500;
    small {
      display: block;
      margin-top: 1px;
      font-size: 12.5px;
      font-weight: 400;
      color: ${({ theme }) => theme.text_secondary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .go {
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    color: ${({ theme }) => theme.primary};
  }
`

const Empty = styled.div`
  padding: 28px 16px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  button {
    margin-top: 12px;
    padding: 9px 14px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    color: #fff;
    background: ${({ theme }) => theme.gradient};
  }
`

const Footer = styled.div`
  display: flex;
  gap: 14px;
  padding: 10px 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  @media (max-width: 520px) {
    display: none;
  }
`

const ACTIONS = ALL_ACTIONS.filter((a) => ASSISTANT_ENABLED || a.group !== 'Ask')

const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ACTIONS
    return ACTIONS.filter((a) => `${a.label} ${a.hint || ''} ${a.keywords || ''} ${a.group}`.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const run = (action) => {
    setOpen(false)
    // Let the palette close before scrolling or opening another panel.
    setTimeout(() => action.run(), 120)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      run(results[active])
    }
  }

  let lastGroup = null
  return (
    <AnimatePresence>
      {open && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={() => setOpen(false)}
        >
          <Box
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <SearchRow>
              <HiMagnifyingGlass />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, links, or ask AI..."
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={`palette-item-${active}`}
              />
              <Kbd>Esc</Kbd>
            </SearchRow>
            <List ref={listRef} id="palette-list" role="listbox">
              {results.length === 0 ? (
                <Empty>
                  No results for "{query}".
                  {ASSISTANT_ENABLED && (
                    <>
                      <br />
                      <button type="button" onClick={() => run({ run: () => openAssistant(query) })}>
                        Ask Mrinal's AI instead
                      </button>
                    </>
                  )}
                </Empty>
              ) : (
                results.map((a, i) => {
                  const header = a.group !== lastGroup ? <Group key={`g-${a.group}`}>{a.group}</Group> : null
                  lastGroup = a.group
                  return (
                    <React.Fragment key={a.label}>
                      {header}
                      <Item
                        id={`palette-item-${i}`}
                        data-index={i}
                        role="option"
                        aria-selected={i === active}
                        $active={i === active}
                        onMouseMove={() => setActive(i)}
                        onClick={() => run(a)}
                      >
                        <span className="ic">{a.icon}</span>
                        <span className="text">
                          {a.label}
                          {a.hint && <small>{a.hint}</small>}
                        </span>
                        <HiArrowRight className="go" />
                      </Item>
                    </React.Fragment>
                  )
                })
              )}
            </List>
            <Footer>
              <span>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> navigate
              </span>
              <span>
                <Kbd>↵</Kbd> select
              </span>
              <span>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd> toggle
              </span>
            </Footer>
          </Box>
        </Backdrop>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
