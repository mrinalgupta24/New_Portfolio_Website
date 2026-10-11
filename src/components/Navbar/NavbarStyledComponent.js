import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'

export const Nav = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 14px 16px 0;
  pointer-events: none;
`

export const NavInner = styled.nav`
  pointer-events: auto;
  position: relative;
  width: 100%;
  max-width: 1120px;
  height: 64px;
  padding: 0 10px 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: all 0.35s ease;
  ${({ $scrolled, theme }) =>
    $scrolled &&
    css`
      background: ${theme.card_light};
      border-color: ${theme.border};
      backdrop-filter: saturate(160%) blur(18px);
      -webkit-backdrop-filter: saturate(160%) blur(18px);
      box-shadow: ${theme.shadow};
    `}
`

export const NavLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 17px;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
`

export const LogoMark = styled.span`
  position: relative;
  display: block;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  padding: 2px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient};
  box-shadow: 0 6px 18px -6px ${({ theme }) => theme.accent};
  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.bg};
  }
`

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  @media (max-width: 1060px) {
    display: none;
  }
`

export const NavLink = styled.a`
  position: relative;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme, $active }) => ($active ? theme.text_primary : theme.text_secondary)};
  transition: color 0.2s ease;
  span:last-child {
    position: relative;
    z-index: 1;
  }
  &:hover {
    color: ${({ theme }) => theme.text_primary};
  }
`

export const ActivePill = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.primary + '1c'};
  border: 1px solid ${({ theme }) => theme.primary + '40'};
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const IconButton = styled(motion.button)`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`

export const GitHubButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  background: ${({ theme }) => theme.gradient};
  background-size: 200% auto;
  transition: background-position 0.4s ease, box-shadow 0.3s ease;
  &:hover {
    background-position: right center;
    box-shadow: 0 10px 26px -10px ${({ theme }) => theme.accent};
  }
  @media (max-width: 1060px) {
    display: ${({ $mobile }) => ($mobile ? 'inline-flex' : 'none')};
  }
  ${({ $mobile }) => $mobile && css`margin-top: 8px; width: 100%;`}
`

export const MobileIcon = styled.button`
  display: none;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  cursor: pointer;
  @media (max-width: 1060px) {
    display: grid;
  }
`

export const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 74px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 24px;
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(17, 17, 28, 0.94)' : 'rgba(255, 255, 255, 0.96)')};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: ${({ theme }) => theme.shadow};
`

export const MobileLink = styled(motion.a)`
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme, $active }) => ($active ? theme.primary : theme.text_primary)};
  background: ${({ theme, $active }) => ($active ? theme.primary + '14' : 'transparent')};
`

export const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 12px 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary};
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
  .kbd {
    padding: 2px 7px;
    border-radius: 6px;
    font-size: 11.5px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid ${({ theme }) => theme.border};
  }
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    border-color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 1060px) {
    width: 42px;
    padding: 0;
    justify-content: center;
    .kbd {
      display: none;
    }
  }
`
