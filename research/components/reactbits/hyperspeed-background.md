# Hyperspeed (Background)

Source: https://reactbits.dev/backgrounds/hyperspeed
GitHub (full source, ~650 lines):
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Backgrounds/Hyperspeed/Hyperspeed.jsx
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Backgrounds/Hyperspeed/Hyperspeed.css
- https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Backgrounds/Hyperspeed/HyperSpeedPresets.js

## Dependencies
```
npm install three postprocessing
```

## What it is
A full three.js scene simulating a "hyperspeed" highway: a perspective camera
flying down an endless road, instanced car light-streaks (red/blue trail
lights), animated side light-sticks, and a Bloom + SMAA post-processing
pipeline (via the `postprocessing` package) for a glowing neon-trail look.
Six built-in presets (`one`...`six` in HyperSpeedPresets.js) vary road width,
distortion curve (`turbulentDistortion`, `mountainDistortion`, `xyDistortion`,
`LongRaceDistortion`, `deepDistortion`), car colors, and speed-up behavior.
Interaction: mousedown/touchstart triggers a camera FOV widen + speed-up
("hyperspeed jump"), mouseup returns to cruising speed.

## Why relevant to the galaxy theme
Not a literal starfield, but it is the single component across all
researched sites that most literally embodies "the camera feels like it's
zooming/traveling" — the core scrollytelling ask in the brief. The
warp-speed light-streak aesthetic (Tron/Star Wars hyperspace jump) could be
retargeted (recolor light streaks, replace "road" with a starfield-tunnel
distortion preset) to represent transitioning between planets/sections on
scroll, e.g. triggering the "speed up" state on scroll-into-section rather
than mousedown.

## Complexity / notes
- Heaviest component captured: full custom three.js scene graph (Road,
  CarLights, LightsSticks classes), instanced geometry, custom GLSL chunks
  patched into three's built-in fog shader via `onBeforeCompile`.
- Requires a real `<canvas>` WebGL2/1 context; not trivially SSR-safe (not an
  issue for this static-hosted SPA).
- Reusing this well would need non-trivial adaptation: swapping the
  "highway" pieces (Road, CarLights) for a star-tunnel/particle-tunnel would
  mean forking the distortion/geometry code, not just prop tweaking.
- Given the effort/benefit tradeoff, treat this as a "stretch" reference —
  Galaxy + Particles + Orb are lower-effort, more literal matches for the
  starfield/planet asks. Hyperspeed is best reserved for a single dramatic
  scroll-triggered transition moment (e.g. between the hero and the first
  planet section) rather than a persistent background.
- Full JSX/CSS/preset source is at the GitHub raw links above (not
  duplicated here in full due to size — this file is a summary/pointer).
