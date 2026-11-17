/**
 * Project case-study pages (one per entry). Each page is pre-rendered to real HTML at build
 * time — see scripts/prerender.mjs — and lives at /projects/<slug>/.
 *
 *  - `youtubeId`: the demo video's YouTube id (the part after `v=` or `youtu.be/`).
 *    Leave '' to show the project's animated card in the video slot instead.
 *  - Everything here comes from the project's own README — no invented numbers.
 */
export const projectPages = {
  flowforge: {
    slug: 'flowforge',
    projectId: 'flowforge',
    title: 'FlowForge AI',
    kind: 'AI automation platform',
    // TODO: paste the YouTube id of the FlowForge demo (demo/flowforge-demo.mp4) here.
    youtubeId: '',
    seoTitle: 'FlowForge AI — visual AI workflow builder | Dheeraj Chingunde',
    seoDescription:
      'FlowForge AI by Dheeraj Chingunde: a visual, self-hostable AI workflow automation builder with 55 node types, live runs on Celery workers, and triggers from schedules, email, webhooks and Telegram.',
    lead: 'A visual, self-hostable AI workflow automation builder: drag nodes onto a canvas, wire them together, and run the result live, on a schedule, from an email, from a webhook, or from a Telegram message.',
    facts: [
      { label: 'Node types', value: '55' },
      { label: 'Templates', value: '11' },
      { label: 'Self-host', value: '3 commands' },
      { label: 'License', value: 'MIT' },
    ],
    overview: [
      'Automating everyday AI work usually means writing glue code for every model and every app. FlowForge turns that into a canvas: pick nodes for LLMs, documents, audio, knowledge bases and integrations, connect them, and run the pipeline.',
      'Runs are queued on Redis and executed by Celery workers, and the editor colours each node live over a WebSocket as the run progresses. Everything runs on free-tier services by default, and the whole stack self-hosts with Docker Compose.',
    ],
    features: [
      {
        title: 'Building and running',
        items: [
          "Visual editor: React Flow canvas, searchable node library, config forms generated from each node's JSON Schema, autosave with undo/redo and live validation.",
          'Live runs on Celery workers, with node colours following a WebSocket stream; runs can be stopped, and crashed workers are detected.',
          'Generate with AI: describe a pipeline in words and an LLM drafts it, retried until it passes the validator.',
          'Run Replay, a Ctrl+K command palette, 11 one-click templates and per-node execution history.',
        ],
      },
      {
        title: 'Ways to start a run',
        items: [
          'Triggers: cron schedules in any time zone, new Gmail messages and webhooks, with a runs-per-hour cap.',
          'Deployments: publish a pipeline as an API endpoint with its own key (shown once, stored hashed).',
          'Telegram Command Center: message your bot; an LLM routes the request, fills the inputs and asks for one-tap confirmation before side effects.',
        ],
      },
      {
        title: '55 nodes',
        items: [
          'AI: Gemini, Groq, OpenRouter, Mistral, Cerebras, Ollama, OpenAI, Anthropic, structured output and vision.',
          'Documents and audio: PDF extract, OCR (Tesseract), summarise, entity extraction, speech to text (Whisper).',
          'Knowledge bases on PostgreSQL + pgvector, with answers that cite their sources.',
          'Integrations: Gmail, Telegram, Discord, Notion, Airtable, RSS, web pages, web search and SSRF-guarded HTTP.',
          'Privacy: secret scanner and PII redact / restore, plus a privacy guard on every outbound and LLM node.',
        ],
      },
      {
        title: 'Platform and operations',
        items: [
          'JWT auth with a signed session cookie and a server-side route guard.',
          'Redis sliding-window rate limiter (atomic Lua) shared across processes.',
          'Per-user credentials encrypted at rest with Fernet.',
          'Production stack: Caddy with automatic HTTPS, healthchecks and daily verified backups.',
        ],
      },
    ],
    architecture: {
      text: "A run is one Celery task chain: the API validates the graph, records the execution and queues it on the first node's queue. Each node's state is written to PostgreSQL and published on Redis, and the WebSocket relays those events to the editor. Separate worker queues for LLM, OCR and audio work let each kind of capacity scale on its own.",
      flow: ['Next.js + React Flow', 'FastAPI', 'Redis queue', 'Celery workers', 'PostgreSQL + pgvector'],
    },
    stack: [
      { layer: 'Frontend', tech: 'Next.js 16, TypeScript, Tailwind CSS v4, React Flow 12, Zustand, TanStack Query' },
      { layer: 'Backend', tech: 'Python 3.13, FastAPI, SQLAlchemy 2.0 (async), Alembic, Pydantic v2' },
      { layer: 'Async', tech: 'Celery 5.6 on Redis, Redis pub/sub, WebSockets, Flower' },
      { layer: 'Data', tech: 'PostgreSQL 16 with pgvector (HNSW), Redis 7' },
      { layer: 'Documents', tech: 'PyMuPDF, Tesseract 5, Pillow' },
      { layer: 'Security', tech: 'JWT, bcrypt, Fernet-encrypted credentials, SSRF guard' },
      { layer: 'Tests', tech: 'pytest (real Postgres), Vitest, Playwright, Locust' },
      { layer: 'Infra', tech: 'Docker Compose (dev and production), Caddy, GitHub Actions CI' },
    ],
    results: [
      'Load test: 0 failures across 6,898 requests with 50 concurrent users (57.8 requests per second).',
      'Every feature is covered by tests: pytest for the API and engine, Vitest for the web app, Playwright end to end.',
    ],
    run: {
      needs: 'Docker with Compose v2.24 or newer. Nothing else.',
      steps: [
        {
          title: 'Get the code',
          code: 'git clone https://github.com/Eyeroniq/AutoFlow-Ai.git\ncd AutoFlow-Ai',
        },
        {
          title: 'Create your settings file',
          code: 'cp .env.example .env',
          note: 'On Windows PowerShell: Copy-Item .env.example .env',
        },
        {
          title: 'Generate the two required secrets',
          code: 'sh scripts/gen-secrets.sh',
          note: 'Paste the JWT_SECRET and ENCRYPTION_KEY lines it prints into .env, and add at least one AI key (for example GEMINI_API_KEY, which is free).',
        },
        {
          title: 'Start everything',
          code: 'docker compose up --build',
          note: 'The first run builds the images.',
        },
        {
          title: 'Create the demo user',
          code: 'docker compose exec api python -m app.db.seed',
          note: 'Run this in a second terminal.',
        },
        {
          title: 'Open the app',
          code: 'http://localhost:3000',
          note: 'Log in with demo@flowforge.ai / demo1234 (or register), open "Demo: Summarize and email", press Validate, then Run.',
        },
      ],
    },
    links: [
      { label: 'Source code on GitHub', href: 'https://github.com/Eyeroniq/AutoFlow-Ai' },
      { label: 'Hosting guide', href: 'https://github.com/Eyeroniq/AutoFlow-Ai/blob/main/docs/HOSTING.md' },
    ],
  },
}

/** Page URL for a project card, or null when the project has no page yet. */
export const projectPageHref = (projectId) => {
  const page = Object.values(projectPages).find((p) => p.projectId === projectId)
  return page ? `${import.meta.env.BASE_URL}projects/${page.slug}/` : null
}
