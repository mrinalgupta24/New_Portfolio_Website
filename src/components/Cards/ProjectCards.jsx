import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaGithub } from 'react-icons/fa6'
import { HiArrowUpRight, HiCheckBadge } from 'react-icons/hi2'
import { Chip } from '../ui'
import CoverArt from './CoverArt'

export const isLiveUrl = (url) => Boolean(url) && !/github\.com/i.test(url)

const Card = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: ${({ theme }) => theme.shadow};
  transition: border-color 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.primary + '55'};
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.07), transparent 40%);
  }
  &:hover::after {
    opacity: 1;
  }
  ${({ $featured }) =>
    $featured &&
    css`
      grid-column: 1 / -1;
      flex-direction: row;
      @media (max-width: 860px) {
        flex-direction: column;
      }
    `}
`

const ImageWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.bgLight};
  ${({ $featured }) =>
    $featured &&
    css`
      width: 46%;
      aspect-ratio: auto;
      min-height: 340px;
      @media (max-width: 860px) {
        width: 100%;
        min-height: 260px;
      }
    `}
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  ${Card}:hover & > img {
    transform: scale(1.06);
  }
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  background: ${({ theme }) => theme.gradient};
`

const Links = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: flex;
  gap: 8px;
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.3s ease;
  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
  @media (hover: none) {
    opacity: 1;
    transform: none;
  }
`

const IconLink = styled.a`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  font-size: 16px;
  color: #fff;
  background: rgba(10, 10, 18, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background 0.2s ease;
  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: ${({ $featured }) => ($featured ? '34px 36px' : '22px 24px 26px')};
  justify-content: center;
  @media (max-width: 640px) {
    padding: 22px;
  }
`

const Kicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme, $featured }) => ($featured ? theme.primary : theme.text_secondary)};
`

const Title = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: ${({ $featured }) => ($featured ? '30px' : '21px')};
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.text_primary};
  svg {
    flex-shrink: 0;
    font-size: 20px;
    color: ${({ theme }) => theme.primary};
    transition: transform 0.3s ease;
  }
  ${Card}:hover & svg {
    transform: translate(3px, -3px);
  }
`

const Description = styled.p`
  font-size: ${({ $featured }) => ($featured ? '15.5px' : '14.5px')};
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  ${({ $featured }) =>
    !$featured &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`

const Highlights = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: 14.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.text_primary};
    svg {
      flex-shrink: 0;
      margin-top: 2px;
      font-size: 18px;
      color: ${({ theme }) => theme.primary};
    }
  }
`

const Note = styled.span`
  font-size: 13px;
  font-style: italic;
  color: ${({ theme }) => theme.text_secondary};
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`

export const ProjectCover = ({ project }) => <CoverArt variant={project.cover.variant} />

const ProjectCards = React.forwardRef(({ project, setOpenModal, index = 0 }, ref) => {
  const featured = Boolean(project.featured)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tilt = featured ? 3 : 6
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [tilt, -tilt]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-tilt, tilt]), { stiffness: 200, damping: 20 })
  const [imgFailed, setImgFailed] = useState(false)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }
  const open = () => setOpenModal({ state: true, project })

  return (
    <Card
      ref={ref}
      layout
      $featured={featured}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${project.title}`}
    >
      <ImageWrap $featured={featured}>
        {project.cover ? (
          <ProjectCover project={project} />
        ) : imgFailed || !project.image ? (
          <Placeholder>{project.title}</Placeholder>
        ) : (
          <img src={project.image} alt={project.title} loading="lazy" onError={() => setImgFailed(true)} />
        )}
        <Links onClick={(e) => e.stopPropagation()}>
          {project.github && (
            <IconLink href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Source code">
              <FaGithub />
            </IconLink>
          )}
          {isLiveUrl(project.webapp) && (
            <IconLink href={project.webapp} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
              <HiArrowUpRight />
            </IconLink>
          )}
        </Links>
      </ImageWrap>
      <Body $featured={featured}>
        <Kicker $featured={featured}>{featured ? `★ Featured · ${project.date}` : project.date}</Kicker>
        <Title $featured={featured}>
          {project.title} <HiArrowUpRight />
        </Title>
        <Description $featured={featured}>{project.description}</Description>
        {featured && project.highlights?.length > 0 && (
          <Highlights>
            {project.highlights.map((h) => (
              <li key={h}>
                <HiCheckBadge /> {h}
              </li>
            ))}
          </Highlights>
        )}
        {project.note && <Note>{project.note}</Note>}
        <Tags>
          {project.tags?.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </Tags>
      </Body>
    </Card>
  )
})

export default ProjectCards
