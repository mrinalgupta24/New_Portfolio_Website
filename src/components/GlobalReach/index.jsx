import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import createGlobe from 'cobe'
import { useInView } from 'framer-motion'
import { HiGlobeAlt, HiUsers, HiMapPin } from 'react-icons/hi2'
import { clientLocations, impact } from '../../data/constants'
import { Section, Container, Reveal, GradientText, CountUp } from '../ui'

const countries = new Set(clientLocations.map((l) => l.country)).size
const onboarded = impact.find((i) => /onboard/i.test(i.label))
const supported = impact.find((i) => /support/i.test(i.label))

const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  align-items: center;
  gap: 48px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const Copy = styled.div`
  @media (max-width: 900px) {
    text-align: center;
  }
`

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + '14'};
  border: 1px solid ${({ theme }) => theme.primary + '33'};
`

const Title = styled.h2`
  margin-top: 18px;
  font-size: clamp(32px, 4.6vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.text_primary};
`

const Desc = styled.p`
  margin-top: 16px;
  max-width: 480px;
  font-size: 16.5px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 500px;
  margin-top: 28px;
  @media (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  text-align: left;
  border-radius: 18px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  .ic {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    font-size: 18px;
    color: #fff;
    background: ${({ theme }) => theme.gradient};
  }
  strong {
    display: block;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    line-height: 1.1;
    color: ${({ theme }) => theme.text_primary};
  }
  .label {
    font-size: 12.5px;
    color: ${({ theme }) => theme.text_secondary};
  }
`

const GlobeWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 1;
  margin: 0 auto;
  &::before {
    content: '';
    position: absolute;
    inset: 12%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.28), rgba(232, 93, 117, 0.12) 45%, transparent 70%);
    filter: blur(30px);
  }
  canvas {
    position: relative;
    width: 100%;
    height: 100%;
    contain: layout paint size;
    cursor: grab;
    opacity: 0;
    transition: opacity 1s ease;
    touch-action: pan-y;
  }
  canvas.ready {
    opacity: 1;
  }
  canvas:active {
    cursor: grabbing;
  }
`

const Hint = styled.span`
  position: absolute;
  left: 50%;
  bottom: 4%;
  transform: translateX(-50%);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.text_secondary};
  opacity: 0.75;
  white-space: nowrap;
`

const Globe = () => {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const dragStart = useRef(null)
  const dragOffset = useRef(0)
  const inView = useInView(wrapRef, { margin: '200px' })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!inView || !canvasRef.current) return
    const canvas = canvasRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = canvas.offsetWidth
    let phi = 4.4 // starts with India facing the viewer
    const onResize = () => (width = canvas.offsetWidth)
    window.addEventListener('resize', onResize)

    const globe = createGlobe(canvas, {
      // cobe expects width/height already doubled for a pixel ratio of 2; the two must match.
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.02,
      baseColor: [0.22, 0.2, 0.32],
      markerColor: [0.957, 0.635, 0.38],
      glowColor: [0.42, 0.28, 0.7],
      markers: clientLocations.map((l) => ({
        location: l.coords,
        size: l.home ? 0.1 : 0.055,
        ...(l.home ? { color: [0.91, 0.36, 0.46] } : {}),
      })),
      onRender: (state) => {
        if (!dragStart.current && !reduce) phi += 0.0035
        state.phi = phi + dragOffset.current
        state.width = width * 2
        state.height = width * 2
      },
    })
    const t = setTimeout(() => setReady(true), 100)

    return () => {
      clearTimeout(t)
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [inView])

  const down = (e) => {
    dragStart.current = e.clientX - dragOffset.current * 200
  }
  const up = () => {
    dragStart.current = null
  }
  const move = (e) => {
    if (dragStart.current !== null) dragOffset.current = (e.clientX - dragStart.current) / 200
  }

  return (
    <GlobeWrap ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className={ready ? 'ready' : ''}
        aria-label={`Globe showing client locations in ${countries} countries`}
        role="img"
        onPointerDown={down}
        onPointerUp={up}
        onPointerOut={up}
        onPointerMove={move}
      />
      <Hint>Drag to spin</Hint>
    </GlobeWrap>
  )
}

const GlobalReach = () => (
  <Section id="reach" style={{ paddingTop: 40 }}>
    <Container>
      <Layout>
        <Reveal>
          <Copy>
            <Eyebrow>
              <HiGlobeAlt /> Global reach
            </Eyebrow>
            <Title>
              Helping teams succeed <GradientText>across the world</GradientText>
            </Title>
            <Desc>
              From Gurugram, I onboard and support customers across time zones, turning complex platforms into
              something their teams use every day.
            </Desc>
            <Stats>
              <Stat>
                <span className="ic">
                  <HiUsers />
                </span>
                <div>
                  <strong>
                    <CountUp to={onboarded?.value || 100} suffix="+" />
                  </strong>
                  <span className="label">Clients onboarded</span>
                </div>
              </Stat>
              <Stat>
                <span className="ic">
                  <HiUsers />
                </span>
                <div>
                  <strong>
                    <CountUp to={supported?.value || 150} suffix="+" />
                  </strong>
                  <span className="label">Clients supported</span>
                </div>
              </Stat>
              <Stat>
                <span className="ic">
                  <HiMapPin />
                </span>
                <div>
                  <strong>
                    <CountUp to={countries} />
                  </strong>
                  <span className="label">Countries</span>
                </div>
              </Stat>
            </Stats>
          </Copy>
        </Reveal>
        <Reveal delay={0.1}>
          <Globe />
        </Reveal>
      </Layout>
    </Container>
  </Section>
)

export default GlobalReach
