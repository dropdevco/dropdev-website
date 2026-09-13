/*
 * Deep space — the departure point. Full viewport, galaxy slowly rotating
 * behind (the fixed backdrop), headline staggering in word by word, drifting
 * glow shapes reading as distant planets (adapted from kokonutui shape-hero),
 * and a scroll cue. Fades and recedes as the flight begins.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

const HEADLINE = 'AI systems, built to ship.';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const word = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] },
    },
};

export default function Hero() {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

    return (
        <section ref={ref} className="relative h-[135vh]">
            <motion.div
                style={reduced ? undefined : { opacity, scale }}
                className="sticky top-0 flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center"
            >
                {/* Distant planet glows drifting behind the title */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                    <div className="animate-drift motion-reduce:animate-none absolute top-[18%] left-[12%] h-64 w-64 rounded-full bg-accent-deep/20 blur-[100px]" />
                    <div
                        className="animate-drift motion-reduce:animate-none absolute right-[10%] bottom-[22%] h-80 w-80 rounded-full bg-cyan-planet/15 blur-[110px]"
                        style={{ animationDelay: '-7s' }}
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    className="label-mono mb-6 text-accent"
                >
                    Drop Dev · AI Studio
                </motion.p>

                <motion.h1
                    variants={reduced ? undefined : container}
                    initial={reduced ? { opacity: 0 } : 'hidden'}
                    animate={reduced ? { opacity: 1 } : 'show'}
                    transition={reduced ? { duration: 0.5 } : undefined}
                    className="max-w-4xl text-5xl leading-[1.05] font-medium tracking-tighter text-balance sm:text-7xl lg:text-8xl"
                >
                    {HEADLINE.split(' ').map((w, i) => (
                        <motion.span key={i} variants={reduced ? undefined : word} className="inline-block">
                            {w}
                            {i < HEADLINE.split(' ').length - 1 ? ' ' : ''}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: reduced ? 0.2 : 1.1 }}
                    className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-2xl"
                >
                    We build AI that reads your documents, answers from your own data, and runs
                    on your own servers.
                </motion.p>

                {/* Scroll cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduced ? 0.4 : 2, duration: 1 }}
                    className="absolute bottom-10 flex flex-col items-center gap-3"
                >
                    <span className="label-mono text-white/60">
                        Scroll to travel
                    </span>
                    <span
                        aria-hidden="true"
                        className="animate-scroll-cue motion-reduce:animate-none block h-8 w-px bg-linear-to-b from-accent to-transparent"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
