import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { HiEnvelope } from 'react-icons/hi2'
import { HiPaperAirplane, HiArrowUpRight } from 'react-icons/hi2'
import { signupValidation } from '../../signupValidation'
import { Bio } from '../../data/constants'
import { Section, Container, SectionHeader, SpotlightCard, Reveal, GradientText } from '../ui'

// Web3Forms delivers submissions to Gmail. The key comes from VITE_WEB3FORMS_ACCESS_KEY
// (.env.local locally, Vercel environment variables in production). Like every key a browser
// uses it ends up in the shipped JavaScript; Web3Forms keys are designed for that and can only
// send to the inbox configured in its dashboard.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

// Hidden from people, but bots fill every field. A filled value means the submission is dropped.
const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`

const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 28px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Side = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 34px;
  @media (max-width: 640px) {
    padding: 24px;
  }
  h3 {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.text_primary};
  }
  p {
    font-size: 15.5px;
    line-height: 1.75;
    color: ${({ theme }) => theme.text_secondary};
  }
`

const LinkRow = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 16px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  transition: border-color 0.2s ease;
  .icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    font-size: 17px;
    color: #fff;
    background: ${({ theme }) => theme.gradient};
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 15px;
    small {
      font-weight: 400;
      font-size: 13px;
      color: ${({ theme }) => theme.text_secondary};
    }
  }
  .arrow {
    color: ${({ theme }) => theme.text_secondary};
    transition: transform 0.25s ease, color 0.25s ease;
  }
  &:hover {
    border-color: ${({ theme }) => theme.primary + '66'};
  }
  &:hover .arrow {
    color: ${({ theme }) => theme.primary};
    transform: translate(3px, -3px);
  }
`

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 34px;
  @media (max-width: 640px) {
    padding: 24px;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  span {
    font-size: 13.5px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
  }
  small {
    font-size: 12.5px;
    color: #f87171;
  }
`

const inputStyles = ({ theme, $error }) => `
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  font-size: 16px;
  font-family: inherit;
  -webkit-appearance: none;
  appearance: none;
  color: ${theme.text_primary};
  background: ${theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)'};
  border: 1px solid ${$error ? '#f87171' : theme.borderStrong};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &::placeholder { color: ${theme.text_secondary}99; }
  &:focus {
    border-color: ${theme.primary};
    box-shadow: 0 0 0 4px ${theme.primary}22;
  }
`

const Input = styled.input`
  ${inputStyles}
`

const TextArea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 140px;
`

const Submit = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;
  padding: 16px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  color: #fff;
  cursor: pointer;
  background: ${({ theme }) => theme.gradient};
  background-size: 200% auto;
  box-shadow: 0 12px 30px -12px ${({ theme }) => theme.accent};
  transition: background-position 0.4s ease;
  &:hover:not(:disabled) {
    background-position: right center;
  }
  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`

const Spinner = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

const ToastTitle = styled.strong`
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 15.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ToastBody = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 13.5px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  word-break: break-word;
`

const ToastMessage = ({ title, body }) => (
  <div>
    <ToastTitle>{title}</ToastTitle>
    <ToastBody>{body}</ToastBody>
  </div>
)

const links = [
  { href: `mailto:${Bio.email}`, icon: <HiEnvelope />, title: 'Email', sub: Bio.email, external: false },
  { href: Bio.linkedin, icon: <FaLinkedinIn />, title: 'LinkedIn', sub: 'Connect professionally' },
  { href: Bio.github, icon: <FaGithub />, title: 'GitHub', sub: 'See my code' },
  { href: Bio.twitter, icon: <FaXTwitter />, title: 'X / Twitter', sub: 'Say hello' },
]

const Contact = () => {
  const [sending, setSending] = useState(false)
  const [botcheck, setBotcheck] = useState(false)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { from_name: '', from_email: '', subject: '', message: '' },
    validationSchema: signupValidation,
    onSubmit: async (form) => {
      if (botcheck) {
        resetForm()
        return
      }
      if (!WEB3FORMS_ACCESS_KEY) {
        toast.error(<ToastMessage title="Contact form not configured" body={`Please email me at ${Bio.email}.`} />)
        return
      }
      setSending(true)
      try {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Portfolio: ${form.subject.trim() || `New message from ${form.from_name.trim()}`}`,
            from_name: 'Portfolio Contact Form',
            name: form.from_name.trim(),
            email: form.from_email.trim(),
            replyto: form.from_email.trim(),
            message: form.message.trim(),
            botcheck: false,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`)
        toast.success(
          <ToastMessage title="Message sent" body={`Thanks, ${form.from_name.trim().split(' ')[0]}! I'll reply to ${form.from_email.trim()} soon.`} />
        )
        resetForm()
      } catch (err) {
        toast.error(<ToastMessage title="Couldn't send your message" body={`Please try again, or email me at ${Bio.email}.`} />)
      } finally {
        setSending(false)
      }
    },
  })

  const err = (name) => touched[name] && errors[name]

  return (
    <Section id="contact">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          title="Let's"
          highlight="Work Together"
          desc="Have a question, an opportunity or just want to say hi? My inbox is always open."
        />
        <Layout>
          <Reveal style={{ height: '100%' }}>
            <SpotlightCard style={{ height: '100%' }}>
              <Side>
                <h3>
                  Got a project in mind?
                  <br />
                  <GradientText>Let's talk.</GradientText>
                </h3>
                <p>
                  I'm open to customer success, solutions and AI-automation roles, and to collaborating on
                  AI-agent projects.
                  <br />
                  Send a message here or find me on any of these.
                </p>
                {links.map((l) => (
                  <LinkRow key={l.title} href={l.href} {...(l.external === false ? {} : { target: '_blank', rel: 'noopener noreferrer' })} whileHover={{ x: 4 }}>
                    <span className="icon">{l.icon}</span>
                    <span className="text">
                      {l.title}
                      <small>{l.sub}</small>
                    </span>
                    <HiArrowUpRight className="arrow" />
                  </LinkRow>
                ))}
              </Side>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1}>
            <SpotlightCard>
              <Form onSubmit={handleSubmit} noValidate>
                <Honeypot
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                />
                <Row>
                  <Field>
                    <span>Name</span>
                    <Input name="from_name" placeholder="Jane Doe" value={values.from_name} onChange={handleChange} onBlur={handleBlur} $error={err('from_name')} />
                    {err('from_name') && <small>{errors.from_name}</small>}
                  </Field>
                  <Field>
                    <span>Email</span>
                    <Input type="email" name="from_email" placeholder="jane@company.com" value={values.from_email} onChange={handleChange} onBlur={handleBlur} $error={err('from_email')} />
                    {err('from_email') && <small>{errors.from_email}</small>}
                  </Field>
                </Row>
                <Field>
                  <span>Subject</span>
                  <Input name="subject" placeholder="What's this about?" value={values.subject} onChange={handleChange} onBlur={handleBlur} $error={err('subject')} />
                  {err('subject') && <small>{errors.subject}</small>}
                </Field>
                <Field>
                  <span>Message</span>
                  <TextArea name="message" rows={5} placeholder="Tell me a little about it..." value={values.message} onChange={handleChange} onBlur={handleBlur} $error={err('message')} />
                  {err('message') && <small>{errors.message}</small>}
                </Field>
                <Submit type="submit" disabled={sending} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  {sending ? <><Spinner /> Sending...</> : <>Send Message <HiPaperAirplane /></>}
                </Submit>
              </Form>
            </SpotlightCard>
          </Reveal>
        </Layout>
      </Container>
    </Section>
  )
}

export default Contact
