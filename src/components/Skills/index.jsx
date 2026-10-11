import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import {
  HiSparkles, HiLifebuoy, HiCloud, HiChartBar, HiCircleStack, HiGlobeAlt,
  HiCodeBracket, HiWrenchScrewdriver, HiComputerDesktop, HiWindow,
} from 'react-icons/hi2'
import { skills, techLogos } from '../../data/constants'
import { skillIcons } from '../../data/skillIcons'
import { Section, Container, SectionHeader, Reveal } from '../ui'

const icons = {
  ai: <HiSparkles />,
  support: <HiLifebuoy />,
  cloud: <HiCloud />,
  monitor: <HiChartBar />,
  db: <HiCircleStack />,
  network: <HiGlobeAlt />,
  code: <HiCodeBracket />,
  tools: <HiWrenchScrewdriver />,
  frontend: <HiComputerDesktop />,
  os: <HiWindow />,
}

const scroll = keyframes`to { transform: translateX(-50%); }`

const Marquee = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 48px;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
`

const Track = styled.div`
  display: flex;
  gap: 14px;
  width: max-content;
  animation: ${scroll} 50s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`

const MarqueeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`

const Bento = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const TierLabel = styled.h3`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.border};
  }
`

const CompactGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 16px;
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`

const Tile = styled(motion.div)`
  position: relative;
  grid-column: span ${({ $span }) => $span};
  display: flex;
  flex-direction: column;
  gap: ${({ $compact }) => ($compact ? '14px' : '18px')};
  padding: ${({ $compact }) => ($compact ? '20px 22px' : '26px')};
  border-radius: ${({ $compact }) => ($compact ? '20px' : '24px')};
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.primary + '55'};
    box-shadow: 0 20px 50px -25px ${({ theme }) => theme.primary + '88'};
  }
  ${({ $featured, theme }) =>
    $featured &&
    css`
      background:
        radial-gradient(120% 120% at 0% 0%, ${theme.primary + '1f'}, transparent 55%),
        radial-gradient(120% 120% at 100% 100%, ${theme.accent2 + '1f'}, transparent 55%),
        ${theme.card};
      border-color: ${theme.primary + '40'};
    `}
  @media (max-width: 860px) {
    grid-column: span ${({ $span }) => Math.min($span, 2)};
  }
  @media (max-width: 520px) {
    grid-column: span 1;
  }
`

const TileHead = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  h3 {
    flex: 1;
    font-size: ${({ $featured, $compact }) => ($featured ? '21px' : $compact ? '16px' : '18px')};
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }
`

const IconBox = styled.span`
  display: grid;
  place-items: center;
  width: ${({ $compact }) => ($compact ? '36px' : '44px')};
  height: ${({ $compact }) => ($compact ? '36px' : '44px')};
  flex-shrink: 0;
  border-radius: 14px;
  font-size: 21px;
  color: #fff;
  background: ${({ theme }) => theme.gradient};
  box-shadow: 0 8px 22px -10px ${({ theme }) => theme.accent};
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const SkillChip = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${({ $featured }) => ($featured ? '9px 14px' : '7px 12px')};
  border-radius: 12px;
  font-size: ${({ $featured }) => ($featured ? '14.5px' : '13.5px')};
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)')};
  border: 1px solid ${({ theme }) => theme.border};
  transition: border-color 0.2s ease, color 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.primary + '66'};
    color: ${({ theme }) => theme.primary};
  }
  svg {
    flex-shrink: 0;
    font-size: 17px;
    color: ${({ $color, theme }) => $color || theme.text_primary};
  }
`

const SubLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.border};
  }
`

const renderChips = (names, featured, baseDelay = 0.15) => (
  <Chips>
    {names.map((name, i) => {
      const icon = skillIcons[name]
      return (
        <SkillChip
          key={name}
          $featured={featured}
          $color={icon?.color}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: baseDelay + i * 0.03 }}
        >
          {icon && <icon.Icon aria-hidden />}
          {name}
        </SkillChip>
      )
    })}
  </Chips>
)

const core = skills.filter((g) => g.featured)
const secondary = skills.filter((g) => !g.featured)

const renderTile = (group, gi, compact) => (
  <Tile
    key={group.title}
    $span={compact ? 1 : group.span || 2}
    $featured={group.featured}
    $compact={compact}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: (gi % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4 }}
  >
    <TileHead $featured={group.featured} $compact={compact}>
      <IconBox $compact={compact}>{icons[group.icon]}</IconBox>
      <h3>{group.title}</h3>
    </TileHead>
    {renderChips(group.skills, group.featured)}
    {group.platforms?.length > 0 && (
      <>
        <SubLabel>{group.platformsLabel}</SubLabel>
        {renderChips(group.platforms, group.featured, 0.3)}
      </>
    )}
  </Tile>
)

const Skills = () => (
  <Section id="skills">
    <Container>
      <SectionHeader
        eyebrow="Toolbox"
        title="Skills &"
        highlight="Expertise"
        desc="AI and automation, enterprise technical support, cloud and the tooling that keeps production healthy, in the order I use them every day."
      />

      <Reveal style={{ width: '100%' }}>
        <Marquee>
          <Track>
            {[...techLogos, ...techLogos].map((s, i) => (
              <MarqueeItem key={`${s.name}-${i}`} aria-hidden={i >= techLogos.length}>
                <img src={s.image} alt="" loading="lazy" />
                {s.name}
              </MarqueeItem>
            ))}
          </Track>
        </Marquee>
      </Reveal>

      <TierLabel>Core expertise</TierLabel>
      <Bento>
        {core.map((group, gi) => renderTile(group, gi, false))}
      </Bento>

      <TierLabel style={{ marginTop: 44 }}>Tools & platforms</TierLabel>
      <CompactGrid>
        {secondary.map((group, gi) => renderTile(group, gi, true))}
      </CompactGrid>
    </Container>
  </Section>
)

export default Skills
