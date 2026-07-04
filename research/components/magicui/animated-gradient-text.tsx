// Source: https://magicui.design/docs/components/animated-gradient-text
// Install: pnpm dlx shadcn@latest add @magicui/animated-gradient-text
// Dependencies: none beyond React + Tailwind + @/lib/utils (cn helper)
// Requires the Tailwind theme animation + keyframes below (or port to plain
// CSS since Tailwind isn't installed in this project yet).

import { type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<"div"> {
  speed?: number
  colorFrom?: string
  colorTo?: string
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          "--bg-size": `${speed * 300}%`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        `animate-gradient inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/*
Tailwind v4 registry metadata (cssVars/css) shipped with this component:

theme:
  --animate-gradient: gradient 8s linear infinite;

@keyframes gradient {
  to { background-position: var(--bg-size, 300%) 0; }
}

Galaxy-theme note: cheap, dependency-free animated gradient text (good for a
"nebula-colored" hero headline or accent words like "galaxy" or service
names). Colors default to orange/purple but easily retuned to a
purple/blue/cyan "nebula" palette.
*/
