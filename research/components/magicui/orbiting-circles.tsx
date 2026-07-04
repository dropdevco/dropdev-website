// Source: https://magicui.design/docs/components/orbiting-circles
// Install: pnpm dlx shadcn@latest add @magicui/orbiting-circles
// Dependencies: none beyond React + Tailwind + @/lib/utils (cn helper)
// Requires the Tailwind theme animation + keyframes at the bottom of this
// file to be registered (or ported to plain CSS since Tailwind isn't
// installed in this project yet).

import React from "react"

import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index
        return (
          <div
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `animate-orbit absolute flex size-(--icon-size) transform-gpu items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}

/*
Tailwind v4 registry metadata (cssVars/css) shipped with this component:

theme:
  --animate-orbit: orbit calc(var(--duration)*1s) linear infinite;

@keyframes orbit {
  0% {
    transform: rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg));
  }
  100% {
    transform: rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg));
  }
}

Usage:
<div className="relative h-[500px] w-full overflow-hidden">
  <OrbitingCircles iconSize={40}>
    <Icons.whatsapp />
    <Icons.notion />
  </OrbitingCircles>
  <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
    <Icons.openai />
    <Icons.googleDrive />
  </OrbitingCircles>
</div>

Galaxy-theme note: icons/children can be swapped for small planet/moon SVGs
orbiting a central "sun" planet — this maps almost 1:1 onto a solar-system
style service diagram.
*/
