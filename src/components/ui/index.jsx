import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { motion, useScroll, useSpring, useInView, animate } from 'framer-motion'

/* ---------- Layout ---------- */

export const Section = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 110px 24px;
  @media (max-width: 768px) {
    padding: 80px 16px;
  }
`

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

/* ---------- Reveal on scroll ---------- */

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const Reveal = ({ children, delay = 0, y = 32, as = 'div', ...rest }) => {
  const Comp = motion[as]
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/* ---------- Section header ---------- */

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
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    box-shadow: 0 0 10px ${({ theme }) => theme.primary};
  }
`

export const GradientText = styled.span`
  background: ${({ theme }) => theme.gradient};
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${keyframes`to { background-position: 200% center; }`} 6s linear infinite;
`

const HeaderTitle = styled.h2`
  margin-top: 18px;
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`

const HeaderDesc = styled.p`
  margin-top: 14px;
  max-width: 620px;
  font-size: 17px;
  line-height: 1.7;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`

export const SectionHeader = ({ eyebrow, title, highlight, desc }) => (
  <Reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 56 }}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <HeaderTitle>
      {title} {highlight && <GradientText>{highlight}</GradientText>}
    </HeaderTitle>
    {desc && <HeaderDesc>{desc}</HeaderDesc>}
  </Reveal>
)

/* ---------- Animated background ---------- */

const drift = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(6vw, -4vh) scale(1.12); }
  66%  { transform: translate(-4vw, 5vh) scale(0.94); }
  100% { transform: translate(0, 0) scale(1); }
`

const BgWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`

const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.grid} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.grid} 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%);
`

const Blob = styled.div`
  position: absolute;
  width: 46vw;
  height: 46vw;
  max-width: 640px;
  max-height: 640px;
  border-radius: 50%;
  /* A radial gradient instead of filter: blur() looks the same but avoids re-blurring a huge
     layer every frame, which makes Safari and low-end phones stutter. */
  background: radial-gradient(circle at center, ${({ $color }) => $color} 0%, ${({ $color }) => $color + '00'} 68%);
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.32 : 0.22)};
  will-change: transform;
  animation: ${drift} ${({ $duration }) => $duration}s ease-in-out infinite;
  @media (max-width: 768px) {
    width: 90vw;
    height: 90vw;
  }
  ${({ $pos }) => css`${$pos}`}
`

const Noise = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.05 : 0.03)};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`

export const Background = () => (
  <BgWrap aria-hidden>
    <Grid />
    <Blob $color="#f4a261" $duration={22} $pos="top: -10%; left: -8%;" />
    <Blob $color="#e85d75" $duration={26} $pos="top: 30%; right: -12%;" />
    <Blob $color="#8b5cf6" $duration={30} $pos="bottom: -15%; left: 20%;" />
    <Noise />
  </BgWrap>
)

/* ---------- Scroll progress ---------- */

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 100;
  transform-origin: 0%;
  background: ${({ theme }) => theme.gradient};
`

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <ProgressBar style={{ scaleX }} />
}

/* ---------- Spotlight card (cursor-follow glow) ---------- */

const SpotlightWrap = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.radius};
  isolation: isolate;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: radial-gradient(
      420px circle at var(--x, 50%) var(--y, 50%),
      ${({ theme }) => theme.primary + '1f'},
      transparent 45%
    );
  }
  &:hover {
    border-color: ${({ theme }) => theme.primary + '55'};
  }
  &:hover::before {
    opacity: 1;
  }
`

export const SpotlightCard = ({ children, ...rest }) => {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <SpotlightWrap onMouseMove={onMove} {...rest}>
      {children}
    </SpotlightWrap>
  )
}

/* ---------- Buttons ---------- */

const buttonBase = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 26px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  white-space: nowrap;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const PrimaryButton = styled(motion.a)`
  ${buttonBase};
  color: #fff;
  background: ${({ theme }) => theme.gradient};
  background-size: 200% auto;
  box-shadow: 0 10px 30px -10px ${({ theme }) => theme.accent + 'aa'};
  &:hover {
    background-position: right center;
    box-shadow: 0 16px 40px -12px ${({ theme }) => theme.accent};
  }
`

export const GhostButton = styled(motion.a)`
  ${buttonBase};
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`

/* ---------- Logo image with initials fallback ---------- */

const LogoBox = styled.div`
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.border};
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: ${({ $size }) => $size * 0.36}px;
  color: #fff;
  ${({ $fallback, theme }) => $fallback && css`background: ${theme.gradient};`}
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const Logo = ({ src, name = '', size = 56 }) => {
  const [failed, setFailed] = useState(!src)
  const initials = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
  return (
    <LogoBox $size={size} $fallback={failed}>
      {failed ? initials : <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />}
    </LogoBox>
  )
}

/* ---------- Tag chip ---------- */

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + '12'};
  border: 1px solid ${({ theme }) => theme.primary + '2a'};
`

/* ---------- Count-up number ---------- */

export const CountUp = ({ to, duration = 1.6, suffix = '', decimals = 0 }) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  React.useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Number(v.toFixed(decimals))) })
    return () => controls.stop()
  }, [inView, to, duration, decimals])
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>
}

/* ---------- Inline **bold** markup ---------- */

export const RichText = ({ text }) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <React.Fragment key={i}>{part}</React.Fragment>
  )
