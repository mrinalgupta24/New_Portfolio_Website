import { lazy, Suspense, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import "react-toastify/dist/ReactToastify.css";
import { darkTheme } from './utils/Themes.js'
import './App.css';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Certifications from "./components/Certifications";
import Testimonials from "./components/Testimonials";
import GlobalReach from "./components/GlobalReach";
import Assistant from "./components/Assistant";
import CommandPalette from "./components/CommandPalette";
import Clarity from "./components/Clarity";
import { Background, ScrollProgress } from "./components/ui";

// The project popup is only needed after a click, so it loads on demand.
const ProjectDetails = lazy(() => import("./components/ProjectDetails"));

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    transition: background 0.4s ease, color 0.4s ease;
  }

  /* Toasts (react-toastify) restyled as glass cards that follow the site theme */
  :root {
    --toastify-color-success: #34d399;
    --toastify-color-error: #f87171;
    --toastify-font-family: 'Inter', system-ui, sans-serif;
    --toastify-toast-width: 380px;
  }
  .Toastify__toast-container {
    padding: 0 16px;
  }
  /* Sit above the "Ask my AI" button */
  .Toastify__toast-container--bottom-right {
    bottom: 92px;
  }
  .Toastify__toast {
    position: relative;
    overflow: hidden;
    margin-bottom: 12px;
    padding: 16px 18px 18px 20px;
    border-radius: 18px;
    font-size: 14.5px;
    font-weight: 500;
    line-height: 1.5;
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(20, 20, 32, 0.82)' : 'rgba(255, 255, 255, 0.9)')};
    border: 1px solid ${({ theme }) => theme.borderStrong};
    box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
    backdrop-filter: saturate(160%) blur(18px);
    -webkit-backdrop-filter: saturate(160%) blur(18px);
  }
  .Toastify__toast::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    bottom: 14px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: ${({ theme }) => theme.gradient};
  }
  .Toastify__toast--error::before {
    background: linear-gradient(180deg, #f87171, #e85d75);
  }
  .Toastify__toast-body {
    padding: 0;
    gap: 4px;
  }
  .Toastify__toast-icon {
    width: 22px;
    margin-inline-end: 12px;
  }
  .Toastify__close-button {
    align-self: center;
    margin-left: 10px;
    opacity: 0.6;
    color: ${({ theme }) => theme.text_secondary};
  }
  .Toastify__close-button:hover {
    opacity: 1;
  }
  .Toastify__progress-bar {
    height: 3px;
    background: ${({ theme }) => theme.gradient};
  }
  .Toastify__progress-bar--error {
    background: linear-gradient(90deg, #f87171, #e85d75);
  }
  .Toastify__progress-bar--bg {
    opacity: 0.12;
  }
  @media (max-width: 480px) {
    .Toastify__toast-container {
      width: 100%;
      bottom: 12px;
    }
  }
`

const Body = styled.main`
  position: relative;
  width: 100%;
  overflow-x: hidden;
`

const Home = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  return (
    <>
      <Navbar />
      <Body>
        <HeroSection />
        <GlobalReach />
        <Experience />
        <Skills />
        <Projects setOpenModal={setOpenModal} />
        <Certifications />
        <Education />
        <Testimonials />
        <Contact />
      </Body>
      <Footer />
      <Suspense fallback={null}>
        <AnimatePresence>
          {openModal.state && (
            <ProjectDetails key="project-details" openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </AnimatePresence>
      </Suspense>
    </>
  )
}

// The site is dark-only by design: it always opens in the dark theme.
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <MotionConfig reducedMotion="user">
        <GlobalStyle />
        <ScrollProgress />
        <Background />
        <Home />
        <Assistant />
        <CommandPalette />
        <Analytics />
        <Clarity />
        <ToastContainer position="bottom-right" theme="dark" autoClose={5000} newestOnTop pauseOnFocusLoss={false} />
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
