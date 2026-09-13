/*
 * A "planet stop" on the scroll journey. On desktop each section is 220vh
 * tall with a sticky full-viewport stage inside; the section's local scroll
 * progress drives the camera: the planet orb scales up as you approach (fly
 * toward), holds while its content panel reveals, then swells past the camera
 * and fades as you leave (fly through).
 *
 * The planet itself is grabbable: click-drag spins it with inertia (see
 * Orb.jsx). Sub-points render as three plain, readable proof lines.
 *
 * The stage lays out flat (no 220vh, no sticky, no scroll-driven transforms)
 * in two cases:
 *   - prefers-reduced-motion
 *   - narrow screens. The stage is one fixed viewport tall, and on a phone the
 *     orb plus the copy do not fit inside it. Legible copy beats the flight,
 *     so phones get a normal stacked section and the orb still spins.
 */
import { useRef, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Orb from '../components/galaxy/Orb';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';
import { cn } from '../lib/utils';

// Narrow-screen check as an external store (lint-clean, no setState-in-effect).
const NARROW = '(max-width: 767px)';
const subscribeNarrow = (cb) => {
    const m = window.matchMedia(NARROW);
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
};
const getNarrow = () => window.matchMedia(NARROW).matches;

export default function PlanetSection({ planet, index }) {
    const sectionRef = useRef(null);
    const reduced = useReducedMotion();
    const narrow = useSyncExternalStore(subscribeNarrow, getNarrow, () => false);
    const flat = reduced || narrow;
    const flip = index % 2 === 1; // alternate planet side per stop

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Camera: approach → arrive → fly through
    const orbScale = useTransform(scrollYProgress, [0.05, 0.45, 0.98], [0.3, 1, 2.4]);
    const orbOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.78, 0.98], [0, 1, 1, 0]);
    const contentOpacity = useTransform(scrollYProgress, [0.32, 0.44, 0.66, 0.8], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0.32, 0.5], [70, 0]);

    return (
        <section
            ref={sectionRef}
            id={planet.id}
            className={cn(!flat && 'h-[220vh]', 'relative scroll-mt-28')}
        >
            <div
                className={cn(
                    'flex items-center overflow-hidden',
                    flat ? 'py-24' : 'sticky top-0 h-[100dvh]'
                )}
            >
                <div
                    className={cn(
                        'mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-2 md:gap-6',
                        flip && 'md:[direction:rtl]'
                    )}
                >
                    {/* The planet: grab it and spin it */}
                    <motion.div
                        style={flat ? undefined : { scale: orbScale, opacity: orbOpacity }}
                        className="relative z-10 mx-auto aspect-square w-48 sm:w-64 md:w-[min(40vw,480px)] md:[direction:ltr]"
                    >
                        <Orb hue={planet.hue} paused={reduced} forceHoverState={false} />
                    </motion.div>

                    {/* The content panel */}
                    <motion.div
                        style={flat ? undefined : { opacity: contentOpacity, y: contentY }}
                        className="relative z-10 md:[direction:ltr]"
                    >
                        <Reveal className={flat ? undefined : 'contents'}>
                            <p className="label-mono mb-5" style={{ color: planet.accent }}>
                                {planet.kicker}
                            </p>
                            <h2 className="mb-5 text-3xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                {planet.title}
                            </h2>
                            <ScrollRevealText className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-2xl">
                                {planet.description}
                            </ScrollRevealText>

                            {/* Sub-points: three short plain-language proof lines */}
                            <ul className="mt-8 space-y-4 sm:mt-10">
                                {planet.moons.map((moon) => (
                                    <li key={moon.label} className="flex gap-4">
                                        <span
                                            aria-hidden="true"
                                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                            style={{ background: planet.accent }}
                                        />
                                        <span className="text-base leading-relaxed text-white/70 sm:text-lg">
                                            <span className="font-medium text-white">
                                                {moon.label}.
                                            </span>{' '}
                                            {moon.meaning}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
