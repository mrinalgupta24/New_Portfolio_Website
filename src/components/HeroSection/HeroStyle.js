import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const spin = keyframes`to { transform: rotate(360deg); }`

export const HeroContainer = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 130px 24px 90px;
  @media (max-width: 960px) {
    padding: 120px 16px 80px;
  }
`

export const HeroInner = styled.div`
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: 56px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`

export const HeroLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 960px) {
    order: 2;
    align-items: center;
    text-align: center;
  }
`

export const HeroRight = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  @media (max-width: 960px) {
    order: 1;
  }
`

export const Title = styled(motion.h1)`
  font-size: clamp(42px, 6.4vw, 76px);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.text_primary};
`

export const RoleTitle = styled(motion.h2)`
  margin-top: 18px;
  font-size: clamp(22px, 2.8vw, 30px);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 960px) {
    text-align: center;
  }
`

export const TextLoop = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(17px, 2vw, 21px);
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  .role {
    color: ${({ theme }) => theme.primary};
    min-height: 1.3em;
  }
  @media (max-width: 960px) {
    justify-content: center;
  }
`

export const SubTitle = styled(motion.p)`
  margin-top: 22px;
  max-width: 560px;
  font-size: 17px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_secondary};
`

export const Ctas = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
  @media (max-width: 960px) {
    justify-content: center;
  }
`

export const Socials = styled(motion.div)`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`

export const SocialIcon = styled(motion.a)`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  font-size: 17px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  transition: color 0.2s ease, border-color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary + '66'};
  }
`

export const AvatarWrap = styled(motion.div)`
  position: relative;
  width: min(380px, 78vw);
  aspect-ratio: 1;
  isolation: isolate;
`

export const Ring = styled.div`
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #f4a261, #e85d75, #8b5cf6, #f4a261);
  animation: ${spin} 8s linear infinite;
  filter: blur(0.5px);
  &::after {
    content: '';
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: inherit;
    filter: blur(40px);
    opacity: 0.45;
    z-index: -1;
  }
`

export const Avatar = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  z-index: 1;
  border: 6px solid ${({ theme }) => theme.bg};
`

export const FloatCard = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: ${({ theme }) => theme.shadow};
  z-index: 3;
  span {
    font-size: 18px;
  }
  &.tl {
    top: 4%;
    left: -14%;
  }
  &.br {
    bottom: 4%;
    right: -16%;
  }
  @media (max-width: 960px) {
    &.tl { left: -6%; }
    &.br { right: -6%; }
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 12px;
  }
`

export const ImpactGrid = styled.div`
  width: min(440px, 100%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`

export const ImpactCard = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 18px;
  border-radius: 18px;
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.3s ease;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 16px;
    bottom: 16px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${({ theme }) => theme.gradient};
  }
  &:hover {
    border-color: ${({ theme }) => theme.primary + '55'};
  }
  strong {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 30px;
    font-weight: 700;
    line-height: 1.1;
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  > span {
    font-size: 13px;
    line-height: 1.35;
    color: ${({ theme }) => theme.text_secondary};
  }
`

export const ScrollHint = styled(motion.a)`
  position: absolute;
  bottom: 28px;
  left: 50%;
  margin-left: -21px;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.border};
  @media (max-width: 960px) {
    display: none;
  }
`
