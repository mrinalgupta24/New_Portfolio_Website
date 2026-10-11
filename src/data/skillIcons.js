import { ReactComponent as Claude } from '../images/ai/claude-color.svg'
import { ReactComponent as OpenAI } from '../images/ai/openai.svg'
import { ReactComponent as Gemini } from '../images/ai/gemini-color.svg'
import { ReactComponent as Perplexity } from '../images/ai/perplexity-color.svg'
import { ReactComponent as Grok } from '../images/ai/grok.svg'
import { ReactComponent as DeepSeek } from '../images/ai/deepseek-color.svg'
import { ReactComponent as Mistral } from '../images/ai/mistral-color.svg'
import { ReactComponent as Meta } from '../images/ai/meta-color.svg'
import { ReactComponent as Copilot } from '../images/ai/copilot-color.svg'
import { ReactComponent as GithubCopilot } from '../images/ai/githubcopilot.svg'
import { ReactComponent as Cursor } from '../images/ai/cursor.svg'
import { ReactComponent as HuggingFace } from '../images/ai/huggingface-color.svg'
import { ReactComponent as Ollama } from '../images/ai/ollama.svg'
import { ReactComponent as N8n } from '../images/ai/n8n-color.svg'
import { ReactComponent as Mcp } from '../images/ai/mcp.svg'
import { ReactComponent as GroqIcon } from '../images/ai/groq.svg'
import {
  SiOracle, SiClickhouse, SiLinear, SiZendesk, SiSalesforce, SiGooglesheets, SiMetabase, SiHtml5, SiCss3,
  SiYaml, SiJson, SiCurl, SiPostman, SiMysql, SiPostgresql, SiMongodb, SiElasticsearch, SiRedis, SiPython,
  SiJavascript, SiJira, SiSlack, SiNotion, SiReact, SiAmazonaws, SiGooglecloud, SiMicrosoftazure, SiDocker,
  SiKubernetes, SiGithub, SiGrafana, SiPrometheus, SiDatadog, SiAmazoncloudwatch, SiLinux, SiWindows, SiApple,
  SiGithubactions, SiVite, SiFramer, SiStyledcomponents, SiThreedotjs, SiVercel, SiCloudflare, SiNodedotjs, SiWebgl,
} from 'react-icons/si'
import {
  HiSparkles, HiChatBubbleLeftRight, HiCpuChip, HiArrowPath, HiCodeBracketSquare, HiWrench,
  HiExclamationTriangle, HiMagnifyingGlassCircle, HiBugAnt, HiArrowTrendingUp, HiClock, HiGlobeAlt,
  HiServerStack, HiLockClosed, HiArrowsRightLeft, HiLink, HiKey, HiLifebuoy, HiSignal, HiCursorArrowRays, HiShieldCheck,
  HiCloudArrowUp,
} from 'react-icons/hi2'

// Every skill chip name -> icon + brand colour. A null colour follows the theme text colour,
// which keeps black logos (GitHub, Notion, Apple...) visible in dark mode.
export const skillIcons = {
  // AI & Automation
  LLMs: { Icon: HiSparkles, color: '#a78bfa' },
  'Prompt Engineering': { Icon: HiChatBubbleLeftRight, color: '#f472b6' },
  'AI Agents': { Icon: HiCpuChip, color: '#f4a261' },
  'Workflow Automation': { Icon: HiArrowPath, color: '#34d399' },
  MCP: { Icon: Mcp, color: null },
  n8n: { Icon: N8n, color: null },

  // AI platforms & models (LobeHub icons, MIT)
  Claude: { Icon: Claude, color: null },
  ChatGPT: { Icon: OpenAI, color: null },
  Gemini: { Icon: Gemini, color: null },
  Perplexity: { Icon: Perplexity, color: null },
  Grok: { Icon: Grok, color: null },
  DeepSeek: { Icon: DeepSeek, color: null },
  Mistral: { Icon: Mistral, color: null },
  'Meta Llama': { Icon: Meta, color: null },
  'Microsoft Copilot': { Icon: Copilot, color: null },
  'GitHub Copilot': { Icon: GithubCopilot, color: null },
  Cursor: { Icon: Cursor, color: null },
  'Hugging Face': { Icon: HuggingFace, color: null },
  Ollama: { Icon: Ollama, color: null },
  Groq: { Icon: GroqIcon, color: '#F55036' },

  // Used to build this portfolio
  Vercel: { Icon: SiVercel, color: null },
  Cloudflare: { Icon: SiCloudflare, color: '#F38020' },
  'Serverless Functions': { Icon: HiCloudArrowUp, color: '#a78bfa' },
  'Better Stack': { Icon: HiSignal, color: '#34d399' },
  'Microsoft Clarity': { Icon: HiCursorArrowRays, color: '#4F9BF7' },
  'Uptime Monitoring': { Icon: HiSignal, color: '#f4a261' },
  'Web Security Headers': { Icon: HiShieldCheck, color: '#34d399' },
  Vite: { Icon: SiVite, color: '#A78BFA' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  'styled-components': { Icon: SiStyledcomponents, color: '#DB7093' },
  'Framer Motion': { Icon: SiFramer, color: null },
  'Three.js': { Icon: SiThreedotjs, color: null },
  WebGL: { Icon: SiWebgl, color: '#E34F26' },

  // Technical Support
  Troubleshooting: { Icon: HiWrench, color: '#f4a261' },
  'Incident Management': { Icon: HiExclamationTriangle, color: '#fbbf24' },
  'Root Cause Analysis': { Icon: HiMagnifyingGlassCircle, color: '#60a5fa' },
  'Bug Reproduction': { Icon: HiBugAnt, color: '#f87171' },
  'Issue Escalation': { Icon: HiArrowTrendingUp, color: '#a78bfa' },
  'SLA Management': { Icon: HiClock, color: '#34d399' },

  // Cloud & DevOps
  AWS: { Icon: SiAmazonaws, color: '#FF9900' },
  GCP: { Icon: SiGooglecloud, color: '#4285F4' },
  Azure: { Icon: SiMicrosoftazure, color: '#0089D6' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  Kubernetes: { Icon: SiKubernetes, color: '#326CE5' },
  'CI/CD Fundamentals': { Icon: SiGithubactions, color: '#2088FF' },
  GitHub: { Icon: SiGithub, color: null },

  // Monitoring
  'AWS CloudWatch': { Icon: SiAmazoncloudwatch, color: '#FF4F8B' },
  Datadog: { Icon: SiDatadog, color: '#8b5cf6' },
  Grafana: { Icon: SiGrafana, color: '#F46800' },
  Prometheus: { Icon: SiPrometheus, color: '#E6522C' },

  // Operating Systems
  Windows: { Icon: SiWindows, color: '#0078D6' },
  macOS: { Icon: SiApple, color: null },
  Linux: { Icon: SiLinux, color: '#FCC624' },

  // Databases
  MySQL: { Icon: SiMysql, color: '#4479A1' },
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  MongoDB: { Icon: SiMongodb, color: '#47A248' },
  Oracle: { Icon: SiOracle, color: '#F80000' },
  ClickHouse: { Icon: SiClickhouse, color: '#FFCC01' },
  Elasticsearch: { Icon: SiElasticsearch, color: '#00BFB3' },
  Redis: { Icon: SiRedis, color: '#DC382D' },

  // Programming
  Python: { Icon: SiPython, color: '#3776AB' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  JSON: { Icon: SiJson, color: null },
  YAML: { Icon: SiYaml, color: '#CB171E' },

  // Networking & APIs
  'TCP/IP': { Icon: HiServerStack, color: '#60a5fa' },
  DNS: { Icon: HiGlobeAlt, color: '#34d399' },
  'HTTP/HTTPS': { Icon: HiArrowsRightLeft, color: '#f4a261' },
  'SSL/TLS': { Icon: HiLockClosed, color: '#fbbf24' },
  'REST APIs': { Icon: HiCodeBracketSquare, color: '#a78bfa' },
  Webhooks: { Icon: HiLink, color: '#f472b6' },
  SSO: { Icon: HiKey, color: '#e85d75' },
  Postman: { Icon: SiPostman, color: '#FF6C37' },
  cURL: { Icon: SiCurl, color: '#73b7e8' },

  // Tools & Collaboration
  Linear: { Icon: SiLinear, color: '#5E6AD2' },
  Jira: { Icon: SiJira, color: '#0052CC' },
  Zendesk: { Icon: SiZendesk, color: null },
  Salesforce: { Icon: SiSalesforce, color: '#00A1E0' },
  Slack: { Icon: SiSlack, color: '#E01E5A' },
  Freshdesk: { Icon: HiLifebuoy, color: '#25C16F' },
  Notion: { Icon: SiNotion, color: null },
  'Google Sheets': { Icon: SiGooglesheets, color: '#34A853' },
  Metabase: { Icon: SiMetabase, color: '#509EE3' },

  // Frontend
  HTML5: { Icon: SiHtml5, color: '#E34F26' },
  CSS3: { Icon: SiCss3, color: '#1572B6' },
  ReactJS: { Icon: SiReact, color: '#61DAFB' },
}
