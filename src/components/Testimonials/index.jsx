import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaLinkedinIn } from 'react-icons/fa6'
import { testimonials } from '../../data/constants'
import { Section, Container, SectionHeader } from '../ui'

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 22px;
`

const Card = styled(motion.figure)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 0;
  padding: 30px 28px 26px;
  border-radius: 24px;
  overflow: hidden;
  isolation: isolate;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.primary + '55'};
  }
  &::before {
    content: '“';
    position: absolute;
    top: -34px;
    right: 18px;
    z-index: -1;
    font-family: 'Space Grotesk', serif;
    font-size: 180px;
    line-height: 1;
    background: ${({ theme }) => theme.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.18;
  }
`

const Quote = styled.blockquote`
  flex: 1;
  margin: 0;
  font-size: 15.5px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_primary};
`

const Person = styled.figcaption`
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.border};
`

const Avatar = styled.span`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  background: ${({ theme }) => theme.gradient};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Who = styled.div`
  flex: 1;
  min-width: 0;
  strong {
    display: block;
    font-size: 15.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }
  span {
    display: block;
    font-size: 13.5px;
    color: ${({ theme }) => theme.text_secondary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .company {
    font-weight: 600;
    color: ${({ theme }) => theme.primary};
  }
`

const In = styled.a`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: ${({ theme }) => theme.text_secondary};
  border: 1px solid ${({ theme }) => theme.border};
  transition: color 0.2s ease, border-color 0.2s ease;
  &:hover {
    color: #0a66c2;
    border-color: #0a66c2;
  }
`

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const Testimonials = () => {
  const items = testimonials.filter((t) => t.approved && t.quote?.trim())
  if (items.length === 0) return null

  return (
    <Section id="testimonials">
      <Container>
        <SectionHeader
          eyebrow="Testimonials"
          title="What people"
          highlight="say"
          desc="Words from managers and colleagues I've worked with."
        />
        <Grid>
          {items.map((t, i) => (
            <Card
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <Quote>{t.quote}</Quote>
              <Person>
                <Avatar aria-hidden>
                  {t.photo ? <img src={t.photo} alt="" loading="lazy" width={46} height={46} /> : initials(t.name)}
                </Avatar>
                <Who>
                  <strong>{t.name}</strong>
                  {t.role && <span>{t.role}</span>}
                  {t.company && <span className="company">{t.company}</span>}
                </Who>
                {t.linkedin && (
                  <In href={t.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on LinkedIn`}>
                    <FaLinkedinIn />
                  </In>
                )}
              </Person>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

export default Testimonials
