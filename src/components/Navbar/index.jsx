import React, { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaBars, FaGithub } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Bio } from '../../data/constants'
import { openPalette } from '../CommandPalette'
import avatar from '../../images/mrinalgupta-avatar.webp'
import {
  Nav, NavInner, NavLogo, LogoMark, NavItems, NavLink, ActivePill, Actions,
  GitHubButton, MobileIcon, MobileMenu, MobileLink, SearchButton,
} from './NavbarStyledComponent'

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <Nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <NavInner $scrolled={scrolled}>
        <NavLogo href="#about">
          <LogoMark>
            <img src={avatar} alt="" width={36} height={36} />
          </LogoMark>
          <span>Mrinal Gupta</span>
        </NavLogo>

        <NavItems>
          {sections.map(({ id, label }) => (
            <NavLink key={id} href={`#${id}`} $active={active === id}>
              {active === id && (
                <ActivePill layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span>{label}</span>
            </NavLink>
          ))}
        </NavItems>

        <Actions>
          <SearchButton onClick={openPalette} aria-label={`Search, open command palette (${isMac ? '⌘' : 'Ctrl'} K)`}>
            <HiMagnifyingGlass />
            <span className="kbd">{isMac ? '⌘' : 'Ctrl'} K</span>
          </SearchButton>
          <GitHubButton href={Bio.github} target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </GitHubButton>
          <MobileIcon
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX /> : <FaBars />}
          </MobileIcon>
        </Actions>

        <AnimatePresence>
          {isOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              {sections.map(({ id, label }, i) => (
                <MobileLink
                  key={id}
                  href={`#${id}`}
                  $active={active === id}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  {label}
                </MobileLink>
              ))}
              <GitHubButton href={Bio.github} target="_blank" rel="noopener noreferrer" $mobile>
                <FaGithub /> GitHub Profile
              </GitHubButton>
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavInner>
    </Nav>
  )
}

export default Navbar
