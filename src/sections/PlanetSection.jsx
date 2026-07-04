/*
 * A "planet stop" on the scroll journey. Each section is 220vh tall with a
 * sticky full-viewport stage inside; the section's local scroll progress
 * drives the camera: the planet orb scales up as you approach (fly toward),
 * holds while its content panel reveals, then swells past the camera and
 * fades as you leave (fly through).
 *
 * Under prefers-reduced-motion the stage is not transformed at all — the
 * planet renders a single static frame and content uses plain fades.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import Orb from '../components/galaxy/Orb';
import { OrbitingCircles } from '../components/ui/OrbitingCircles';
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

    const num = String(index + 1).padStart(2, '0');

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
                        {/* Giant index numeral floating behind the planet */}
                        <span
                            aria-hidden="true"
                            className="absolute -top-8 -left-4 z-0 font-mono text-[7rem] leading-none font-medium text-white/5 select-none md:text-[10rem]"
                        >
                            {num}
                        </span>
                        <Orb hue={planet.hue} paused={reduced} forceHoverState={false} />
                        {/* Moons — the sub-capabilities orbiting this planet (desktop) */}
                        <div className="hidden md:contents">
                            <OrbitingCircles radius={185} duration={26} iconSize={32} path>
                                {planet.moons.map((moon) => (
                                    <span
                                        key={moon}
                                        className="rounded-full border border-hairline bg-space/90 px-3 py-1 font-mono text-[10px] tracking-wider whitespace-nowrap text-white/70 uppercase backdrop-blur-sm"
                                    >
                                        {moon}
                                    </span>
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
                                {planet.label}
                            </p>
                            <h2 className="mb-6 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                {planet.title}
                            </h2>
                            <ScrollRevealText className="max-w-lg text-lg leading-relaxed text-white/55 sm:text-xl">
                                {planet.description}
                            </ScrollRevealText>
                            {/* Moons as static chips on mobile */}
                            <ul className="mt-8 flex flex-wrap gap-2 md:hidden">
                                {planet.moons.map((moon) => (
                                    <li
                                        key={moon}
                                        className="rounded-full border border-hairline bg-white/3 px-3 py-1 font-mono text-[10px] tracking-wider text-white/70 uppercase"
                                    >
                                        {moon}
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
