// Source: https://magicui.design/docs/components/scroll-progress
// Install: pnpm dlx shadcn@latest add @magicui/scroll-progress
// Dependencies: motion
//   npm install motion

"use client"

import { motion, useScroll, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}

/*
Galaxy-theme note: this is a fixed top-of-page progress bar tied to global
scroll (`useScroll()` with no target = whole document). For the "camera
travels through the galaxy" concept, this same `useScroll` + `scrollYProgress`
pattern (optionally scoped to a `target` container ref) is the core primitive
to drive: (1) a mini-map/progress indicator of how far through the galaxy the
user has traveled, and (2) camera zoom/pan transforms elsewhere on the page by
mapping scrollYProgress into `useTransform` ranges per "planet" section.
*/
