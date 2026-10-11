import React, { useState } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import { Section, Container, SectionHeader, Reveal } from '../ui'
import { Filters, FilterButton, FilterPill, CardGrid } from './ProjectsStyle'

const categories = ['all', ...new Set(projects.map((p) => p.category).filter(Boolean))]
const label = (c) => (c === 'all' ? 'All' : c.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/\bAi\b/, 'AI'))

const Projects = ({ setOpenModal }) => {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          title="Featured"
          highlight="Projects"
          desc="AI agents that automate incident response, infrastructure diagnostics tools, and the web apps where I started."
        />

        {categories.length > 2 && (
          <Reveal>
            <Filters>
              {categories.map((c) => (
                <FilterButton key={c} $active={filter === c} onClick={() => setFilter(c)}>
                  {filter === c && <FilterPill layoutId="project-filter" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span>{label(c)}</span>
                </FilterButton>
              ))}
            </Filters>
          </Reveal>
        )}

        <LayoutGroup>
          <CardGrid layout>
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} setOpenModal={setOpenModal} />
              ))}
            </AnimatePresence>
          </CardGrid>
        </LayoutGroup>
      </Container>
    </Section>
  )
}

export default Projects
