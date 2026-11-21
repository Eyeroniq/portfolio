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
    youtubeId: 'qRJpevo_WsM',
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

  creditcast: {
    slug: 'creditcast',
    projectId: 'creditcast',
    title: 'CreditCast',
    kind: 'ML · credit risk platform',
    youtubeId: 'upZVHrQIWmQ',
    seoTitle: 'CreditCast — credit-risk modelling and validation platform | Dheeraj Chingunde',
    seoDescription:
      'CreditCast by Dheeraj Chingunde: a bank-style credit-risk platform combining a calibrated PD model, LGD and EAD into Expected Loss, with validation, SHAP reason codes, fairness testing, stress tests and drift monitoring.',
    lead: 'A bank-style credit-risk platform for mortgages: it predicts the chance a borrower defaults, how much would be lost, decides approve or decline with reasons, and checks itself for accuracy, drift and fairness.',
    facts: [
      { label: 'Expected loss', value: 'PD × LGD × EAD' },
      { label: 'Dashboard', value: '6 screens' },
      { label: 'Tests', value: '190+' },
      { label: 'Run it', value: 'Docker' },
    ],
    overview: [
      'A credit model has to be validated, explained and monitored, not just accurate. CreditCast builds the whole lifecycle around the model: a calibrated probability-of-default model (a regulatory WoE scorecard and a LightGBM challenger), loss-given-default and exposure-at-default, combined into Expected Loss, following the Basel / IRB methodology.',
      "It runs on a seeded synthetic dataset in Freddie Mac's Single-Family loan and monthly-performance format, so the whole stack runs offline and reproducibly, and the real dataset can drop in later. Built with a teammate.",
    ],
    features: [
      {
        title: 'Scoring an applicant',
        items: [
          'Live decisions: default risk, expected loss, capital and the reasons behind them, updating as you move a slider.',
          'What-if panel: finds the smallest single change that turns a declined applicant into an approval.',
          'Adverse-action reason codes from SHAP, a downloadable PDF decision letter, and side-by-side applicant comparison.',
        ],
      },
      {
        title: 'The portfolio',
        items: [
          'The whole test book: expected loss, Basel capital, lifetime default risk and IFRS 9 staging; chart clicks filter the loan table.',
          'Stress tests: adverse and severely adverse recession scenarios, plus an unemployment slider.',
        ],
      },
      {
        title: 'Validation and governance',
        items: [
          'Out-of-time validation: Gini, KS, gains, calibration (Hosmer-Lemeshow), PSI / CSI and a benchmark.',
          'Fairness testing by group, the trade-off of moving the approval limit, and a search for a fairer model; race is never a model input.',
          'Drift monitoring, a model card, and a reject-inference study.',
        ],
      },
      {
        title: 'Engineering',
        items: [
          'Leakage-safe design: features use only what was known at the observation date, the target looks 12 months ahead, and the split is out-of-time, never random.',
          'Bronze → Silver → Gold pipeline on DuckDB, with an optional PySpark engine that writes the same Gold files, checked value for value.',
          'One Docker image: FastAPI serves the API and the pre-built Next.js dashboard from one origin.',
        ],
      },
    ],
    architecture: {
      text: 'The pipeline turns raw loan panels into a leakage-safe feature matrix, splits it by vintage, and trains the PD scorecard and challenger, then LGD and EAD. Every model passes a validation suite and governance checks before it is served by FastAPI to the Risk Cockpit, with drift monitoring on top. CI fails any model that misses its performance gates.',
      flow: ['Bronze → Silver → Gold', 'Out-of-time split', 'PD · LGD · EAD', 'Validation + governance', 'FastAPI + Risk Cockpit'],
    },
    stack: [
      { layer: 'Data', tech: 'pandas, DuckDB, Polars, PyArrow (parquet), optional PySpark' },
      { layer: 'Models', tech: 'scikit-learn, LightGBM, optbinning (WoE / IV scorecard), statsmodels, SciPy' },
      { layer: 'Governance', tech: 'SHAP, Fairlearn, MLflow' },
      { layer: 'Serving', tech: 'FastAPI, Uvicorn, Pydantic v2, SlowAPI rate limits' },
      { layer: 'Dashboard', tech: 'Next.js, React, Recharts' },
      { layer: 'Quality', tech: 'pytest (80% coverage floor), Vitest, Playwright, ruff, mypy' },
      { layer: 'Infra', tech: 'Docker, Docker Compose, Caddy, GitHub Actions CI' },
    ],
    results: [
      '190+ automated tests, and quality gates (accuracy, calibration, drift, stress, lifetime risk) that block any model that fails them.',
      'Stress scenarios on the synthetic book: losses go from 1.3% to 3.9% of the book, and approvals fall from 82% to 27%, under a severe recession.',
    ],
    run: {
      needs: 'Docker. Nothing else.',
      steps: [
        {
          title: 'Get the code',
          code: 'git clone https://github.com/Eyeroniq/CreditCast.git\ncd CreditCast',
        },
        {
          title: 'Build the image',
          code: 'docker build -t creditcast .',
          note: 'The models are trained and baked in at build time, so this takes a few minutes.',
        },
        {
          title: 'Start it',
          code: 'docker run -p 8000:8000 creditcast',
        },
        {
          title: 'Open the app',
          code: 'http://localhost:8000',
          note: 'Start on Score: pick "Prime borrower", then "High-risk borrower", and move the credit-score slider.',
        },
        {
          title: 'Or, on Windows without Docker',
          code: 'powershell -ExecutionPolicy Bypass -File scripts\\demo.ps1',
          note: 'Needs Python 3.11+ and Node 24. The first run sets everything up and trains the models (about 5 minutes).',
        },
      ],
    },
    links: [
      { label: 'Source code on GitHub', href: 'https://github.com/Eyeroniq/CreditCast' },
      { label: 'Demo walkthrough', href: 'https://github.com/Eyeroniq/CreditCast/blob/main/DEMO.md' },
    ],
  },

  supersaint: {
    slug: 'supersaint',
    projectId: 'supersaint',
    title: 'Super Saint',
    kind: 'Full-stack e-commerce + analytics',
    videos: [
      { id: '7D6UL-SbP0s', label: 'The store', text: 'find a product, check out with a coupon, and the admin ships the order.' },
      { id: '7YOASGlp1jY', label: 'The analytics', text: 'funnel, cohorts, RFM, A/B tests and exports on a year of simulated data.' },
    ],
    seoTitle: 'Super Saint — full-stack MERN e-commerce store with analytics | Dheeraj Chingunde',
    seoDescription:
      'Super Saint by Dheeraj Chingunde: a full-stack TypeScript MERN e-commerce store with Razorpay payments, an admin dashboard, and an analytics layer with a DuckDB warehouse, SQL, cohorts, RFM and A/B statistics.',
    lead: 'A full-stack e-commerce store for fitted essentials, with Razorpay payments, an admin dashboard, and a built-in analytics layer: event tracking, a SQL warehouse, cohorts, RFM and A/B testing.',
    facts: [
      { label: 'Stack', value: 'TypeScript MERN' },
      { label: 'Payments', value: 'Razorpay + COD' },
      { label: 'SQL queries', value: '14' },
      { label: 'Analytics pages', value: '7' },
    ],
    overview: [
      'A small brand needs a store, payments and the numbers to run it, in one place. Super Saint is the store and the admin side together: shoppers browse, search, filter and check out; the admin manages products, orders, customers and coupons.',
      'On top sits an analytics layer. The store tracks events, a warehouse turns them into a star schema, and the admin dashboard answers business questions. The analytics demo runs on a year of simulated store activity in a separate database, so the live store is never touched.',
    ],
    features: [
      {
        title: 'Storefront',
        items: [
          'Announcement bar, sticky header, slide-in menu, live search and a cart drawer with a free-shipping progress bar.',
          'Collection page with filter and sort; product pages with sizes, colour variants, size chart and accordions.',
          'Email / password accounts, order history, and order tracking with a status timeline.',
        ],
      },
      {
        title: 'Payments and admin',
        items: [
          'Razorpay checkout (UPI, cards, netbanking, wallets) and Cash on Delivery.',
          "Order totals are always calculated on the server, and payments are checked against Razorpay's signature before an order is created.",
          'Admin dashboard for products, orders, customers and coupons; admin routes need a JWT with the admin role.',
        ],
      },
      {
        title: 'Analytics',
        items: [
          'Event tracking for product views, search, cart, checkout, payments, orders and coupons, batched with sendBeacon.',
          'Dashboard pages: Overview (KPIs and funnel), Customers (cohorts, RFM), Products (ABC, stock cover), Payments and ops, Search and coupons, A/B tests, Exports.',
          "A/B statistics: two-proportion z-test, Welch's t-test, 95% confidence intervals, sample-ratio mismatch check and a sample-size calculator.",
        ],
      },
      {
        title: 'Data work',
        items: [
          'Deterministic simulator (fixed seed): weekday patterns, a festive sale spike, seasonality, COD vs prepaid, cancellations, RTO and returns.',
          'DuckDB star schema (no personal data) and 14 SQL queries using CTEs, window functions, GROUPING SETS and quantiles.',
          'A findings report with 7 insights, each with its query, numbers, chart and recommendation, plus a Power BI / Excel guide.',
        ],
      },
    ],
    architecture: {
      text: 'The React storefront talks to an Express API backed by MongoDB. Store events flow into MongoDB too; a script exports them into a DuckDB star schema for SQL analysis, while the admin analytics API answers dashboard questions with MongoDB aggregations, covering indexes and a 5-minute cache.',
      flow: ['React + RTK Query', 'Express API', 'MongoDB', 'DuckDB warehouse', 'Analytics dashboard'],
    },
    stack: [
      { layer: 'Frontend', tech: 'TypeScript, React, Redux Toolkit (RTK Query), Sass, Chart.js, Vite' },
      { layer: 'Backend', tech: 'TypeScript, Node.js, Express, MongoDB (Mongoose)' },
      { layer: 'Auth', tech: 'JWT, bcrypt-hashed passwords, admin role checks' },
      { layer: 'Payments', tech: 'Razorpay (UPI, cards, netbanking, wallets), Cash on Delivery' },
      { layer: 'Analytics', tech: 'DuckDB star schema, SQL, MongoDB aggregations, Power BI / Excel exports' },
      { layer: 'Tests', tech: 'Vitest: statistics and metrics, plus a check that SQL results match the live API' },
    ],
    results: [
      'Covering indexes cut the 30-day analytics queries from 1.4–3.1 s to 14–407 ms; cached responses return in about 2 ms.',
      'Every warehouse query runs in under 100 ms in DuckDB.',
      'Simulated year of data: 463,465 sessions, 1,442,963 events, 16,655 orders and 13,809 customers, reproducible with one command.',
    ],
    run: {
      needs: 'Node.js and MongoDB running on mongodb://127.0.0.1:27017.',
      steps: [
        {
          title: 'Get the code',
          code: 'git clone https://github.com/Eyeroniq/supersaint.git\ncd supersaint',
        },
        {
          title: 'Start the backend',
          code: 'cd Backend\ncp .env.example .env\nnpm install\nnpm run build\nnpm run seed\nnpm start',
          note: 'Set JWT_SECRET and ADMIN_PASSWORD in .env first. The seed adds a sample catalogue and the admin account; the API runs on http://localhost:4000.',
        },
        {
          title: 'Start the frontend (second terminal)',
          code: 'cd Front-End\ncp .env.example .env\nnpm install\nnpm run dev',
        },
        {
          title: 'Open the store',
          code: 'http://localhost:5173',
          note: 'Log in as the admin from Backend/.env and open Menu → Admin Dashboard.',
        },
        {
          title: 'Optional: the analytics demo',
          code: 'cd Backend\nnpm run analytics\nnpm run dev:sim',
          note: 'Simulates 12 months of data (about 2 minutes), builds the warehouse, runs the SQL and tests, then serves the dashboard on the simulated data. Open Admin → Analytics.',
        },
      ],
    },
    links: [
      { label: 'Source code on GitHub', href: 'https://github.com/Eyeroniq/supersaint' },
      { label: 'Analysis report', href: 'https://github.com/Eyeroniq/supersaint/blob/main/docs/analysis_report.md' },
    ],
  },
}

/** Page URL for a project card, or null when the project has no page yet. */
export const projectPageHref = (projectId) => {
  const page = Object.values(projectPages).find((p) => p.projectId === projectId)
  return page ? `${import.meta.env.BASE_URL}projects/${page.slug}/` : null
}
