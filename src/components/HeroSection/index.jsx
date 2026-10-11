import React from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { HiArrowDown, HiArrowUpRight } from 'react-icons/hi2'
import HeroImg from '../../images/mrinalgupta.webp'
import HeroImgSmall from '../../images/mrinalgupta-440.webp'
import { Bio, impact, certifications } from '../../data/constants'
import { GradientText, PrimaryButton, GhostButton, CountUp, stagger, fadeUp } from '../ui'
import {
  HeroContainer, HeroInner, HeroLeft, HeroRight, Title, RoleTitle, TextLoop, SubTitle,
  Ctas, Socials, SocialIcon, AvatarWrap, Ring, Avatar, FloatCard, ImpactGrid, ImpactCard, ScrollHint,
} from './HeroStyle'

const socials = [
  { href: Bio.github, icon: <FaGithub />, label: 'GitHub' },
  { href: Bio.linkedin, icon: <FaLinkedinIn />, label: 'LinkedIn' },
  { href: Bio.twitter, icon: <FaXTwitter />, label: 'X / Twitter' },
]

const HeroSection = () => {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const [firstName, ...rest] = Bio.name.split(' ')

  return (
    <HeroContainer id="about">
      <HeroInner>
        <HeroLeft variants={stagger(0.1, 0.2)} initial="hidden" animate="show">
          <Title variants={fadeUp}>
            Hi, I'm {firstName} <GradientText>{rest.join(' ')}</GradientText>
          </Title>

          <RoleTitle variants={fadeUp}>{Bio.title}</RoleTitle>

          <TextLoop variants={fadeUp}>
            <span>I also build</span>
            <span className="role">
              <Typewriter options={{ strings: Bio.builds, autoStart: true, loop: true, delay: 60, deleteSpeed: 30 }} />
            </span>
          </TextLoop>

          <SubTitle variants={fadeUp}>{Bio.description}</SubTitle>

          <Ctas variants={fadeUp}>
            <PrimaryButton
              href={Bio.resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              View Resume <HiArrowUpRight />
            </PrimaryButton>
            <GhostButton href="#contact" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              Let's Talk
            </GhostButton>
          </Ctas>

          <Socials variants={fadeUp}>
            {socials.map((s) => (
              <SocialIcon
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, rotate: -6 }}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </SocialIcon>
            ))}
          </Socials>
        </HeroLeft>

        <HeroRight
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <AvatarWrap
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
          >
            <Ring />
            <Avatar
              src={HeroImg}
              srcSet={`${HeroImgSmall} 440w, ${HeroImg} 800w`}
              sizes="(max-width: 640px) 78vw, 380px"
              alt={Bio.name}
              width={800}
              height={800}
              fetchpriority="high"
              decoding="async"
            />
            <FloatCard
              className="tl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>🤖</span> AI Agents Builder
            </FloatCard>
            <FloatCard
              className="br"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>🏅</span> {certifications.length}× Cloud & AI Certified
            </FloatCard>
          </AvatarWrap>

          <ImpactGrid>
            {impact.map((item, i) => (
              <ImpactCard
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <strong>
                  <CountUp to={item.value} suffix={item.suffix} decimals={item.decimals} />
                </strong>
                <span>{item.label}</span>
              </ImpactCard>
            ))}
          </ImpactGrid>
        </HeroRight>
      </HeroInner>

      <ScrollHint href="#experience" aria-label="Scroll to experience" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <HiArrowDown />
      </ScrollHint>
    </HeroContainer>
  )
}

export default HeroSection
