/*
 * A "planet stop" on the scroll journey. Each section is 220vh tall with a
 * sticky full-viewport stage inside; the section's local scroll progress
 * drives the camera: the planet orb scales up as you approach (fly toward),
 * holds while its content panel reveals, then swells past the camera and
 * fades as you leave (fly through).
 *
 * Moons orbit the planet with a plain-language label; hovering (desktop) or
 * tapping (mobile) a moon surfaces its one-sentence meaning in a caption.
 *
 * Under prefers-reduced-motion the stage is not transformed at all — the
 * planet renders a single static frame and content uses plain fades.
 */
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Orb from '../components/galaxy/Orb';
import { OrbitingCircles } from '../components/ui/OrbitingCircles';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';
import { cn } from '../lib/utils';

export default function PlanetSection({ planet, index }) {
    const sectionRef = useRef(null);
    const reduced = useReducedMotion();
    const flip = index % 2 === 1; // alternate planet side per stop
    const [activeMoon, setActiveMoon] = useState(null); // hovered/tapped moon label

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Camera: approach → arrive → fly through
    const orbScale = useTransform(scrollYProgress, [0.05, 0.45, 0.98], [0.3, 1, 2.4]);
    const orbOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.78, 0.98], [0, 1, 1, 0]);
    const contentOpacity = useTransform(scrollYProgress, [0.32, 0.44, 0.66, 0.8], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0.32, 0.5], [70, 0]);

    const activeMeaning = planet.moons.find((m) => m.label === activeMoon)?.meaning;

    return (
        <section ref={sectionRef} id={planet.id} className={cn(!reduced && 'h-[220vh]', 'relative')}>
            <div
                className={cn(
                    'flex items-center overflow-hidden',
                    reduced ? 'min-h-screen py-24' : 'sticky top-0 h-screen'
                )}
            >
                <div
                    className={cn(
                        'mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-6',
                        flip && 'md:[direction:rtl]'
                    )}
                >
                    {/* The planet */}
                    <motion.div
                        style={reduced ? undefined : { scale: orbScale, opacity: orbOpacity }}
                        className="relative mx-auto aspect-square w-56 sm:w-72 md:w-[min(40vw,480px)] md:[direction:ltr]"
                    >
                        <Orb hue={planet.hue} paused={reduced} forceHoverState={false} />
                        {/* Moons — orbit the planet (desktop); hover reveals meaning */}
                        <div className="hidden md:contents">
                            <OrbitingCircles radius={185} duration={26} iconSize={40} path>
                                {planet.moons.map((moon) => (
                                    <button
                                        type="button"
                                        key={moon.label}
                                        onMouseEnter={() => setActiveMoon(moon.label)}
                                        onMouseLeave={() => setActiveMoon((cur) => (cur === moon.label ? null : cur))}
                                        onFocus={() => setActiveMoon(moon.label)}
                                        onBlur={() => setActiveMoon((cur) => (cur === moon.label ? null : cur))}
                                        className={cn(
                                            'pointer-events-auto cursor-default rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider whitespace-nowrap uppercase backdrop-blur-sm transition-colors',
                                            activeMoon === moon.label
                                                ? 'border-hairline-accent bg-accent-deep/20 text-white'
                                                : 'border-hairline bg-space/90 text-white/70 hover:text-white'
                                        )}
                                    >
                                        {moon.label}
                                    </button>
                                ))}
                            </OrbitingCircles>
                        </div>
                    </motion.div>

                    {/* The content panel */}
                    <motion.div
                        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
                        className="relative z-10 md:[direction:ltr]"
                    >
                        <Reveal className={reduced ? undefined : 'contents'}>
                            <p
                                className="mb-4 font-mono text-[11px] tracking-[0.3em] uppercase"
                                style={{ color: planet.accent }}
                            >
                                {planet.kicker}
                            </p>
                            <h2 className="mb-6 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                {planet.title}
                            </h2>
                            <ScrollRevealText className="max-w-lg text-lg leading-relaxed text-white/55 sm:text-xl">
                                {planet.description}
                            </ScrollRevealText>

                            {/* Moon-meaning caption (desktop): swaps to the hovered moon */}
                            <div className="mt-6 hidden min-h-[2.5rem] max-w-md md:block">
                                <AnimatePresence mode="wait">
                                    {activeMeaning && (
                                        <motion.p
                                            key={activeMoon}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.25 }}
                                            className="border-l border-hairline-accent pl-3 text-sm leading-relaxed text-white/60"
                                        >
                                            <span className="font-mono text-[11px] tracking-wider text-accent uppercase">
                                                {activeMoon}
                                            </span>
                                            <br />
                                            {activeMeaning}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Moons as tappable chips on mobile — tap expands meaning inline */}
                            <ul className="mt-8 flex flex-col gap-2 md:hidden">
                                {planet.moons.map((moon) => {
                                    const open = activeMoon === moon.label;
                                    return (
                                        <li key={moon.label}>
                                            <button
                                                type="button"
                                                onClick={() => setActiveMoon(open ? null : moon.label)}
                                                aria-expanded={open}
                                                className={cn(
                                                    'w-full rounded-xl border px-3 py-2 text-left transition-colors',
                                                    open
                                                        ? 'border-hairline-accent bg-accent-deep/10'
                                                        : 'border-hairline bg-white/3'
                                                )}
                                            >
                                                <span className="font-mono text-[10px] tracking-wider text-white/70 uppercase">
                                                    {moon.label}
                                                </span>
                                                {open && (
                                                    <span className="mt-1 block text-[13px] leading-relaxed text-white/55">
                                                        {moon.meaning}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Reveal>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
