# Dheeraj — Portfolio

A dark, single-page developer portfolio built with React + Vite, Motion for React, and Lucide icons. No backend.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Personalise

Almost everything lives in **`src/data/portfolio.js`**:

| What | Where |
| --- | --- |
| Name, role, hero copy, availability | `profile` |
| Email, GitHub, LinkedIn, CV | `links` (an empty URL simply hides that link — no dead or "coming soon" links) |
| About copy + principles | `about` |
| Tech stack groups | `stack` |
| Projects as short case studies (`problem`, `approach`, verified-only `results`, tags, GitHub / live URLs, optional screenshot) | `projects` |
| Experience timeline | `experience` (currently **placeholders**; replace them). Placeholder entries only show in `npm run dev`; the production build hides the section and its nav link until at least one real entry exists. |
| Technology ticker under the hero | `ticker` (keys map to official `simple-icons` marks in `src/components/TechTicker.jsx`) |

### Assets

- **CV:** put your PDF at `public/cv.pdf`, then set `links.cv = '/cv.pdf'`. Until then the CV action is an honest "Request CV" email; once set it becomes "Download CV" (hero, mobile menu).
- **Social preview:** `public/og-image.jpg` (1200×630) and `public/apple-touch-icon.png` are generated from the portrait/favicon. After deploying, change `og:image` / `twitter:image` in `index.html` to absolute URLs (e.g. `https://your-domain.com/og-image.jpg`) and add `og:url` — most social sites ignore relative image URLs.
- **Project screenshots (optional):** add images under `src/assets/projects/`, import them at the top of `portfolio.js`, and set `image` on the project. Until you do, each card shows an illustrated preview.
- **Portrait:** the hero uses `src/assets/portrait-*.webp` (your photo) and `src/assets/reveal-*.webp` (the illustrated version the lens reveals). They're built from `/assets/white_shirt_forground.png` and `/assets/white_shirt_background.png`, resized to 960px and 1672px WebP. The portrait is in full colour: colour comes from the original asset, and brightness from the tone-treated version described below. The illustrated photo is automatically aligned to the white-wall photo (scale + offset found by feature matching) so the hover lens lines up. If you swap the photo, keep the two images the same size and framing so the lens lines up.
  - The portrait files have a light tone treatment baked in: a mild global lift (gamma 0.94) plus a face-local gamma lift and gentle clarity, which brighten the skin and eyes while keeping true blacks (no grey veil). The originals in `/assets` are untouched. Overall exposure is `--portrait-grade` in `src/sections/Hero.css`.

## Intro loader

The loading screen lives inline in **`index.html`** (markup, styles and script), so it paints instantly on a hosted site before the app bundle downloads.

- **Retime it:** edit the constants at the top of the loader `<script>` (`HELLO_FADE`, `LETTER_STAGGER`, `LINE_DURATION`, `EXIT_DURATION`, …).
- **Shows once per tab session** (`sessionStorage` key `dheeraj:intro-seen`). To see it again while testing, open a new tab or run `sessionStorage.clear()` in the console.
- **Skip** button (or Escape) slides it away early; with *reduced motion* the name appears instantly and the loader disappears without animating.
- The hero's entrance animation waits for the loader (`src/hooks/useIntroReady.js`), so it plays as the page is revealed.

## Structure

```
src/
  data/portfolio.js      ← all editable content
  sections/              ← Hero, About, Stack, Projects, Experience, Contact, Footer
  components/            ← Nav, Button, RevealLens, FloatingOrbs, ProjectCard, …
  hooks/                 ← media query, scroll state, active section, text scramble
  styles/global.css      ← design tokens (colours, fonts, spacing)
```

Motion respects `prefers-reduced-motion`. Pointer effects (lens, parallax) only run on mouse/trackpad devices. On touch screens, tapping the portrait opens the lens briefly.

## Deploy

### Docker

```bash
docker build -t portfolio .
docker run -p 8080:8080 portfolio
```

Or `docker compose up --build`. The image is a two-stage build (Node 22 → non-root nginx) serving the static site on port **8080**, with gzip, long-term caching for hashed assets, security headers and a `/healthz` endpoint.

To serve from a sub-path, pass `--build-arg BASE_PATH=/my-path/`.

### CI/CD (GitHub Actions)

`.github/workflows/ci-cd.yml` runs on every push and pull request to `main`:

1. **Build** — `npm ci` + `npm run build`.
2. **Docker image** — built on every run; on `main` it's pushed to `ghcr.io/<owner>/portfolio` (`latest` + short-SHA tags). Pull requests also smoke-test the container.
3. **Deploy** — on `main`, the static build is published to **GitHub Pages** at `https://<owner>.github.io/portfolio/`.

GitHub Pages must use **GitHub Actions** as its source (Settings → Pages).
