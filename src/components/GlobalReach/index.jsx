import React, { lazy, Suspense, useState } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { HiCursorArrowRays } from 'react-icons/hi2'
import { clientCountries } from '../../data/constants'
import { Section, Container, SectionHeader, Reveal } from '../ui'
import { flagFor, countLabel } from './shared'

const Explorer = lazy(() => import('./Explorer'))

/* ---------- realistic spinning Earth preview (CSS only, ~60 KB texture) ---------- */

const spin = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(244, 162, 97, 0.55); }
  70% { box-shadow: 0 0 0 16px rgba(244, 162, 97, 0); }
  100% { box-shadow: 0 0 0 0 rgba(244, 162, 97, 0); }
`

const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: 48px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`

const EarthButton = styled(motion.button)`
  position: relative;
  display: block;
  width: min(460px, 82vw);
  aspect-ratio: 1;
  margin: 0 auto;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  &::before {
    /* atmosphere glow */
    content: '';
    position: absolute;
    inset: -8%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(122, 167, 255, 0.35) 52%, rgba(139, 92, 246, 0.18) 62%, transparent 72%);
    filter: blur(8px);
  }
`

const Sphere = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  isolation: isolate;
  background: #0b1a3a;
  .map {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400%;
    background-image: url('/globe/earth-preview.webp');
    background-size: 50% 100%;
    background-repeat: repeat-x;
    animation: ${spin} 60s linear infinite;
  }
  &::after {
    /* sphere shading + specular highlight */
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background:
      radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.28), transparent 38%),
      radial-gradient(circle at 50% 50%, transparent 55%, rgba(2, 3, 10, 0.55) 72%, rgba(2, 3, 10, 0.95) 100%);
    box-shadow: inset -28px -24px 60px rgba(0, 0, 0, 0.75), inset 10px 8px 30px rgba(122, 167, 255, 0.25);
  }
`

const ClickBadge = styled.span`
  position: absolute;
  left: 50%;
  bottom: 10%;
  z-index: 2;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 999px;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.gradient};
  animation: ${pulse} 2.2s infinite;
  svg {
    font-size: 18px;
  }
`

const Countries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  @media (max-width: 900px) {
    order: 2;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (max-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Country = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 12px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
  img {
    width: 26px;
    height: 17px;
    flex-shrink: 0;
    border-radius: 3px;
    object-fit: cover;
  }
  span {
    display: block;
    min-width: 0;
    font-size: 13.5px;
    font-weight: 500;
    line-height: 1.25;
  }
  small {
    display: block;
    font-size: 11.5px;
    color: ${({ theme }) => theme.primary};
  }
  &:hover {
    border-color: ${({ theme }) => theme.primary + '66'};
    transform: translateY(-2px);
  }
`

const GlobalReach = () => {
  const [open, setOpen] = useState(false)

  return (
    <Section id="reach">
      <Container>
        <SectionHeader
          eyebrow="Global reach"
          title="Clients around"
          highlight="the world"
          desc={`I've onboarded and supported clients across ${clientCountries.length} countries. Click the globe to explore where they are.`}
        />
        <Layout>
          <Reveal>
            <EarthButton
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open the interactive globe"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sphere>
                <div className="map" />
              </Sphere>
              <ClickBadge>
                <HiCursorArrowRays /> Click to explore
              </ClickBadge>
            </EarthButton>
          </Reveal>

          <Reveal delay={0.1}>
            <Countries>
              <Grid>
                {clientCountries.map((c) => (
                  <Country key={c.code} type="button" onClick={() => setOpen(true)}>
                    <img src={flagFor(c.code)} alt="" width={26} height={17} loading="lazy" />
                    <div>
                      <span>{c.country}</span>
                      {(c.home || countLabel(c)) && <small>{c.home ? 'Home base' : countLabel(c)}</small>}
                    </div>
                  </Country>
                ))}
              </Grid>
            </Countries>
          </Reveal>
        </Layout>
      </Container>

      {/* Portal to <body> so the full-screen globe sits above the navbar and chat button. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <Suspense fallback={null}>
              <Explorer key="explorer" onClose={() => setOpen(false)} />
            </Suspense>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Section>
  )
}

export default GlobalReach
