import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { HiArrowUp } from 'react-icons/hi2'
import { Bio } from '../../data/constants'
import { sections } from '../Navbar'

const FooterContainer = styled.footer`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 60px 24px 36px;
  border-top: 1px solid ${({ theme }) => theme.border};
`

const Inner = styled.div`
  width: 100%;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`

const BigName = styled.h2`
  font-size: clamp(40px, 9vw, 110px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  text-align: center;
  background: linear-gradient(180deg, ${({ theme }) => theme.text_primary + '33'}, transparent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 26px;
  a {
    font-size: 15px;
    text-decoration: none;
    color: ${({ theme }) => theme.text_secondary};
    transition: color 0.2s ease;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`

const Socials = styled.div`
  display: flex;
  gap: 12px;
`

const Icon = styled(motion.a)`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  transition: color 0.2s ease, border-color 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary + '66'};
  }
`

const Bottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 22px;
  border-top: 1px solid ${({ theme }) => theme.border};
  font-size: 13.5px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 560px) {
    flex-direction: column-reverse;
  }
`

const Credits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
  }
  @media (max-width: 560px) {
    align-items: center;
    text-align: center;
  }
`

const TopButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.border};
`

function Footer() {
  return (
    <FooterContainer>
      <Inner>
        <BigName>{Bio.name}</BigName>
        <Nav>
          {sections.map(({ id, label }) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </Nav>
        <Socials>
          {[
            { href: Bio.github, icon: <FaGithub />, label: 'GitHub' },
            { href: Bio.linkedin, icon: <FaLinkedinIn />, label: 'LinkedIn' },
            { href: Bio.twitter, icon: <FaXTwitter />, label: 'X / Twitter' },
          ].map((s) => (
            <Icon key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} whileHover={{ y: -4 }}>
              {s.icon}
            </Icon>
          ))}
        </Socials>
        <Bottom>
          <Credits>
            <span>
              © {new Date().getFullYear()} <strong>{Bio.name}</strong>. All rights reserved.
            </span>
          </Credits>
          <TopButton href="#about" whileHover={{ y: -3 }}>
            Back to top <HiArrowUp />
          </TopButton>
        </Bottom>
      </Inner>
    </FooterContainer>
  )
}

export default Footer
