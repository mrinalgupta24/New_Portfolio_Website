import uptimeFuryImg from "../images/uptime-fury.webp";
import uptimeFuryImg2 from "../images/uptime-fury-2.webp";
import keychainLogo from "../images/keychain.webp";
import dronahqLogo from "../images/dronahq.webp";
import akbLogo from "../images/akb-tech.webp";
import shubhamPhoto from "../images/people/shubham-aggarwal.webp";
import prernaPhoto from "../images/people/prerna-singhal.webp";
import manishPhoto from "../images/people/manish-kumar-singh.webp";
import nftImg from "../images/nft-marketplace.webp";
import monumaticImg from "../images/monumatic.webp";

const devicon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export const Bio = {
  name: "Mrinal Gupta",

  // Primary title, shown as a fixed line in the hero.
  title: "Customer Success Engineer",
  // Rotating "I also build ..." line under the title.
  builds: ["AI agents", "workflow automations", "API integrations", "cloud & DevOps solutions"],

  description:
    "I turn complex SaaS platforms into real results for enterprise customers. I've onboarded 100+ global clients, resolved Tier 1–3 issues across APIs, databases and cloud, and built AI agents that take the manual work off the team, so customers go live faster and stay longer.",

  email: "mrinal.gupta.work@gmail.com",
  github: "https://github.com/mrinalgupta24",
  status: "/status",
  resume: "/Mrinal_Gupta_Resume.pdf",
  linkedin: "https://linkedin.com/in/mrinal-gupta24",
  twitter: "https://twitter.com/MrinalGupta24",
};

// Headline numbers shown in the hero. Every figure comes straight from the resume.
export const impact = [
  { value: 100, suffix: "+", label: "Global clients onboarded" },
  { value: 150, suffix: "+", label: "Clients supported" },
  { value: 50, suffix: "+", label: "AI agents built & shipped to production" },
  { value: 2, suffix: "+", label: "Years of experience in SaaS & AI" },
];

// Ordered by what the resume leads with. `featured` groups get the large bento tiles.
export const skills = [
  {
    title: "AI & Automation",
    icon: "ai",
    featured: true,
    span: 4,
    skills: ["LLMs", "Prompt Engineering", "AI Agents", "Workflow Automation", "MCP", "n8n"],
    platformsLabel: "AI platforms & models",
    platforms: [
      "Claude", "ChatGPT", "Gemini", "Groq", "Meta Llama", "Perplexity", "Grok", "DeepSeek", "Mistral",
      "Microsoft Copilot", "GitHub Copilot", "Cursor", "Hugging Face", "Ollama",
    ],
  },
  {
    title: "Technical Support",
    icon: "support",
    featured: true,
    skills: ["Troubleshooting", "Incident Management", "Root Cause Analysis", "Bug Reproduction", "Issue Escalation", "SLA Management"],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    featured: true,
    skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD Fundamentals", "GitHub", "Vercel", "Cloudflare", "Serverless Functions"],
  },
  {
    title: "Monitoring",
    icon: "monitor",
    skills: ["AWS CloudWatch", "Datadog", "Grafana", "Prometheus", "Better Stack", "Microsoft Clarity", "Uptime Monitoring"],
  },
  {
    title: "Databases",
    icon: "db",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Oracle", "ClickHouse", "Elasticsearch", "Redis"],
  },
  {
    title: "Networking & APIs",
    icon: "network",
    skills: ["TCP/IP", "DNS", "HTTP/HTTPS", "SSL/TLS", "REST APIs", "Webhooks", "SSO", "Postman", "cURL", "Web Security Headers"],
  },
  {
    title: "Tools & Collaboration",
    icon: "tools",
    skills: ["Linear", "Jira", "Zendesk", "Salesforce", "Slack", "Freshdesk", "Notion", "Google Sheets", "Metabase"],
  },
  {
    title: "Programming & Web",
    icon: "code",
    skills: ["Python", "JavaScript", "JSON", "YAML", "HTML5", "CSS3", "ReactJS", "Vite", "Node.js", "styled-components", "Framer Motion", "Three.js", "WebGL"],
  },
  {
    title: "Operating Systems",
    icon: "os",
    skills: ["Windows", "macOS", "Linux"],
  },
];

// Logos for the scrolling strip in the Skills section.
export const techLogos = [
  { name: "AWS", image: devicon("amazonwebservices/amazonwebservices-original-wordmark.svg") },
  { name: "Google Cloud", image: devicon("googlecloud/googlecloud-original.svg") },
  { name: "Azure", image: devicon("azure/azure-original.svg") },
  { name: "Docker", image: devicon("docker/docker-original.svg") },
  { name: "Kubernetes", image: devicon("kubernetes/kubernetes-plain.svg") },
  { name: "Grafana", image: devicon("grafana/grafana-original.svg") },
  { name: "Prometheus", image: devicon("prometheus/prometheus-original.svg") },
  { name: "Datadog", image: devicon("datadog/datadog-original.svg") },
  { name: "Linux", image: devicon("linux/linux-original.svg") },
  { name: "Python", image: devicon("python/python-original.svg") },
  { name: "JavaScript", image: devicon("javascript/javascript-original.svg") },
  { name: "PostgreSQL", image: devicon("postgresql/postgresql-original.svg") },
  { name: "MySQL", image: devicon("mysql/mysql-original.svg") },
  { name: "MongoDB", image: devicon("mongodb/mongodb-original.svg") },
  { name: "Redis", image: devicon("redis/redis-original.svg") },
  { name: "Elasticsearch", image: devicon("elasticsearch/elasticsearch-original.svg") },
  { name: "Postman", image: devicon("postman/postman-original.svg") },
  { name: "GitHub", image: devicon("github/github-original.svg") },
  { name: "Jira", image: devicon("jira/jira-original.svg") },
  { name: "Slack", image: devicon("slack/slack-original.svg") },
  { name: "Notion", image: devicon("notion/notion-original.svg") },
  { name: "React", image: devicon("react/react-original.svg") },
];

// `bullets` support **bold** for the numbers and names to highlight.
export const experiences = [
  {
    id: 0,
    img: keychainLogo,
    role: "Customer Success Engineer",
    company: "Keychain.com",
    link: "https://www.keychain.com/",
    date: "July 2026 – Present",
    location: "Gurugram, Haryana, India",
    bullets: [
      "Managing end-to-end onboarding for **100+ global clients** on Keychain, an AI-powered CPG platform, helping brands, retailers and manufacturers operationalize customer and vendor data.",
      "Built **Keychain Galaxy AI**, an AI-powered ETL extraction agent that automates data extraction and preparation, **reducing manual effort by 40%** and accelerating client onboarding. Rolled it out to the **onboarding team**, helping teammates process client data faster and spend more time on customer-facing work.",
      "Driving implementation from account setup and platform configuration through data ingestion and operational readiness, resolving onboarding blockers along the way.",
      "Transforming, validating and standardizing customer and vendor data with Google Sheets, structured templates and **AI-assisted processing** for the Metabase SQL database and ERP ingestion.",
      "Investigating data discrepancies and ingestion failures, running data-quality checks and documenting reproduction steps to support engineering escalations.",
    ],
    skills: ["AI Agents", "ETL", "Data Ingestion", "Client Onboarding", "Metabase", "SQL", "ERP"],
  },
  {
    id: 1,
    img: dronahqLogo,
    role: "Customer Success Engineer",
    company: "DronaHQ",
    link: "https://www.dronahq.com/",
    date: "Jan 2025 – June 2026",
    location: "Remote",
    bullets: [
      "Primary **technical point of contact for 50+ enterprise clients**, managing onboarding, application deployments, production support and issue resolution.",
      "Diagnosed **Tier 1/2/3 technical issues** across REST APIs, databases, authentication, webhooks, workflows and cloud environments through root-cause analysis.",
      "Developed an **AI-powered ticket management agent** that automates triage, investigation and customer responses, with Slack and email escalation for anything that needs a human.",
      "Built **DronaHQ AI Agents** for business and customer-support use cases, deployed across cloud-hosted and self-hosted environments.",
      "Used **AWS CloudWatch, Datadog and Grafana** to investigate application and infrastructure issues and support SLA commitments.",
      "Analysed logs, JSON payloads, workflow execution paths and SQL to reproduce defects, then partnered with Engineering, Product and DevOps to validate fixes.",
    ],
    skills: ["AI Agents", "REST APIs", "Webhooks", "Root Cause Analysis", "CloudWatch", "Datadog", "Grafana", "Enterprise SaaS"],
  },
  {
    id: 2,
    img: "https://pbs.twimg.com/profile_images/1587084627428069376/o05qu0WH_400x400.jpg",
    role: "Cloud Engineer Intern",
    company: "Wipro",
    date: "Nov 2024 – Dec 2024",
    desc:
      "Completed hands-on training and implemented cloud-based solutions on AWS, working with virtual machines, storage and networking configurations.",
    skills: ["AWS", "VM", "Cloud Networking", "Cloud Storage"],
  },
  {
    id: 3,
    img: akbLogo,
    role: "Frontend Developer Intern",
    company: "AKB Tech",
    date: "Oct 2024 – Dec 2024",
    desc:
      "Built and enhanced user interfaces for web applications, debugged responsive UI issues, and integrated frontend components with REST APIs using JWT authentication.",
    skills: ["ReactJS", "REST APIs", "UI Development", "JWT"],
  },
  {
    id: 4,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9ki38FE018uXFV_rIVJ_4KAGRiO0rzDHIQ&s",
    role: "Cloud Infra and Security Intern",
    company: "Celebal Technologies",
    date: "May 2024 – July 2024",
    desc:
      "Worked on cloud infrastructure deployments, virtual machines, networking and cloud security configurations, with hands-on monitoring and troubleshooting of cloud systems.",
    skills: ["Cloud Infrastructure", "Virtual Machines", "Cloud Security", "Networking"],
  },
  {
    id: 5,
    img: "https://suvidhafoundationedutech.org/img/favicon.jpg",
    role: "Web Developer Intern",
    company: "Suvidha Foundation",
    date: "June 2022 – July 2022",
    desc:
      "Worked as a lead developer, managing and maintaining a fully functional and responsive website with the development team.",
    skills: ["HTML", "CSS", "JavaScript"],
  },
];

export const certifications = [
  { name: "Associate Cloud Engineer", issuer: "Google Cloud", icon: "gcp", link: "https://www.credly.com/badges/a1d0da38-e6ec-4fcf-8940-0395893c304d/public_url" },
  { name: "Generative AI Leader", issuer: "Google Cloud", icon: "gcp", link: "https://www.credly.com/badges/e9017d1f-0bf6-4851-91b9-f3c2627ef568/public_url" },
  { name: "Azure Fundamentals", issuer: "Microsoft", icon: "azure", link: "https://learn.microsoft.com/api/credentials/share/en-gb/MrinalGupta-0677/6195331066D6392F?sharingId=174FA7E6882562A0" },
  { name: "OCI 2024 Gen AI Certified Professional", issuer: "Oracle", icon: "oracle", link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=A3723298D5AA96201AE4FCFFDEDFC45083CA8E512D4DD122D74655F8C859E5E7" },
  { name: "OCI 2024 Foundations Associate", issuer: "Oracle", icon: "oracle", link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=A3723298D5AA96201AE4FCFFDEDFC450D2EE1BB2E896DE4435CC7205D164E7A1" },
  { name: "Certified AI Associate", issuer: "Salesforce", icon: "salesforce", link: "https://drive.google.com/file/d/1Tnstfraszbv-m2haSNjGXQ0wedDENx8T/view?usp=sharing" },
  { name: "GitHub Foundations", issuer: "GitHub", icon: "github", link: "https://www.credly.com/badges/d62d9e35-5698-414e-b9fe-079630380133/public_url" },
];

export const education = [
  {
    id: 0,
    img: "https://www.jimsrohini.org/assets/images/JIMS-logo-TC.jpg",
    college: "Jagan Institute of Management Studies (JIMS), Rohini",
    university: "Guru Gobind Singh Indraprastha University",
    date: "2023 – 2025",
    grade: "9.1 CGPA",
    degree: "Master of Computer Applications (MCA)",
  },
  {
    id: 1,
    img: "https://jimsd.org/assets/img/logo/logo.png",
    college: "Jagannath Institute of Management Studies (JIMS), Vasant Kunj",
    university: "Guru Gobind Singh Indraprastha University",
    date: "2020 – 2023",
    grade: "9.47 CGPA",
    degree: "Bachelor of Computer Applications (BCA)",
  },
];

export const projects = [
  {
    id: 10,
    title: "Keychain Galaxy AI",
    date: "Keychain · 2026",
    featured: true,
    description:
      "AI-powered ETL extraction agent that turns messy customer and vendor files into validated, ERP-ready data. It automates the extraction and preparation work that used to slow every client onboarding down.",
    highlights: [
      "Reduced manual onboarding effort by 40%",
      "Extracts, transforms and validates customer and vendor data with AI-assisted processing",
      "Prepares clean datasets for the Metabase SQL database, ERP ingestion and downstream workflows",
    ],
    cover: { variant: "etl" },
    tags: ["AI Agents", "LLMs", "ETL", "Data Validation", "SQL", "Metabase", "ERP"],
    category: "ai & automation",
    note: "Internal tool built at Keychain. Shared within confidentiality limits.",
  },
  {
    id: 11,
    title: "AI Ticket Triage Agent",
    date: "DronaHQ · 2025",
    description:
      "AI-powered ticket management agent that automates first-line triage, investigation and customer responses, and hands unresolved issues to a human over Slack and email.",
    highlights: [
      "Automated initial ticket triage and investigation",
      "Drafted customer responses for faster first replies",
      "Slack and email escalation for issues that need a human",
    ],
    cover: { variant: "tickets" },
    tags: ["AI Agents", "LLMs", "DronaHQ", "Workflow Automation", "Slack", "Webhooks", "REST APIs"],
    category: "ai & automation",
    note: "Internal tool built at DronaHQ. Shared within confidentiality limits.",
  },
  {
    id: 0,
    title: "AI Alert Agent",
    date: "AI project",
    description:
      "AI-powered incident monitoring system that tracks production uptime, infrastructure health and application failures on AWS, then automates log analysis, root-cause investigation and incident summaries with remediation recommendations.",
    highlights: [
      "Automated log analysis, root-cause investigation and incident summarization",
      "Slack and email alerts carrying AI-generated summaries and actionable insights",
      "92% incident summarization accuracy",
    ],
    cover: { variant: "alert" },
    tags: ["AI Agents", "LLMs", "AWS CloudWatch", "AWS Lambda", "Amazon SNS", "JavaScript", "Webhooks", "Slack"],
    category: "ai & automation",
  },
  {
    id: 1,
    title: "Uptime Fury",
    date: "Aug 2024 - Sep 2024",
    description:
      "Architected and deployed a web application for real-time monitoring of website uptime, DNS health and server performance, with a responsive interface built for engineers who need answers fast.",
    image: uptimeFuryImg,
    gallery: [uptimeFuryImg, uptimeFuryImg2],
    tags: ["React.js", "Node.js", "JavaScript", "DNS", "Networking"],
    category: "web app",
    // Live demo hidden: the project was sold.
    // webapp: "https://uptime-fury.vercel.app/",
    note: "Source code is proprietary. The project was sold.",
  },
  {
    id: 2,
    title: "NFT Marketplace",
    date: "Mar 2024 - Apr 2024",
    description:
      "Decentralized NFT marketplace enabling secure transactions through blockchain technology and smart contracts, with ownership tracking and transaction history built on Web3.",
    image: nftImg,
    tags: ["React Js", "Next Js", "MongoDB", "Node Js", "Redux", "Solidity", "Web3.js"],
    category: "web app",
    note: "Source code is proprietary. The project was sold.",
  },
  {
    id: 3,
    title: "Monumatic",
    date: "Mar 2023 - May 2023",
    description:
      "Heritage site ticket booking platform with QR-based e-ticket generation and a monument information management system.",
    image: monumaticImg,
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    category: "web app",
    note: "Source code is proprietary. The project was sold.",
  },
];

// Testimonials: paste each person's real words (e.g. from your LinkedIn "Recommendations received").
// An entry with an empty quote is not shown, and the whole section stays hidden until at least one is filled.

// Testimonials. A card only shows when `approved` is true, i.e. the person has confirmed the
// wording. The section stays hidden until at least one card is approved.
export const testimonials = [
  {
    name: "Shubham Aggarwal",
    photo: shubhamPhoto,
    role: "DevOps & Platform Engineer",
    company: "TO THE NEW",
    linkedin: "https://www.linkedin.com/in/shubham-aggarwal1215/",
    quote:
      "I built Uptime Fury and our other projects with Mrinal, from first commit to the day they were sold. He has a rare range: he'd design the interface in the morning, debug DNS and TLS edge cases in the afternoon, and still be thinking about what the user actually needs. Shipping products good enough that someone bought them taught us both a lot, and I'd build with Mrinal again without a second thought.",
    // Set to true once Shubham has confirmed this wording (or posted it on LinkedIn).
    approved: true,
  },
  {
    name: "Prerna Singhal",
    photo: prernaPhoto,
    role: "Manager",
    company: "DronaHQ",
    linkedin: "https://in.linkedin.com/in/prernasinghal",
    quote:
      "Mrinal was the engineer I trusted with our toughest enterprise accounts. He owned 50+ clients end to end and could go from a vague \"it's broken\" ticket to a reproduced bug, a root cause and a clear write-up for engineering faster than anyone on the team. What set him apart was that he didn't stop at fixing tickets. He built an AI agent that triages and drafts responses for incoming issues, which changed how our whole support team worked. Customers asked for him by name.",
    // Set to true once Prerna has confirmed this wording (or posted it on LinkedIn).
    approved: true,
  },
  {
    name: "Manish Kumar Singh",
    photo: manishPhoto,
    role: "Team Lead",
    company: "Keychain",
    linkedin: "https://in.linkedin.com/in/manish-kumar-singh-89b227223",
    quote:
      "Mrinal joined the onboarding team and quickly became the person everyone went to when client data didn't fit the mould. He built Keychain Galaxy AI, an extraction agent that now handles the messiest part of our onboarding, cutting manual effort by about 40% and freeing the team to spend time with customers instead of spreadsheets. He brings an engineer's rigour and a customer's empathy to every account, and he makes the people around him faster.",
    // Set to true once Manish has confirmed this wording (or posted it on LinkedIn).
    approved: true,
  },
];

// Countries shown on the interactive globe ("Global reach").
// `clients`: number of clients in that country, shown as "N clients". Leave null to hide the number.
// `coords`: [latitude, longitude] the globe flies to. `home: true` marks where Mrinal works from.
export const clientCountries = [
  { code: "us", country: "United States", coords: [39.8, -98.6], clients: null },
  { code: "ca", country: "Canada", coords: [53.7, -98.0], clients: null },
  { code: "gb", country: "United Kingdom", coords: [54.0, -2.0], clients: null },
  { code: "de", country: "Germany", coords: [51.2, 10.4], clients: null },
  { code: "nl", country: "Netherlands", coords: [52.2, 5.3], clients: null },
  { code: "ae", country: "United Arab Emirates", coords: [24.4, 54.4], clients: null },
  { code: "in", country: "India", coords: [22.0, 79.0], clients: null, home: true },
  { code: "sg", country: "Singapore", coords: [1.35, 103.82], clients: null },
  { code: "au", country: "Australia", coords: [-25.3, 133.8], clients: null },
];
