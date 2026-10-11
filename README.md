# 💻 Portfolio Website

Personal portfolio of Mrinal Gupta, Customer Success Engineer, built with **React**, **Vite** and **Framer Motion**. It showcases experience, skills, AI projects, certifications and testimonials, with a working contact form.

🌐 **Live:** [mrinalguptawebsite.vercel.app](https://mrinalguptawebsite.vercel.app/)

---

## 🚀 Features

* 📱 **Responsive:** tested on Chrome, Firefox and Safari across desktop, iPhone and iPad.
* 🌗 **Dark and light themes,** remembered per visitor.
* ✨ **Motion:** scroll reveals, animated project covers and count-up stats, with reduced motion respected.
* ✉️ **Contact form** delivered to Gmail through [Web3Forms](https://web3forms.com/), with a spam honeypot.
* ⚡ **Performance:** WebP images, code-split bundles, Lighthouse 99/100/100/100 on desktop.
* 🔒 **Security headers** (CSP, HSTS, frame protection) configured in `vercel.json`.
* 🤖 **Ask Mrinal's AI:** a resume-grounded Gemini assistant behind a Vercel function (`api/chat.js`).
* 🌍 **Interactive 3D globe** of client regions (cobe) and a **⌘K command palette**.
* 📊 **Vercel Web Analytics** and optional **Microsoft Clarity**.

---

## 🛠️ Tech Stack

* **Core:** React 18 + Vite
* **Styling:** styled-components
* **Animation:** Framer Motion
* **Forms:** Formik + Yup, Web3Forms, react-toastify
* **Icons:** react-icons, LobeHub AI icons

---

## 🏁 Getting Started

```bash
npm install
cp .env.example .env.local   # then add your Web3Forms access key
npm start                    # dev server on http://localhost:3000
npm run build                # production build into build/
npm run preview              # serve the production build locally
```

### Environment variables

| Variable | Where to get it |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms dashboard → your form's access key |
| `VITE_CLARITY_ID` *(optional)* | clarity.microsoft.com → project Settings → Overview |
| `GEMINI_API_KEY` *(optional, server-only)* | aistudio.google.com/apikey, powers "Ask Mrinal's AI" |
| `GEMINI_MODEL` *(optional)* | Defaults to `gemini-2.5-flash` |
| `VITE_ASSISTANT_ENABLED` *(optional)* | `true` to show the AI chat once `GEMINI_API_KEY` is set |

Set it in `.env.local` for local development and in **Vercel → Settings → Environment Variables** for production.

---

## 📂 Project Structure

```text
src/
├── components/   # One folder per section (HeroSection, Experience, Skills, Projects, ...)
│   ├── Cards/    # Experience, education and project cards, plus project cover art
│   └── ui/       # Shared building blocks: section header, reveal, buttons, background
├── data/         # All site content: constants.js (bio, experience, projects...) and skillIcons.js
├── images/       # WebP images, people photos and AI provider logos
└── utils/        # Theme tokens (dark and light)
```

Most content updates only need changes to `src/data/constants.js`.
