import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import {
  HiCheckCircle, HiExclamationTriangle, HiXCircle, HiPauseCircle, HiArrowLeft, HiArrowPath, HiClock,
  HiGlobeAlt, HiShieldCheck,
} from 'react-icons/hi2'
import avatar from '../images/mrinalgupta-avatar.webp'
import { Bio } from '../data/constants'
import { GradientText } from '../components/ui'

const REFRESH_MS = 60_000

const STATE = {
  operational: { label: 'Operational', color: '#34d399', Icon: HiCheckCircle },
  degraded: { label: 'Degraded', color: '#fbbf24', Icon: HiExclamationTriangle },
  down: { label: 'Outage', color: '#f87171', Icon: HiXCircle },
  paused: { label: 'Not monitored', color: '#8b8ba7', Icon: HiPauseCircle },
}
const OVERALL = {
  operational: { title: 'All systems operational', color: '#34d399', Icon: HiCheckCircle },
  partial: { title: 'Some systems degraded', color: '#fbbf24', Icon: HiExclamationTriangle },
  major: { title: 'Service disruption', color: '#f87171', Icon: HiXCircle },
}
const DAY_COLOR = { up: '#34d399', degraded: '#fbbf24', down: '#f87171', none: 'rgba(255,255,255,0.08)' }

const fmtDate = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
const fmtTime = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
const ago = (iso) => {
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.round(s / 60)
  return m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`
}

/* ---------- styles ---------- */

const ping = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.4); opacity: 0; }
`

const Page = styled.main`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 28px 20px 60px;
`

const Wrap = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`

const Top = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  a.brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: ${({ theme }) => theme.text_primary};
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: 17px;
    img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      padding: 2px;
      background: ${({ theme }) => theme.gradient};
    }
    span {
      font-weight: 500;
      color: ${({ theme }) => theme.text_secondary};
    }
  }
`

const Pill = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`

const Hero = styled(motion.section)`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 30px;
  border-radius: 26px;
  background:
    radial-gradient(120% 140% at 0% 0%, ${({ $c }) => $c + '22'}, transparent 60%),
    ${({ theme }) => theme.card};
  border: 1px solid ${({ $c }) => $c + '55'};
  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
  .icon {
    position: relative;
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 50%;
    font-size: 40px;
    color: ${({ $c }) => $c};
    &::before {
      content: '';
      position: absolute;
      inset: 8px;
      border-radius: 50%;
      background: ${({ $c }) => $c};
      animation: ${ping} 2s ease-out infinite;
    }
    svg {
      position: relative;
    }
  }
  h1 {
    font-size: clamp(24px, 4vw, 32px);
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.text_primary};
  }
  p {
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 600px) {
      justify-content: center;
    }
  }
`

const Card = styled(motion.section)`
  border-radius: 22px;
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  > h2 {
    padding: 16px 22px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.text_secondary};
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`

const Row = styled.div`
  padding: 18px 22px;
  & + & {
    border-top: 1px solid ${({ theme }) => theme.border};
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .name {
    font-size: 15.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }
  .desc {
    margin-top: 2px;
    font-size: 13px;
    color: ${({ theme }) => theme.text_secondary};
  }
  .foot {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
  }
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 5px 11px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ $c }) => $c};
  background: ${({ $c }) => $c + '1a'};
  border: 1px solid ${({ $c }) => $c + '44'};
`

const Bars = styled.div`
  display: grid;
  grid-template-columns: repeat(90, 1fr);
  gap: 2px;
  height: 34px;
  margin-top: 14px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(45, 1fr);
    > span:nth-child(-n + 45) {
      display: none;
    }
  }
`

const Bar = styled.span`
  position: relative;
  border-radius: 3px;
  background: ${({ $c }) => $c};
  transition: transform 0.15s ease, filter 0.15s ease;
  ${({ $c }) =>
    $c !== DAY_COLOR.none &&
    css`
      box-shadow: 0 0 6px ${$c}55;
    `}
  &:hover {
    transform: scaleY(1.15);
    filter: brightness(1.25);
  }
  &:hover::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    padding: 6px 10px;
    border-radius: 8px;
    white-space: nowrap;
    font-size: 12px;
    color: #fff;
    background: rgba(18, 18, 30, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.14);
    pointer-events: none;
  }
`

const Regions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 18px 22px 22px;
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Region = styled.div`
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${({ theme }) => theme.border};
  .label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: ${({ theme }) => theme.text_secondary};
  }
  strong {
    display: block;
    margin-top: 6px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    color: ${({ theme }) => theme.text_primary};
    small {
      font-size: 13px;
      font-weight: 500;
      color: ${({ theme }) => theme.text_secondary};
    }
  }
  svg.spark {
    display: block;
    width: 100%;
    height: 34px;
    margin-top: 8px;
  }
`

const Incident = styled.div`
  padding: 16px 22px;
  & + & {
    border-top: 1px solid ${({ theme }) => theme.border};
  }
  strong {
    font-size: 14.5px;
    color: ${({ theme }) => theme.text_primary};
  }
  p {
    margin-top: 4px;
    font-size: 13px;
    color: ${({ theme }) => theme.text_secondary};
  }
`

const Empty = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 22px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  svg {
    font-size: 20px;
    color: #34d399;
  }
`

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.text_secondary};
  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }
`

const Foot = styled.footer`
  text-align: center;
  font-size: 12.5px;
  color: ${({ theme }) => theme.text_secondary};
  a {
    color: inherit;
  }
`

const Sparkline = ({ points, color = '#f4a261' }) => {
  if (!points?.length) return null
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const d = points
    .map((v, i) => `${(i / Math.max(points.length - 1, 1)) * 100},${30 - ((v - min) / range) * 26}`)
    .join(' ')
  return (
    <svg className="spark" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden>
      <polyline points={d} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const Status = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [, tick] = useState(0)

  useEffect(() => {
    document.title = 'Status | Mrinal Gupta'
    let alive = true
    const load = async () => {
      try {
        const res = await fetch('/api/status', { cache: 'no-store' })
        const body = await res.json()
        if (!res.ok) throw new Error(body.error || 'Unavailable')
        if (alive) {
          setData(body)
          setError(null)
        }
      } catch (e) {
        if (alive) setError(e.message)
      }
    }
    load()
    const t = setInterval(load, REFRESH_MS)
    const clock = setInterval(() => tick((n) => n + 1), 15000)
    return () => {
      alive = false
      clearInterval(t)
      clearInterval(clock)
    }
  }, [])

  const overall = OVERALL[data?.overall] || OVERALL.operational

  return (
    <Page>
      <Wrap>
        <Top>
          <a className="brand" href="/">
            <img src={avatar} alt="" width={38} height={38} />
            Mrinal Gupta <span>· Status</span>
          </a>
          <Pill href="/">
            <HiArrowLeft /> Portfolio
          </Pill>
        </Top>

        {error && !data ? (
          <Hero $c="#fbbf24" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="icon">
              <HiExclamationTriangle />
            </span>
            <div>
              <h1>Status is temporarily unavailable</h1>
              <p>We couldn't load live monitoring data. Please try again shortly.</p>
            </div>
          </Hero>
        ) : (
          <Hero $c={overall.color} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="icon">
              <overall.Icon />
            </span>
            <div>
              <h1>{data ? overall.title : 'Checking systems…'}</h1>
              <p>
                <HiArrowPath /> {data ? `Updated ${ago(data.generatedAt)} · refreshes every minute` : 'Loading live data'}
              </p>
            </div>
          </Hero>
        )}

        {data?.sections.map((section, si) => {
          const items = data.components.filter((c) => c.section === section.id)
          if (!items.length) return null
          return (
            <Card key={section.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * (si + 1) }}>
              <h2>{section.name}</h2>
              {items.map((c) => {
                const st = STATE[c.state] || STATE.operational
                return (
                  <Row key={c.id}>
                    <div className="head">
                      <div>
                        <div className="name">{c.name}</div>
                        {c.description && <div className="desc">{c.description}</div>}
                      </div>
                      <Badge $c={st.color}>
                        <st.Icon /> {st.label}
                      </Badge>
                    </div>
                    <Bars>
                      {c.days.map((d) => (
                        <Bar
                          key={d.date}
                          $c={DAY_COLOR[d.state]}
                          data-tip={
                            d.state === 'none'
                              ? `${fmtDate(d.date)} · no data`
                              : d.state === 'up'
                                ? `${fmtDate(d.date)} · no downtime`
                                : `${fmtDate(d.date)} · ${d.downMinutes} min down`
                          }
                        />
                      ))}
                    </Bars>
                    <div className="foot">
                      <span>90 days ago</span>
                      <span>{c.uptime != null ? `${c.uptime.toFixed(2)}% uptime` : ''}</span>
                      <span>Today</span>
                    </div>
                  </Row>
                )
              })}
            </Card>
          )
        })}

        {data?.regions?.length > 0 && (
          <Card initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2>Response time by region</h2>
            <Regions>
              {data.regions.map((r) => (
                <Region key={r.code}>
                  <div className="label">
                    <HiGlobeAlt /> {r.name}
                  </div>
                  <strong>
                    {r.latest ?? '–'} <small>ms</small>
                  </strong>
                  <Sparkline points={r.points} />
                  <div className="label">avg {r.average ?? '–'} ms</div>
                </Region>
              ))}
            </Regions>
          </Card>
        )}

        {data && (
          <Card initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2>Past incidents</h2>
            {data.incidents.length === 0 ? (
              <Empty>
                <HiShieldCheck /> No incidents in the last 90 days.
              </Empty>
            ) : (
              data.incidents.map((i) => (
                <Incident key={i.id}>
                  <strong>{i.component}</strong>
                  <p>{i.cause}</p>
                  <p>
                    <HiClock style={{ verticalAlign: '-2px' }} /> {fmtTime(i.startedAt)} →{' '}
                    {i.resolvedAt ? fmtTime(i.resolvedAt) : 'ongoing'}
                  </p>
                </Incident>
              ))
            )}
          </Card>
        )}

        <Legend>
          <span>
            <i style={{ background: DAY_COLOR.up }} /> No downtime
          </span>
          <span>
            <i style={{ background: DAY_COLOR.degraded }} /> Under 30 min down
          </span>
          <span>
            <i style={{ background: DAY_COLOR.down }} /> Outage
          </span>
          <span>
            <i style={{ background: DAY_COLOR.none }} /> No data yet
          </span>
        </Legend>

        <Foot>
          Checked every 3 minutes from North America, Europe, Asia and Australia ·{' '}
          <a href="/">
            <GradientText>{Bio.name}</GradientText>
          </a>
        </Foot>
      </Wrap>
    </Page>
  )
}

export default Status
