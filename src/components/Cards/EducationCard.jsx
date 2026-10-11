import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HiAcademicCap, HiCalendar } from 'react-icons/hi2'
import { SpotlightCard, Logo } from '../ui'

const Body = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px;
  @media (max-width: 640px) {
    padding: 22px;
  }
`

const Top = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`

const Degree = styled.h3`
  font-size: 19px;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.text_primary};
`

const College = styled.p`
  margin-top: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.text_secondary};
`

const University = styled.p`
  margin-top: 2px;
  font-size: 13.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
`

const Grade = styled(Pill)`
  color: #fff;
  border: none;
  background: ${({ theme }) => theme.gradient};
`

const Desc = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_secondary};
`

const EducationCard = ({ education, index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    style={{ height: '100%' }}
  >
    <SpotlightCard whileHover={{ y: -6 }} style={{ height: '100%' }}>
      <Body>
        <Top>
          <Logo src={education.img} name={education.college} size={60} />
          <div>
            <Degree>{education.degree}</Degree>
            <College>{education.college}</College>
            {education.university && <University>{education.university}</University>}
          </div>
        </Top>
        <Row>
          <Pill><HiCalendar /> {education.date}</Pill>
          {education.grade && <Grade><HiAcademicCap /> {education.grade}</Grade>}
        </Row>
        {education.desc && <Desc>{education.desc}</Desc>}
      </Body>
    </SpotlightCard>
  </motion.div>
)

export default EducationCard
