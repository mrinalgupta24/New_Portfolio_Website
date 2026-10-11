import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { SiGooglecloud, SiOracle, SiSalesforce, SiGithub } from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import { HiArrowUpRight } from 'react-icons/hi2'
import { certifications } from '../../data/constants'
import { Section, Container, SectionHeader } from '../ui'

const issuers = {
  gcp: { icon: <SiGooglecloud />, color: '#4285F4' },
  azure: { icon: <VscAzure />, color: '#0089D6' },
  oracle: { icon: <SiOracle />, color: '#F80000' },
  salesforce: { icon: <SiSalesforce />, color: '#00A1E0' },
  github: { icon: <SiGithub />, color: '#8b5cf6' },
}

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 18px;
`

const Card = styled(motion.a)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border-radius: 22px;
  overflow: hidden;
  text-decoration: none;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -30%;
    width: 70%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    filter: blur(60px);
    opacity: 0.12;
    transition: opacity 0.3s ease;
  }
  &:hover {
    border-color: ${({ $color }) => $color + '88'};
    box-shadow: 0 20px 45px -25px ${({ $color }) => $color};
  }
  &:hover::before {
    opacity: 0.28;
  }
`

const Top = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Badge = styled.span`
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  font-size: 24px;
  color: ${({ $color }) => $color};
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255,255,255,0.92)' : '#fff')};
  border: 1px solid ${({ theme }) => theme.border};
`

const Verify = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  transition: color 0.2s ease;
  ${Card}:hover & {
    color: ${({ theme }) => theme.primary};
  }
`

const Name = styled.h3`
  position: relative;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.text_primary};
`

const Issuer = styled.span`
  position: relative;
  margin-top: -10px;
  font-size: 13.5px;
  color: ${({ theme }) => theme.text_secondary};
`

const Certifications = () => (
  <Section id="certifications">
    <Container>
      <SectionHeader
        eyebrow="Credentials"
        title="Certifications"
        highlight="& Badges"
        desc="Verified credentials across Google Cloud, Microsoft Azure, Oracle Cloud, Salesforce and GitHub. Click any card to verify it."
      />
      <Grid>
        {certifications.map((c, i) => {
          const issuer = issuers[c.icon] || issuers.github
          return (
            <Card
              key={c.name}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              $color={issuer.color}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <Top>
                <Badge $color={issuer.color}>{issuer.icon}</Badge>
                <Verify>
                  Verify <HiArrowUpRight />
                </Verify>
              </Top>
              <Name>{c.name}</Name>
              <Issuer>{c.issuer}</Issuer>
            </Card>
          )
        })}
      </Grid>
    </Container>
  </Section>
)

export default Certifications
