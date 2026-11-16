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
  // Full name — used wherever search engines and screen readers read who this is.
  fullName: 'Dheeraj Chingunde',
  // Shown in the nav and footer.
  monogram: 'DHEERAJ',
  role: 'AI & Backend Engineer',
  // Rendered in uppercase by CSS ("HI, I'M").
  intro: "Hi, I'm",
  // Shown on phones, where the full tagline would run to four lines.
  taglineShort: 'Building intelligent systems that work in production.',
  tagline:
    'Building intelligent systems that work in production — AI‑powered workflows, reliable APIs, and machine learning solutions for real-world problems.',
  available: true,
  availabilityLabel: 'Available for work',
  // TODO: optional — e.g. 'Pune, India'. Leave '' to hide.
  location: '',
}

export const links = {
  // Powers every "email" action on the site (forwards to Gmail via Cloudflare Email Routing).
  email: 'dheeraj@dheerajc.in',
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
    "I'm Dheeraj Chingunde, an AI & backend engineer. I like the part of the job where a fuzzy idea becomes a system that runs reliably — clear APIs, sensible data models, background jobs that don't fall over, and AI features that hold up outside a demo.",
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
 *  - `featured: true` projects are always visible; the rest appear under "Show more".
 *  - `problem` (optional): one line on what the project solves.
 *  - `approach` (optional): 2–3 engineering points (architecture, key decisions).
 *  - `results` (optional): ONLY verified outcomes, as measured in the project's own repo.
 *  - `preview`: the animated card, one type per kind of project — 'workflow' (pipeline),
 *    'fraud' (payment graph), 'credit' (risk dashboard), 'sage' (terminal), 'rag' (chat),
 *    'commerce' (shop), 'storage' (storage engine). Set `image` to a screenshot import to
 *    show that instead.
 *  - `github` / `live`: leave '' to hide that link.
 */
export const projects = [
  {
    id: 'fraudgraph',
    featured: true,
    title: 'FraudGraph',
    kind: 'AI · payments risk',
    description:
      'A pre-authorisation risk service for a payment switch: every payment is approved, stepped up (OTP / 3DS), sent to review or blocked — chosen by expected cost, in about a millisecond.',
    problem: 'A single fraud threshold either blocks good customers or lets fraud through, and fraud labels arrive late.',
    approach: [
      'Payment-graph features (new receiving accounts, bursts of new senders) on top of tabular signals, scored by LightGBM.',
      'Conformal prediction sets so the model says when it is unsure; a cost-based policy picks the action.',
      'FastAPI + Redis + PostgreSQL service built to learn from delayed labels and watch for drift; CI on Ubuntu and Windows.',
    ],
    results: [
      '0.12 ms p95 per decision (features + model, CPU); about 1 ms through the API.',
      'Graph features halve test cost versus the tabular baseline (133M → 66M).',
      'Full policy: 66M test cost versus 154M for a single global threshold (PaySim, simulated data).',
    ],
    tags: ['Python', 'LightGBM', 'FastAPI', 'Redis', 'PostgreSQL', 'Conformal prediction'],
    preview: 'fraud',
    image: null,
    github: 'https://github.com/Eyeroniq/fraudGraphAi',
    live: '',
  },
  {
    id: 'flowforge',
    featured: true,
    title: 'FlowForge AI',
    kind: 'AI automation platform',
    description:
      'A visual, self-hostable AI workflow builder: drag nodes onto a canvas, wire them together and run them live, on a schedule, or from an email, webhook or Telegram message.',
    problem: 'Automating everyday AI tasks usually means writing glue code for every model and every app.',
    approach: [
      '55 node types — LLMs, documents/OCR, audio, RAG, web, Gmail, Telegram, Discord, Notion, Airtable — on free-tier services by default.',
      'Next.js + React Flow editor; FastAPI API with Celery workers on Redis and PostgreSQL.',
      'Self-hosts with Docker Compose in three commands; JWT auth and encrypted credentials.',
    ],
    results: [],
    tags: ['FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Next.js', 'React Flow', 'Docker'],
    preview: 'workflow',
    image: null,
    github: 'https://github.com/Eyeroniq/AutoFlow-Ai',
    live: '',
  },
  {
    id: 'lsm-tree',
    featured: true,
    title: 'lsm-tree',
    kind: 'Systems · storage engine',
    description: 'A dependency-free C++17 log-structured merge-tree storage engine, built from first principles.',
    problem: "A write isn't complete when it reaches memory — it's complete when a restart can prove it survived.",
    approach: [
      'fsync-backed, checksummed write-ahead log that survives process crashes and simulated power loss.',
      'Checksummed SSTables of ~4 KB prefix-compressed blocks, Bloom filters and a sharded LRU block cache.',
      'Leveled compaction (each level 10× the one above), a C API and a Java server.',
    ],
    results: [
      '3.11M cached point reads per second on 4 threads (12-core machine).',
      'Write amplification cut from 77× to 33× at 300k keys versus full compaction.',
    ],
    tags: ['C++17', 'Storage engines', 'WAL', 'Bloom filters', 'Java'],
    preview: 'storage',
    image: null,
    github: 'https://github.com/Eyeroniq/lsm-tree',
    live: '',
  },
  {
    id: 'creditcast',
    featured: true,
    title: 'CreditCast',
    kind: 'ML · credit risk',
    description:
      'A bank-style credit-risk platform: a calibrated probability-of-default model (regulatory scorecard plus an ML challenger), LGD and EAD combined into Expected Loss — with a live what-if dashboard.',
    problem: 'A credit model has to be validated, explained and monitored, not just accurate.',
    approach: [
      'WoE scorecard and LightGBM challenger, calibrated, with out-of-time validation (Gini, KS, PSI).',
      'SHAP reason codes, fairness testing and drift monitoring; FastAPI service and Next.js dashboard.',
      'Bronze → Silver → Gold data pipeline with an optional PySpark engine. Built with a teammate.',
    ],
    results: ['120+ tests including an end-to-end lifecycle; CI enforces performance gates and an 80% coverage floor.'],
    tags: ['Python', 'LightGBM', 'SHAP', 'FastAPI', 'Next.js', 'PySpark'],
    preview: 'credit',
    image: null,
    github: 'https://github.com/sidnov6/CreditForge',
    live: 'https://huggingface.co/spaces/sidnov6/CreditForge',
  },
  {
    id: 'sagecli',
    title: 'SageCLI',
    kind: 'Developer tool · local LLM',
    description:
      'Offline plain-English to Bash for Linux: a local Phi-3 Mini model writes one command, a safety layer checks it, and nothing runs until you confirm.',
    problem: 'Natural-language shells are useful, but a wrong or malicious command can wreck a system.',
    approach: [
      'Runs on the CPU with no cloud APIs and no telemetry.',
      'Two-layer safety validator (regex rules + bashlex structural parsing): SAFE / WARN / BLOCK, plus a sandbox preview.',
    ],
    results: ['Adversarial benchmark: blocks 68/68 attack commands (60/68 with regex alone) and 0/41 safe ones.'],
    tags: ['Python', 'Phi-3 Mini', 'bashlex', 'Typer'],
    preview: 'sage',
    image: null,
    github: 'https://github.com/Eyeroniq/SageCLI',
    live: '',
  },
  {
    id: 'autochat',
    title: 'AutoChat',
    kind: 'AI · RAG assistant',
    description:
      'A self-hosted RAG chat assistant: upload documents, spreadsheets or a Google Sheet and get answers with citations.',
    problem: 'Teams want answers from their own files and databases without sending them to a closed tool.',
    approach: [
      'API compatible with the Anthropic Messages API, so existing clients and SDKs work unchanged; any OpenAI-compatible model can power it.',
      'Qdrant vector store and local embeddings; tools for SQL databases and code execution.',
      'Usage dashboard with p50/p95 latency, time to first token and token totals.',
    ],
    results: [],
    tags: ['Python', 'FastAPI', 'LlamaIndex', 'Qdrant', 'Ollama'],
    preview: 'rag',
    image: null,
    github: 'https://github.com/Eyeroniq/Autochat',
    live: '',
  },
  {
    id: 'supersaint',
    title: 'Super Saint',
    kind: 'Full-stack e-commerce',
    description: 'A full-stack e-commerce store for fitted essentials, with an admin dashboard and built-in analytics.',
    problem: 'A small brand needs a store, payments and the numbers to run it in one place.',
    approach: [
      'TypeScript end to end: React + Redux Toolkit (RTK Query), Node.js/Express, MongoDB; JWT auth with bcrypt.',
      'Razorpay (UPI, cards, netbanking, wallets) and Cash on Delivery.',
      "Analytics: funnel, cohorts, RFM and A/B statistics (two-proportion z-test, Welch's t-test).",
    ],
    results: ['Covering indexes cut 30-day analytics queries from 1.4–3.1 s to 14–407 ms; cached responses in about 2 ms.'],
    tags: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Razorpay'],
    preview: 'commerce',
    image: null,
    github: 'https://github.com/Eyeroniq/supersaint',
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
