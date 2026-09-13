/*
 * The industries solar system, the first stop after the hero.
 *
 * Right: a central Drop Dev core with six elliptical orbits, one industry per
 * ring, each planet traveling its ellipse. When idle the system tours the
 * industries in turn; clicking a planet or its ring selects that industry and
 * pauses the tour (click the core to resume). Left: a panel showing the
 * selected industry and one plain sentence about what we do there.
 *
 * The panel used to carry four paragraphs per industry (problem space, AI
 * opportunity, why it wins, how we help). Trimmed to the one line that
 * actually matters to a visitor.
 *
 * prefers-reduced-motion → planets sit still, no auto-tour; click to select.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { industries } from '../data/content';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';

const HUES = ['#c4b5fd', '#7dd3fc', '#6ee7b7', '#f5b8ff', '#fcd34d', '#fda4af'];

// Per-ring orbital geometry (units are % of the square stage; center = 50,50).
const ORBITS = industries.map((ind, i) => {
    const ax = 16 + i * 6.4; // semi-major axis grows outward (max 48, inside viewBox)
    return {
        id: ind.id,
        ax,
        ay: ax * 0.62, // elliptical
        period: 70 + i * 14, // slow crawl, easy to aim at (seconds)
        phase: (i / industries.length) * Math.PI * 2, // spread start angles
        hue: HUES[i % HUES.length],
    };
});

export default function IndustriesBelt() {
    const reduced = useReducedMotion();
    const [selectedId, setSelectedId] = useState(industries[0].id);
    const [paused, setPaused] = useState(false);
    const planetRefs = useRef([]);

    const selected = industries.find((ind) => ind.id === selectedId);
    const selectedIndex = industries.findIndex((ind) => ind.id === selectedId);
    const selectedHue = ORBITS[selectedIndex]?.hue;

    // Auto-tour: cycle the highlight while idle.
    useEffect(() => {
        if (paused || reduced) return;
        const t = setInterval(() => {
            setSelectedId((cur) => {
                const idx = industries.findIndex((ind) => ind.id === cur);
                return industries[(idx + 1) % industries.length].id;
            });
        }, 4500);
        return () => clearInterval(t);
    }, [paused, reduced]);

    // Orbital motion: write planet positions each frame (or place once if reduced).
    useEffect(() => {
        const place = (o, angle, node) => {
            if (!node) return;
            node.style.left = `${50 + o.ax * Math.cos(angle)}%`;
            node.style.top = `${50 + o.ay * Math.sin(angle)}%`;
        };
        if (reduced) {
            ORBITS.forEach((o, i) => place(o, o.phase, planetRefs.current[i]));
            return;
        }
        let raf;
        const start = performance.now();
        const loop = (t) => {
            const el = (t - start) / 1000;
            ORBITS.forEach((o, i) => {
                place(o, o.phase + el * ((Math.PI * 2) / o.period), planetRefs.current[i]);
            });
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [reduced]);

    const pick = (id) => {
        setSelectedId(id);
        setPaused(true);
    };

    const rings = useMemo(() => ORBITS, []);

    return (
        <section id="industries" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-32 sm:py-44">
            <Reveal>
                <p className="label-mono mb-5 text-accent">Who We Work With</p>
            </Reveal>
            <ScrollRevealText
                as="h2"
                className="mb-16 max-w-3xl text-3xl leading-snug font-medium tracking-tight text-balance sm:text-5xl"
            >
                Six industries where getting it right matters most.
            </ScrollRevealText>

            <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Detail panel: last on mobile (system on top), first on desktop */}
                <div className="order-2 lg:order-1">
                    <div className="rounded-[2rem] border border-hairline bg-white/4 p-2">
                        <div className="rounded-[calc(2rem-0.5rem)] bg-space-raise/80 p-8 ring-1 ring-white/5 ring-inset sm:p-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selected.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                                >
                                    <h3
                                        className="mb-5 text-3xl font-medium tracking-tight sm:text-4xl"
                                        style={{ color: selectedHue }}
                                    >
                                        {selected.name}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
                                        {selected.howWeHelp}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Plain text list, so the industries are reachable without
                        having to hit a moving target. */}
                    <ul className="mt-6 flex flex-wrap gap-2">
                        {industries.map((ind, i) => {
                            const active = ind.id === selectedId;
                            return (
                                <li key={ind.id}>
                                    <button
                                        type="button"
                                        onClick={() => pick(ind.id)}
                                        aria-pressed={active}
                                        className="rounded-full border px-4 py-2 font-mono text-sm tracking-wider uppercase transition-colors"
                                        style={{
                                            borderColor: active ? ORBITS[i].hue : 'rgba(255,255,255,0.14)',
                                            color: active ? ORBITS[i].hue : 'rgba(255,255,255,0.65)',
                                        }}
                                    >
                                        {ind.name}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Solar system */}
                <div className="order-1 flex justify-center lg:order-2">
                    <div className="relative aspect-square w-full max-w-[640px]">
                        {/* Orbit rings */}
                        <svg
                            viewBox="0 0 100 100"
                            className="absolute inset-0 h-full w-full overflow-visible"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {rings.map((o, i) => {
                                const active = industries[i].id === selectedId;
                                return (
                                    <ellipse
                                        key={o.id}
                                        cx="50"
                                        cy="50"
                                        rx={o.ax}
                                        ry={o.ay}
                                        fill="none"
                                        stroke={active ? o.hue : 'rgba(255,255,255,0.18)'}
                                        strokeWidth={active ? 0.5 : 0.3}
                                        style={{
                                            vectorEffect: 'non-scaling-stroke',
                                            opacity: active ? 0.9 : 0.55,
                                            transition: 'stroke 0.3s, opacity 0.3s',
                                        }}
                                        onClick={() => pick(o.id)}
                                    />
                                );
                            })}
                        </svg>

                        {/* Central core (Drop Dev): click to resume the tour */}
                        <button
                            type="button"
                            onClick={() => setPaused(false)}
                            aria-label="Resume industry tour"
                            className="absolute top-1/2 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                            title={paused ? 'Resume tour' : 'Touring industries'}
                        >
                            <span className="absolute inset-0 rounded-full bg-accent-deep/25 blur-md" />
                            <span className="absolute inset-2 rounded-full bg-radial from-accent/70 to-accent-deep/30" />
                            <img
                                src="/DropDev gradient (1).png"
                                alt="Drop Dev core"
                                className="relative h-8 w-auto"
                            />
                        </button>

                        {/* Planets */}
                        {industries.map((ind, i) => {
                            const active = ind.id === selectedId;
                            const hue = ORBITS[i].hue;
                            return (
                                <button
                                    key={ind.id}
                                    type="button"
                                    ref={(el) => (planetRefs.current[i] = el)}
                                    onClick={() => pick(ind.id)}
                                    aria-label={ind.name}
                                    aria-pressed={active}
                                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full p-3"
                                    style={{ left: '50%', top: '50%' }}
                                >
                                    <span
                                        className="block rounded-full transition-all duration-300"
                                        style={{
                                            width: active ? 24 : 15,
                                            height: active ? 24 : 15,
                                            background: hue,
                                            boxShadow: active
                                                ? `0 0 14px 3px ${hue}, 0 0 4px 1px #fff`
                                                : `0 0 6px 1px ${hue}aa`,
                                            opacity: active ? 1 : 0.8,
                                        }}
                                    />
                                    {active && (
                                        <span
                                            className="absolute top-1/2 left-[calc(50%+16px)] -translate-y-1/2 font-mono text-xs tracking-wider whitespace-nowrap uppercase"
                                            style={{ color: hue }}
                                        >
                                            {ind.name}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
