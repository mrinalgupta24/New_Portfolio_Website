import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Globe from 'globe.gl'
import { HiXMark, HiHome, HiGlobeAlt, HiArrowPath } from 'react-icons/hi2'
import { clientCountries } from '../../data/constants'
import { flagFor, countLabel } from './shared'

// Loaded on demand (React.lazy) the first time a visitor opens the explorer: three.js and the
// Earth textures are heavy, so the rest of the page never pays for them.

const home = clientCountries.find((c) => c.home) || clientCountries[0]

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 400;
  background: #02030a;
  overflow: hidden;
`

const Stage = styled.div`
  position: absolute;
  inset: 0;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  /* Country labels rendered by globe.gl's CSS2D layer */
  .country-pin {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 5px 6px;
    border-radius: 999px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    background: rgba(10, 10, 20, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0 6px 18px -6px rgba(0, 0, 0, 0.8);
    cursor: pointer;
    pointer-events: auto;
    transform: translateY(-14px);
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    img {
      width: 20px;
      height: 13px;
      border-radius: 3px;
      object-fit: cover;
    }
    small {
      font-weight: 500;
      color: #f4a261;
    }
    /* Flag only until hovered or selected, so close countries (UK, Germany, Netherlands) don't overlap */
    span,
    small {
      display: none;
    }
  }
  .country-pin:hover span,
  .country-pin:hover small,
  .country-pin.active span,
  .country-pin.active small {
    display: inline;
  }
  .country-pin:hover,
  .country-pin.active {
    z-index: 5;
  }
  .country-pin:hover,
  .country-pin.active {
    padding-right: 10px;
    transform: translateY(-14px) scale(1.08);
    border-color: #f4a261;
    background: rgba(244, 162, 97, 0.22);
  }
`

const TopBar = styled.div`
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
`

const Title = styled.div`
  padding: 14px 18px;
  border-radius: 18px;
  background: rgba(10, 10, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  h2 {
    font-size: 20px;
    color: #fff;
  }
  p {
    margin-top: 3px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.65);
  }
  @media (max-width: 640px) {
    padding: 10px 14px;
    h2 {
      font-size: 16px;
    }
    p {
      display: none;
    }
  }
`

const RoundBtn = styled.button`
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(10, 10, 20, 0.6);
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.2s ease, transform 0.2s ease;
  &:hover {
    border-color: #f4a261;
    transform: rotate(90deg);
  }
`

const Dock = styled.div`
  position: absolute;
  left: 50%;
  bottom: 22px;
  z-index: 2;
  transform: translateX(-50%);
  width: min(920px, calc(100% - 24px));
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

const Info = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px 12px 12px;
  border-radius: 18px;
  background: rgba(10, 10, 20, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  img {
    width: 46px;
    height: 31px;
    border-radius: 6px;
    object-fit: cover;
  }
  strong {
    display: block;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    color: #fff;
  }
  span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: #f4a261;
  }
`

const Chips = styled.div`
  max-width: 100%;
  display: flex;
  gap: 8px;
  padding: 8px;
  overflow-x: auto;
  border-radius: 20px;
  background: rgba(10, 10, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    flex-shrink: 0;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid transparent;
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    img {
      width: 20px;
      height: 13px;
      border-radius: 3px;
      object-fit: cover;
    }
    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
    }
    &[aria-pressed='true'] {
      color: #fff;
      border-color: rgba(244, 162, 97, 0.6);
      background: rgba(244, 162, 97, 0.18);
    }
  }
`

const Hint = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  @media (hover: none) {
    display: none;
  }
`

const Loading = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  pointer-events: none;
`

const Explorer = ({ onClose }) => {
  const stageRef = useRef(null)
  const globeRef = useRef(null)
  const pinsRef = useRef({})
  const [active, setActive] = useState(home.code)
  const activeRef = useRef(home.code)
  activeRef.current = active
  const [loaded, setLoaded] = useState(false)

  const flyTo = (code, ms = 1600) => {
    const c = clientCountries.find((x) => x.code === code)
    if (!c || !globeRef.current) return
    setActive(code)
    globeRef.current.controls().autoRotate = false
    globeRef.current.pointOfView({ lat: c.coords[0], lng: c.coords[1], altitude: 1.6 }, ms)
  }

  const resetView = () => {
    if (!globeRef.current) return
    globeRef.current.controls().autoRotate = true
    globeRef.current.pointOfView({ lat: home.coords[0], lng: home.coords[1], altitude: 2.4 }, 1400)
    setActive(home.code)
  }

  useEffect(() => {
    const el = stageRef.current
    const arcs = clientCountries
      .filter((c) => !c.home)
      .map((c) => ({ startLat: home.coords[0], startLng: home.coords[1], endLat: c.coords[0], endLng: c.coords[1] }))

    const world = new Globe(el, { animateIn: true })
      .width(el.clientWidth)
      .height(el.clientHeight)
      .backgroundColor('#02030a')
      .backgroundImageUrl('/globe/night-sky.webp')
      .globeImageUrl('/globe/earth-day.webp')
      .bumpImageUrl('/globe/earth-bump.webp')
      .showAtmosphere(true)
      .atmosphereColor('#7aa7ff')
      .atmosphereAltitude(0.22)
      .arcsData(arcs)
      .arcColor(() => ['rgba(244,162,97,0.9)', 'rgba(232,93,117,0.9)'])
      .arcAltitudeAutoScale(0.45)
      .arcStroke(0.55)
      .arcDashLength(0.45)
      .arcDashGap(0.25)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(2600)
      .ringsData(clientCountries.map((c) => ({ lat: c.coords[0], lng: c.coords[1] })))
      .ringColor(() => (t) => `rgba(244,162,97,${1 - t})`)
      .ringMaxRadius(3.2)
      .ringPropagationSpeed(2.2)
      .ringRepeatPeriod(1400)
      .htmlElementsData(clientCountries)
      .htmlLat((d) => d.coords[0])
      .htmlLng((d) => d.coords[1])
      .htmlAltitude(0.01)
      .htmlElement((d) => {
        const pin = document.createElement('div')
        pin.className = d.code === activeRef.current ? 'country-pin active' : 'country-pin'
        const img = document.createElement('img')
        img.src = flagFor(d.code)
        img.alt = ''
        const name = document.createElement('span')
        name.textContent = d.country
        pin.append(img, name)
        const label = d.home ? 'Home' : countLabel(d)
        if (label) {
          const small = document.createElement('small')
          small.textContent = label
          pin.append(small)
        }
        pin.addEventListener('click', (e) => {
          e.stopPropagation()
          flyTo(d.code)
        })
        pinsRef.current[d.code] = pin
        return pin
      })
      .onGlobeReady(() => setLoaded(true))

    world.controls().autoRotate = true
    world.controls().autoRotateSpeed = 0.45
    world.controls().enableDamping = true
    world.controls().minDistance = 140
    world.controls().maxDistance = 600
    world.pointOfView({ lat: home.coords[0], lng: home.coords[1], altitude: 2.4 })
    globeRef.current = world

    const onResize = () => world.width(el.clientWidth).height(el.clientHeight)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      world.pauseAnimation()
      world._destructor?.()
      el.innerHTML = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    Object.entries(pinsRef.current).forEach(([code, pin]) => pin.classList.toggle('active', code === active))
  }, [active])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const c = clientCountries.find((x) => x.code === active)

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label="Explore clients around the world"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Stage ref={stageRef} />
      {!loaded && <Loading>Loading Earth…</Loading>}

      <TopBar>
        <Title>
          <h2>Clients around the world</h2>
          <p>Drag to spin · scroll or pinch to zoom · tap a country to fly there</p>
        </Title>
        <div style={{ display: 'flex', gap: 10 }}>
          <RoundBtn type="button" onClick={resetView} aria-label="Reset view" title="Reset view" style={{ fontSize: 19 }}>
            <HiArrowPath />
          </RoundBtn>
          <RoundBtn type="button" onClick={onClose} aria-label="Close globe">
            <HiXMark />
          </RoundBtn>
        </div>
      </TopBar>

      <Dock>
        {c && (
          <Info key={c.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <img src={flagFor(c.code)} alt="" width={46} height={31} />
            <div>
              <strong>{c.country}</strong>
              <span>
                {c.home ? (
                  <>
                    <HiHome /> Home base
                  </>
                ) : (
                  <>
                    <HiGlobeAlt /> {countLabel(c) || 'Client region'}
                  </>
                )}
              </span>
            </div>
          </Info>
        )}
        <Chips role="toolbar" aria-label="Fly to country">
          {clientCountries.map((x) => (
            <button key={x.code} type="button" aria-pressed={x.code === active} onClick={() => flyTo(x.code)}>
              <img src={flagFor(x.code)} alt="" width={20} height={13} />
              {x.country}
            </button>
          ))}
        </Chips>
        <Hint>Press Esc to close</Hint>
      </Dock>
    </Overlay>
  )
}

export default Explorer
