import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HiMapPin, HiArrowUpRight } from 'react-icons/hi2'
import { SpotlightCard, Logo, Chip, RichText } from '../ui'

const Item = styled(motion.div)`
  position: relative;
`

const Dot = styled(motion.span)`
  position: absolute;
  top: 30px;
  left: -41px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
  border: 3px solid ${({ theme, $current }) => ($current ? '#34d399' : theme.primary)};
  box-shadow: 0 0 0 5px ${({ theme, $current }) => ($current ? 'rgba(52,211,153,0.18)' : theme.primary + '22')};
  @media (max-width: 640px) {
    left: -33px;
  }
`

const Body = styled.div`
  position: relative;
  padding: ${({ $compact }) => ($compact ? '22px' : '28px 30px')};
  @media (max-width: 640px) {
    padding: 20px;
  }
`

const Top = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const Info = styled.div`
  flex: 1;
  min-width: 0;
`

const Role = styled.h3`
  font-size: ${({ $compact }) => ($compact ? '17px' : '21px')};
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 640px) {
    font-size: 17px;
  }
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  margin-top: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  a,
  strong {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-weight: 600;
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
  }
  svg {
    flex-shrink: 0;
  }
`

const Current = styled.span`
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  color: #34d399;
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.3);
`

const Desc = styled.p`
  margin-top: 14px;
  font-size: 14.5px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
`

const Bullets = styled.ul`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  li {
    position: relative;
    padding-left: 22px;
    font-size: 15px;
    line-height: 1.7;
    color: ${({ theme }) => theme.text_secondary};
    &::before {
      content: '';
      position: absolute;
      left: 2px;
      top: 0.62em;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      transform: rotate(45deg);
      background: ${({ theme }) => theme.gradient};
    }
  }
  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
`

const ExperienceCard = ({ experience, index = 0, compact = false, timeline = true }) => {
  const current = /present/i.test(experience.date)
  return (
    <Item
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      {timeline && (
        <Dot
          $current={current}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
        />
      )}
      <SpotlightCard whileHover={{ y: -4 }} style={{ height: '100%' }}>
        <Body $compact={compact}>
          <Top>
            <Logo src={experience.img} name={experience.company} size={compact ? 46 : 58} />
            <Info>
              <Role $compact={compact}>{experience.role}</Role>
              <Meta>
                {experience.link ? (
                  <a href={experience.link} target="_blank" rel="noopener noreferrer">
                    {experience.company} <HiArrowUpRight size={12} />
                  </a>
                ) : (
                  <strong>{experience.company}</strong>
                )}
                <span>•</span>
                <span>{experience.date}</span>
                {experience.location && !compact && (
                  <>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <HiMapPin /> {experience.location}
                    </span>
                  </>
                )}
                {current && <Current>Current</Current>}
              </Meta>
            </Info>
          </Top>
          {experience.bullets?.length > 0 && (
            <Bullets>
              {experience.bullets.map((b) => (
                <li key={b}>
                  <RichText text={b} />
                </li>
              ))}
            </Bullets>
          )}
          {experience.desc && <Desc>{experience.desc}</Desc>}
          {experience.skills?.length > 0 && (
            <Tags>
              {experience.skills.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </Tags>
          )}
        </Body>
      </SpotlightCard>
    </Item>
  )
}

export default ExperienceCard
