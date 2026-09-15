import { defineConfig } from 'vite'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SITE = 'https://dropdev.co'

/*
 * Static routes that must answer a direct, server-side request with HTTP 200.
 *
 * GitHub Pages has no rewrite rules: an unknown path is served as 404.html
 * with a real 404 status. public/404.html bounces the browser back to "/" so a
 * human recovers, but anything that reads the status code instead of running
 * JavaScript — Meta's app-review validator, link unfurlers, crawlers — just
 * sees the 404. Meta rejected /privacy for exactly this reason.
 *
 * The fix is to emit a genuine file at each path, so Pages has something to
 * serve with a 200. Each is a copy of the SPA shell with its own title and
 * social tags; React Router reads location.pathname on boot and renders the
 * matching route, same as it always did.
 */
const ROUTES = [
  {
    path: 'about',
    title: 'About DropDev | We Build What Others Only Imagine',
    description:
      'DropDev builds AI for specific industries. We read your documents, answer questions from your own data, and run it all on hardware you control.',
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | DropDev',
    description:
      'How DropDev LLC collects, uses, shares, and deletes your personal information, and how to exercise your privacy rights.',
  },
  {
    path: 'terms',
    title: 'Terms and Conditions | DropDev',
    description:
      'The terms and conditions governing your use of dropdev.co, operated by DROPDEV LLC.',
  },
  {
    path: 'data-deletion',
    title: 'Data Deletion | DropDev',
    description:
      'How to request deletion of personal information associated with your DropDev account or services.',
  },
]

// Swap the first attribute matching `pattern` to `value`, leaving the rest of
// the tag untouched. Returns the html unchanged if the tag is missing.
function setTag(html, pattern, value) {
  return html.replace(pattern, (match) =>
    match.replace(/content="[^"]*"/, `content="${value}"`)
  )
}

function staticRoutes() {
  return {
    name: 'dropdev-static-routes',
    apply: 'build',
    closeBundle() {
      const outDir = fileURLToPath(new URL('./dist', import.meta.url))
      const shell = readFileSync(resolve(outDir, 'index.html'), 'utf8')

      for (const route of ROUTES) {
        const url = `${SITE}/${route.path}`
        let html = shell
          .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
          .replace(
            /<link rel="canonical" href="[^"]*" \/>/,
            `<link rel="canonical" href="${url}" />`
          )

        html = setTag(html, /<meta name="description"[\s\S]*?\/>/, route.description)
        html = setTag(html, /<meta property="og:title"[\s\S]*?\/>/, route.title)
        html = setTag(html, /<meta property="og:description"[\s\S]*?\/>/, route.description)
        html = setTag(html, /<meta property="og:url"[\s\S]*?\/>/, url)
        html = setTag(html, /<meta name="twitter:title"[\s\S]*?\/>/, route.title)
        html = setTag(html, /<meta name="twitter:description"[\s\S]*?\/>/, route.description)

        // Both spellings: "/privacy" resolves to privacy.html with no redirect,
        // and "/privacy/" resolves to privacy/index.html. Either way, a 200.
        for (const target of [`${route.path}.html`, `${route.path}/index.html`]) {
          const file = resolve(outDir, target)
          mkdirSync(dirname(file), { recursive: true })
          writeFileSync(file, html)
        }
      }

      console.log(
        `\nstatic routes: emitted ${ROUTES.length * 2} files for ${ROUTES
          .map((r) => `/${r.path}`)
          .join(', ')}`
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticRoutes()],
  base: '/',
})
