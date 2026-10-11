import React from 'react'
import styled from 'styled-components'
import EducationCard from '../Cards/EducationCard'
import { education } from '../../data/constants'
import { Section, Container, SectionHeader } from '../ui'

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const Education = () => (
  <Section id="education">
    <Container>
      <SectionHeader
        eyebrow="Academics"
        title="My"
        highlight="Education"
        desc="The degrees that built my foundation in computer science, systems and cloud computing."
      />
      <Grid>
        {education.map((item, index) => (
          <EducationCard key={item.id} education={item} index={index} />
        ))}
      </Grid>
    </Container>
  </Section>
)

export default Education
