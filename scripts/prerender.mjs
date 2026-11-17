// Writes each project page's HTML at build time, so search engines (and visitors on slow
// connections) get the full page before any JavaScript runs.
// Run after `vite build` and the SSR build of src/project-ssr.jsx (see package.json).
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = process.cwd()
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'project-ssr.js')).href)

for (const slug of ssr.slugs) {
  const file = path.join(root, 'dist', 'projects', slug, 'index.html')
  const html = await readFile(file, 'utf8')
  if (!html.includes('<!--app-html-->')) throw new Error(`No <!--app-html--> marker in ${file}`)
  await writeFile(file, html.replace('<!--app-html-->', ssr.render(slug)))
  console.log(`prerendered /projects/${slug}/`)
}

await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
