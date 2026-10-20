/**
 * ─────────────────────────────────────────────────────────────
 *  Portfolio content — edit this file to personalise the site.
 * ─────────────────────────────────────────────────────────────
 *  • Leave a URL as an empty string ('') and the UI simply hides that link —
 *    no dead links or "coming soon" placeholders are shown to visitors.
 *  • Anything marked TODO is placeholder content you should replace.
 */

export const profile = {
  name: 'Dheeraj',
  // Shown in the nav and footer.
  monogram: 'DHEERAJ',
  role: 'AI & Backend Engineer',
  // Rendered in uppercase by CSS ("HI, I'M").
  intro: "Hi, I'm",
  tagline:
    'Building intelligent systems that work in production — AI‑powered workflows, reliable APIs, and machine learning solutions for real-world problems.',
  available: true,
  availabilityLabel: 'Available for work',
  // TODO: optional — e.g. 'Pune, India'. Leave '' to hide.
  location: '',
}

export const links = {
  // TODO: replace with your real address — powers every "email" action on the site.
  email: 'hello@example.com',
  // TODO: e.g. 'https://github.com/your-handle'
  github: '',
  // TODO: e.g. 'https://www.linkedin.com/in/your-handle'
  linkedin: '',
  // TODO: drop your CV at /public/cv.pdf and set this to '/cv.pdf'.
  // While empty, the CV action is an honest "Request CV" email instead of a download.
  cv: '',
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const about = {
  heading: 'Building AI systems that actually work.',
  paragraphs: [
    "I'm an AI & backend engineer. I like the part of the job where a fuzzy idea becomes a system that runs reliably — clear APIs, sensible data models, background jobs that don't fall over, and AI features that hold up outside a demo.",
    'Most of what I build sits where language models meet production software: workflow automation that takes repetitive work off people’s plates, developer tooling, and real-time backends with clean access control.',
  ],
  principles: [
    {
      title: 'Engineering first',
      body: 'AI features are only as good as the system around them — queues, retries, observability, and clean interfaces.',
    },
    {
      title: 'Problem before tool',
      body: 'Start from the workflow that hurts, then pick the simplest model and architecture that fixes it.',
    },
    {
      title: 'Useful over impressive',
      body: 'Ship things people actually use, measure what happens, and iterate from there.',
    },
  ],
}

export const stack = [
  {
    id: 'ai',
    title: 'AI / ML',
    note: 'LLM apps, agents & evaluation',
    items: ['OpenAI API', 'Gemini', 'RAG', 'Agents', 'Prompting', 'Fine-tuning', 'Python'],
  },
  {
    id: 'backend',
    title: 'Backend',
    note: 'APIs, workers & real-time',
    items: ['FastAPI', 'Node.js', 'Express', 'Celery', 'Socket.IO', 'REST'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    note: 'Interfaces that stay fast',
    items: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS'],
  },
  {
    id: 'data',
    title: 'Databases',
    note: 'Schemas, queries & caching',
    items: ['PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'tools',
    title: 'Developer tools',
    note: 'Build, ship, iterate',
    items: ['Git', 'GitHub', 'Docker', 'Linux', 'CLI tooling'],
  },
]

/**
 * Projects — shown as short case studies.
 *  - `problem` (optional): one line on what the project solves.
 *  - `approach` (optional): 2–3 engineering points (architecture, key decisions).
 *  - `results` (optional): ONLY verified outcomes. Nothing is shown when empty.
 *  - `preview` picks the built-in illustrated preview: 'workflow' | 'terminal' | 'board' | 'shop'
 *  - `image` (optional): import a real screenshot and set it here to replace the illustration.
 *  - `github` / `live`: leave '' until you have real URLs (the link is hidden until then).
 * TODO: review `problem` / `approach` — written only from the stack you listed; no metrics claimed.
 */
export const projects = [
  {
    id: 'autoflow',
    title: 'AutoFlow',
    kind: 'AI automation',
    description: 'AI-powered workflow automation for Gmail.',
    problem: 'Repetitive inbox work follows patterns a language model can take over.',
    approach: [
      'FastAPI service receives inbox events and exposes the automation API.',
      'Celery workers on a Redis queue run LLM-driven actions asynchronously, so the API stays responsive.',
    ],
    results: [],
    tags: ['FastAPI', 'Celery', 'Redis', 'Python', 'LLM'],
    preview: 'workflow',
    image: null,
    github: '',
    live: '',
  },
  {
    id: 'sage-cli',
    title: 'Sage CLI',
    kind: 'Developer tool',
    description: 'An AI developer tool that lives in the terminal.',
    problem: 'Jumping between the terminal and a chat window breaks a developer’s flow.',
    approach: ['Brings an LLM assistant into the command-line workflow developers already use.'],
    results: [],
    tags: ['CLI', 'LLM', 'Developer tooling'],
    preview: 'terminal',
    image: null,
    github: '',
    live: '',
  },
  {
    id: 'task-manager',
    title: 'Real-time Task Manager',
    kind: 'Full-stack app',
    description: 'A collaborative task manager for teams.',
    problem: 'Everyone on a team should see task changes the moment they happen — and only the right people should make them.',
    approach: [
      'Socket.IO pushes every change to connected clients in real time.',
      'Role-based access control enforced on the Express API, with PostgreSQL as the source of truth.',
    ],
    results: [],
    tags: ['React', 'Express', 'PostgreSQL', 'Socket.IO', 'RBAC'],
    preview: 'board',
    image: null,
    github: '',
    live: '',
  },
  {
    id: '40god',
    title: '40God',
    kind: 'E-commerce',
    description:
      'An e-commerce project covering the storefront experience — product browsing, product pages, and the path to checkout.',
    // TODO: add the real stack used for this project.
    tags: ['E-commerce', 'Web'],
    preview: 'shop',
    image: null,
    github: '',
    live: '',
  },
]

/**
 * Experience — TODO: replace every entry below with your real history.
 * Entries marked `placeholder: true` are only visible while developing (npm run dev), with an
 * "edit me" marker. In the production build the section — and its nav link — stay hidden until
 * at least one real entry exists, so visitors never see placeholder history.
 */
export const experience = [
  {
    period: 'YYYY — Present',
    role: 'Your current role',
    org: 'Company or organisation',
    summary: 'One or two lines on what you own, the systems you build, and the tools you use day to day.',
    tags: ['Python', 'FastAPI'],
    placeholder: true,
  },
  {
    period: 'YYYY — YYYY',
    role: 'Previous role or internship',
    org: 'Company or organisation',
    summary: 'What you worked on and what you learned. Keep it concrete and honest.',
    tags: ['React', 'Node.js'],
    placeholder: true,
  },
  {
    period: 'YYYY — YYYY',
    role: 'Degree or programme',
    org: 'University or institution',
    summary: 'Field of study, focus areas, or notable coursework.',
    tags: [],
    placeholder: true,
  },
]

/**
 * Technology ticker shown right below the hero.
 * Keys map to official brand marks from `simple-icons` (see src/components/TechTicker.jsx).
 * Available: javascript, typescript, react, nextjs, tailwind, nodejs, express, python, fastapi,
 * celery, redis, postgresql, mongodb, socketio, docker, git, github, gemini, linux, vite, langchain
 */
/** True once at least one real (non-placeholder) experience entry exists. */
export const hasRealExperience = experience.some((item) => !item.placeholder)
/** Show the Experience section: always while developing, in production only with real entries. */
export const showExperience = import.meta.env.DEV || hasRealExperience

export const ticker = [
  'python',
  'fastapi',
  'javascript',
  'react',
  'nextjs',
  'nodejs',
  'express',
  'postgresql',
  'mongodb',
  'redis',
  'celery',
  'socketio',
  'docker',
  'git',
  'github',
  'tailwind',
  'gemini',
  'linux',
]
