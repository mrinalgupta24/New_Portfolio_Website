import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { HiXMark, HiArrowUpRight, HiCheckBadge, HiLockClosed } from 'react-icons/hi2'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { Chip, PrimaryButton, GhostButton } from '../ui'
import { isLiveUrl, ProjectCover } from '../Cards/ProjectCards'

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 200;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: rgba(5, 5, 10, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`

const Center = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
`

const Panel = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 860px;
  border-radius: 28px;
  overflow: hidden;
  isolation: isolate;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#12121c' : '#ffffff')};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.8);
`

const Close = styled(motion.button)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(10, 10, 18, 0.6);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`

const Media = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ theme }) => theme.bgLight};
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
  }
`

const Fallback = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 34px;
  font-weight: 700;
  color: #fff;
  background: ${({ theme }) => theme.gradient};
`

const Thumbs = styled.div`
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  gap: 8px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(10, 10, 18, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.4);
    transition: all 0.25s ease;
  }
  button[aria-current='true'] {
    width: 26px;
    border-radius: 6px;
    background: #fff;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 30px 34px 36px;
  @media (max-width: 640px) {
    padding: 22px 20px 28px;
  }
`

const Title = styled.h2`
  font-size: clamp(26px, 4vw, 34px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.text_primary};
`

const Date = styled.span`
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
`

const Desc = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: ${({ theme }) => theme.text_secondary};
`

const Highlights = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  li {
    display: flex;
    gap: 10px;
    font-size: 15px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_primary};
    svg {
      flex-shrink: 0;
      margin-top: 3px;
      font-size: 18px;
      color: ${({ theme }) => theme.primary};
    }
  }
`

const Note = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.primary + '10'};
  border: 1px solid ${({ theme }) => theme.primary + '30'};
  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.primary};
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Label = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const Members = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    flex: 1;
    font-weight: 500;
  }
  a {
    color: ${({ theme }) => theme.text_secondary};
    font-size: 18px;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project
  const images = project?.gallery?.length ? project.gallery : project?.image ? [project.image] : []
  const [slide, setSlide] = useState(0)
  const [failed, setFailed] = useState({})
  const close = () => setOpenModal({ state: false, project: null })

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpenModal({ state: false, project: null })
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [setOpenModal])

  useEffect(() => {
    if (images.length < 2) return
    const t = setInterval(() => setSlide((s) => (s + 1) % images.length), 4000)
    return () => clearInterval(t)
  }, [images.length])

  if (!project) return null

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.05 } }}
      transition={{ duration: 0.25 }}
      onClick={close}
    >
      <Center>
        <Panel
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.18 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Close onClick={close} aria-label="Close" whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }}>
            <HiXMark />
          </Close>

          <Media>
            {project.cover ? (
              <ProjectCover project={project} />
            ) : images.length === 0 || failed[slide] ? (
              <Fallback>{project.title}</Fallback>
            ) : (
              <AnimatePresence initial={false}>
                <motion.img
                  key={images[slide]}
                  src={images[slide]}
                  alt={`${project.title} screenshot ${slide + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onError={() => setFailed((f) => ({ ...f, [slide]: true }))}
                />
              </AnimatePresence>
            )}
            {images.length > 1 && !project.cover && (
              <Thumbs>
                {images.map((_, i) => (
                  <button key={i} aria-label={`Show screenshot ${i + 1}`} aria-current={i === slide} onClick={() => setSlide(i)} />
                ))}
              </Thumbs>
            )}
          </Media>

          <Content>
            <div>
              <Date>{project.date}</Date>
              <Title>{project.title}</Title>
            </div>
            <Tags>
              {project.tags?.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </Tags>
            <Desc>{project.description}</Desc>

            {project.highlights?.length > 0 && (
              <Highlights>
                {project.highlights.map((h) => (
                  <li key={h}>
                    <HiCheckBadge /> {h}
                  </li>
                ))}
              </Highlights>
            )}

            {project.note && (
              <Note>
                <HiLockClosed /> {project.note}
              </Note>
            )}

            {project.member?.length > 0 && (
              <>
                <Label>Team</Label>
                <Members>
                  {project.member.map((m) => (
                    <Member key={m.name}>
                      <img src={m.img} alt={m.name} />
                      <span>{m.name}</span>
                      {m.github && <a href={m.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>}
                      {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>}
                    </Member>
                  ))}
                </Members>
              </>
            )}

            <Actions>
              {isLiveUrl(project.webapp) && (
                <PrimaryButton href={project.webapp} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }}>
                  Live Demo <HiArrowUpRight />
                </PrimaryButton>
              )}
              {project.github && (
                <GhostButton href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }}>
                  <FaGithub /> View Code
                </GhostButton>
              )}
            </Actions>
          </Content>
        </Panel>
      </Center>
    </Overlay>
  )
}

export default ProjectDetails
