# Drop Dev Website Redesign — Research Brief

## Goal
Revamp dropdev.co into a heavily animated, scroll-driven "galaxy" experience. Drop Dev is a
software development company (web/app dev); the site's purpose is to **showcase capability**,
not to funnel visitors through a consultation form.

## Core creative concept
- Background: an animated galaxy / solar system, built with **SVG or discrete animated
  icon/vector assets** (NOT pure CSS gradients/shapes) so it can be art-directed and swapped.
- The whole page is a **scrollytelling** experience: as the user scrolls, the camera feels like
  it's zooming/traveling through the galaxy from one planet to the next.
- Each **planet = one focus area / service vertical** of Drop Dev (e.g. web dev, app dev,
  custom software, etc. — not real astronomical planets). Arriving at a planet while scrolling
  reveals content about that capability.
- Heavy use of scroll-linked animation, parallax, reveal-on-scroll, smooth scroll, possibly
  scroll-jacking/pinned sections.

## Current tech stack (as of 2026-07-04, branch `galaxy-redesign-research`)
- React 19 + Vite + react-router-dom v7
- **No Tailwind CSS, no Framer Motion, no GSAP, no Three.js installed yet** — plain CSS files
  per component currently. Any of these can be added if a component needs them; note
  dependencies clearly since they'll factor into the eventual build prompt.
- Site is deployed via gh-pages (static export), so anything researched must work in a
  static-hosted SPA (no server-side requirements).

## What this research phase is for
We are NOT modifying the live site yet. We're building a reference library: browsing five
component/design-inspiration sites, identifying pieces that fit the galaxy/scrollytelling
concept, and saving code + notes locally so we can later write a one-shot build prompt for
Fable (an AI site builder).

## Folder structure
- `research/components/<site-name>/` — one folder per source site
  - `INVENTORY.md` — table of every relevant component found (name, source URL, why relevant,
    dependencies, complexity)
  - one file (or subfolder) per saved component, containing the actual copy-pasteable code
- `research/assets/` — any downloaded visual assets (icons, SVGs) worth keeping as reference
- `research/SYNTHESIS.md` — cross-site synthesis + shortlist, written after all sites are
  researched (feeds the Fable prompt)

## Sites being researched (in parallel, one agent per site)
1. https://motion-primitives.com/
2. https://magicui.design/
3. https://kokonutui.com/
4. https://reactbits.dev/
5. https://styles.refero.design/
