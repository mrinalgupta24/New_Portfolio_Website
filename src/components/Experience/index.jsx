import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion, useScroll, useSpring } from 'framer-motion'
import ExperienceCard from '../Cards/ExperienceCard'
import { experiences } from '../../data/constants'
import { Section, Container, SectionHeader, Reveal } from '../ui'

const Timeline = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-left: 48px;
  @media (max-width: 640px) {
    padding-left: 32px;
  }
`

const Rail = styled.div`
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 15px;
  width: 2px;
  border-radius: 2px;
  background: ${({ theme }) => theme.border};
  @media (max-width: 640px) {
    left: 7px;
  }
`

const RailFill = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-origin: top;
  border-radius: 2px;
  background: linear-gradient(180deg, #f4a261, #e85d75, #8b5cf6);
  box-shadow: 0 0 12px ${({ theme }) => theme.accent};
`

const EarlierTitle = styled.h3`
  width: 100%;
  max-width: 960px;
  margin: 64px 0 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
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

const EarlierGrid = styled.div`
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

const Experience = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  // Roles with resume bullets lead the section; the internships follow as compact cards.
  const main = experiences.filter((e) => e.bullets?.length)
  const earlier = experiences.filter((e) => !e.bullets?.length)

  return (
    <Section id="experience">
      <Container>
        <SectionHeader
          eyebrow="Career"
          title="Work"
          highlight="Experience"
          desc="Onboarding global clients, resolving enterprise technical issues and building AI agents that take the manual work out of both."
        />
        <Timeline ref={ref}>
          <Rail>
            <RailFill style={{ scaleY }} />
          </Rail>
          {main.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </Timeline>

        {earlier.length > 0 && (
          <>
            <Reveal as="div" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <EarlierTitle>Earlier roles & internships</EarlierTitle>
            </Reveal>
            <EarlierGrid>
              {earlier.map((experience, index) => (
                <ExperienceCard key={experience.id} experience={experience} index={index} compact timeline={false} />
              ))}
            </EarlierGrid>
          </>
        )}
      </Container>
    </Section>
  )
}

export default Experience
