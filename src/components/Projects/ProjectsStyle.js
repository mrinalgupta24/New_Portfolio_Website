import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  padding: 6px;
  margin-bottom: 40px;
  border-radius: 999px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
`

export const FilterButton = styled.button`
  position: relative;
  padding: 10px 20px;
  border: none;
  border-radius: 999px;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme, $active }) => ($active ? '#fff' : theme.text_secondary)};
  span:last-child {
    position: relative;
    z-index: 1;
  }
`

export const FilterPill = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.gradient};
`

export const CardGrid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`
