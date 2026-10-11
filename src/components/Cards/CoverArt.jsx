import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  HiDocumentText, HiTableCells, HiSparkles, HiCheckCircle, HiCpuChip, HiChatBubbleLeftRight,
  HiArrowUpRight, HiBolt, HiBellAlert,
} from 'react-icons/hi2'
import { SiSlack } from 'react-icons/si'

/*
  Illustrated covers for projects that have no public screenshots (internal tools).
  Each variant is drawn on a fixed 360x225 stage that scales to fit its card, so the
  composition looks the same on the wide featured card and on the small grid cards.
*/

const STAGE_W = 360
const STAGE_H = 225

const Frame = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(60% 70% at 15% 15%, rgba(244, 162, 97, 0.35), transparent 70%),
    radial-gradient(60% 70% at 85% 90%, rgba(139, 92, 246, 0.42), transparent 70%),
    radial-gradient(45% 50% at 80% 10%, rgba(232, 93, 117, 0.3), transparent 70%),
    #0c0c16;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at center, #000 35%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle at center, #000 35%, transparent 80%);
  }
`

const Stage = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${STAGE_W}px;
  height: ${STAGE_H}px;
  margin-left: -${STAGE_W / 2}px;
  margin-top: -${STAGE_H / 2}px;
  transform-origin: center;
  color: #fff;
  font-family: 'Inter', sans-serif;
`

const Panel = styled.div`
  position: absolute;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 14px 30px -14px rgba(0, 0, 0, 0.7);
`

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $c }) => $c || '#fff'};
  background: ${({ $bg }) => $bg || 'rgba(255,255,255,0.1)'};
  svg {
    font-size: 11px;
  }
`

const Line = styled.span`
  display: block;
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, ${({ $o }) => $o || 0.18});
  width: ${({ $w }) => $w}%;
`

/* ---------- shared motion ---------- */

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`
const flow = keyframes`
  0% { transform: translateX(0); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateX(70px); opacity: 0; }
`
const spin = keyframes`to { transform: rotate(360deg); }`
const pop = keyframes`
  0%, 20% { opacity: 0; transform: scale(0.6); }
  30%, 100% { opacity: 1; transform: scale(1); }
`
const fill = keyframes`
  0%, 15% { width: 0; }
  60%, 100% { width: var(--w); }
`
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.6); }
  70% { box-shadow: 0 0 0 10px rgba(248, 113, 113, 0); }
  100% { box-shadow: 0 0 0 0 rgba(248, 113, 113, 0); }
`
const draw = keyframes`
  from { stroke-dashoffset: 520; }
  to { stroke-dashoffset: 0; }
`

/* ---------- variant: ETL extraction (Keychain Galaxy AI) ---------- */

const FileChip = styled(Panel)`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 92px;
  padding: 7px 9px;
  font-size: 10px;
  font-weight: 600;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${({ $d }) => $d}s;
  svg {
    font-size: 14px;
    color: ${({ $c }) => $c};
  }
`

const Core = styled.div`
  position: absolute;
  left: 152px;
  top: 82px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 26px;
  background: linear-gradient(135deg, #f4a261, #e85d75 55%, #8b5cf6);
  box-shadow: 0 0 40px rgba(232, 93, 117, 0.6);
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: 1.5px dashed rgba(255, 255, 255, 0.35);
    animation: ${spin} 12s linear infinite;
  }
`

const Dot = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px #fff;
  animation: ${flow} 2.4s linear infinite;
  animation-delay: ${({ $d }) => $d}s;
`

const CleanTable = styled(Panel)`
  left: 238px;
  top: 52px;
  width: 108px;
  padding: 9px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  .head {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 6px;
    svg {
      flex-shrink: 0;
      font-size: 11px;
      color: #34d399;
      animation: ${pop} 3s ease-out infinite;
    }
  }
  .bar {
    height: 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.35);
    animation: ${fill} 3s ease-out infinite;
  }
`

const EtlArt = () => (
  <>
    <FileChip style={{ left: 14, top: 40 }} $c="#34A853" $d={0}>
      <HiTableCells /> vendors.xlsx
    </FileChip>
    <FileChip style={{ left: 30, top: 96 }} $c="#f87171" $d={0.6}>
      <HiDocumentText /> invoice.pdf
    </FileChip>
    <FileChip style={{ left: 10, top: 152 }} $c="#60a5fa" $d={1.2}>
      <HiDocumentText /> clients.csv
    </FileChip>
    <Dot style={{ left: 112, top: 70 }} $d={0} />
    <Dot style={{ left: 120, top: 112 }} $d={0.8} />
    <Dot style={{ left: 112, top: 156 }} $d={1.6} />
    <Core>
      <HiSparkles />
    </Core>
    <CleanTable>
      <div className="head">
        <HiTableCells /> ERP-ready
      </div>
      {[88, 70, 80, 62].map((w, i) => (
        <div className="row" key={w}>
          <HiCheckCircle style={{ animationDelay: `${i * 0.25}s` }} />
          <span className="bar" style={{ '--w': `${w}%`, animationDelay: `${i * 0.25}s` }} />
        </div>
      ))}
    </CleanTable>
    <Pill style={{ position: 'absolute', left: 228, top: 176 }} $bg="rgba(52,211,153,0.16)" $c="#34d399">
      <HiBolt /> 40% less manual work
    </Pill>
  </>
)

/* ---------- variant: ticket triage (DronaHQ) ---------- */

const Ticket = styled(Panel)`
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  width: 196px;
  padding: 9px 11px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  animation: ${float} 5s ease-in-out infinite;
  animation-delay: ${({ $d }) => $d}s;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 9.5px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.6);
  }
`

const Agent = styled.div`
  position: absolute;
  right: 18px;
  top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  .orb {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 20px;
    display: grid;
    place-items: center;
    font-size: 30px;
    background: linear-gradient(135deg, #f4a261, #e85d75 55%, #8b5cf6);
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.55);
    animation: ${float} 3.5s ease-in-out infinite;
  }
  span {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
  }
`

const Escalate = styled(Panel)`
  right: 10px;
  bottom: 24px;
  width: 124px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 9.5px;
  font-weight: 600;
  svg {
    flex-shrink: 0;
    font-size: 15px;
    color: #E01E5A;
  }
`

const TicketArt = () => (
  <>
    {[
      { y: 22, d: 0, title: '#4821 · SSO login loop', pill: <Pill $bg="rgba(96,165,250,0.18)" $c="#93c5fd"><HiCheckCircle /> Triaged</Pill>, w: [92, 64] },
      { y: 86, d: 0.7, title: '#4822 · Webhook 500s', pill: <Pill $bg="rgba(52,211,153,0.16)" $c="#34d399"><HiChatBubbleLeftRight /> Reply drafted</Pill>, w: [84, 72] },
      { y: 150, d: 1.4, title: '#4823 · DB timeout', pill: <Pill $bg="rgba(244,162,97,0.18)" $c="#f4a261"><HiArrowUpRight /> Escalated</Pill>, w: [78, 58] },
    ].map((t, i) => (
      <Ticket key={t.title} $x={14 + i * 6} $y={t.y} $d={t.d}>
        <div className="top">
          <span>{t.title}</span>
        </div>
        <Line $w={t.w[0]} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Line $w={t.w[1] - 20} $o={0.12} />
          {t.pill}
        </div>
      </Ticket>
    ))}
    <Agent>
      <div className="orb">
        <HiCpuChip />
      </div>
      <span>AI triage</span>
    </Agent>
    <Escalate>
      <SiSlack /> Slack handoff to a human
    </Escalate>
  </>
)

/* ---------- variant: incident monitoring (AI Alert Agent) ---------- */

const Chart = styled(Panel)`
  left: 14px;
  top: 18px;
  width: 200px;
  height: 120px;
  padding: 10px 12px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
  }
  svg.spark {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    width: calc(100% - 20px);
    height: 70px;
    overflow: visible;
  }
  .line {
    stroke-dasharray: 520;
    animation: ${draw} 3.5s ease-out infinite;
  }
`

const Incident = styled(Pill)`
  position: absolute;
  left: 26px;
  top: 146px;
  animation: ${pulse} 1.8s infinite;
`

const Summary = styled(Panel)`
  right: 14px;
  top: 46px;
  width: 132px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  .head {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #f4a261;
    svg {
      font-size: 12px;
    }
  }
`

const Delivered = styled(Panel)`
  left: 14px;
  bottom: 14px;
  width: 200px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 9.5px;
  font-weight: 600;
  svg {
    flex-shrink: 0;
    font-size: 14px;
    color: #E01E5A;
  }
`

const AlertArt = () => (
  <>
    <Chart>
      <div className="title">
        <span>Production uptime</span>
        <Pill $bg="rgba(52,211,153,0.16)" $c="#34d399">99.9%</Pill>
      </div>
      <svg className="spark" viewBox="0 0 180 70" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cover-spark" x1="0" x2="1">
            <stop offset="0" stopColor="#34d399" />
            <stop offset="0.55" stopColor="#f4a261" />
            <stop offset="0.7" stopColor="#f87171" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <path
          className="line"
          d="M0 22 L20 18 L38 24 L56 16 L74 20 L92 15 L106 22 L116 58 L126 30 L140 20 L158 18 L180 14"
          fill="none"
          stroke="url(#cover-spark)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </Chart>
    <Incident $bg="rgba(248,113,113,0.2)" $c="#fca5a5">
      <HiBellAlert /> Incident detected
    </Incident>
    <Summary>
      <div className="head">
        <HiSparkles /> AI summary
      </div>
      <Line $w={94} $o={0.3} />
      <Line $w={80} />
      <Line $w={88} />
      <Line $w={60} />
      <Pill $bg="rgba(139,92,246,0.25)" $c="#c4b5fd" style={{ alignSelf: 'flex-start' }}>
        Root cause found
      </Pill>
    </Summary>
    <Delivered>
      <SiSlack /> Summary + fix sent to #incidents
    </Delivered>
  </>
)

const variants = { etl: EtlArt, tickets: TicketArt, alert: AlertArt }

const CoverArt = ({ variant }) => {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      const { width, height } = el.getBoundingClientRect()
      setScale(Math.min(width / STAGE_W, height / STAGE_H) * 0.94)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const Art = variants[variant] || AlertArt
  return (
    <Frame ref={ref} aria-hidden>
      <Stage style={{ transform: `scale(${scale})` }}>
        <Art />
      </Stage>
    </Frame>
  )
}

export default CoverArt
