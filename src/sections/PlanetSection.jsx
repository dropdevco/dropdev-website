/*
 * A "planet stop" on the scroll journey. Each section is 220vh tall with a
 * sticky full-viewport stage inside; the section's local scroll progress
 * drives the camera: the planet orb scales up as you approach (fly toward),
 * holds while its content panel reveals, then swells past the camera and
 * fades as you leave (fly through).
 *
 * The planet itself is grabbable — click-drag spins it with inertia (see
 * Orb.jsx). Sub-points render once as a plain, non-interactive mono line.
 *
 * Under prefers-reduced-motion the stage is not transformed at all — the
 * planet renders a single static frame and content uses plain fades.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Orb from '../components/galaxy/Orb';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';
import { cn } from '../lib/utils';

export default function PlanetSection({ planet, index }) {
    const sectionRef = useRef(null);
    const reduced = useReducedMotion();
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
                    {/* The planet — grab it and spin it */}
                    <motion.div
                        style={reduced ? undefined : { scale: orbScale, opacity: orbOpacity }}
                        className="relative z-10 mx-auto aspect-square w-56 sm:w-72 md:w-[min(40vw,480px)] md:[direction:ltr]"
                    >
                        <Orb hue={planet.hue} paused={reduced} forceHoverState={false} />
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

                            {/* Sub-points — one quiet, non-interactive line */}
                            <p className="mt-8 font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                                {planet.moons.map((moon) => moon.label).join(' · ')}
                            </p>
                        </Reveal>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
