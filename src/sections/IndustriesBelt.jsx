/*
 * The industries orbit — an interactive solar system.
 *
 * Right: a central Drop Dev core with six elliptical orbits, one industry per
 * ring, each planet traveling its ellipse. When idle the system auto-tours the
 * industries (highlighting each in turn); clicking a planet or its ring selects
 * that industry and pauses the tour (click the core to resume). Left: a detail
 * panel that always reflects the active industry, ending in a concrete
 * "What we can do for you."
 *
 * prefers-reduced-motion → planets sit still, no auto-tour; click to select.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { industries } from '../data/content';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';

const HUES = ['#a78bfa', '#4cc2e9', '#34d399', '#f0abfc', '#fbbf24', '#fb7185'];

// Per-ring orbital geometry (units are % of the square stage; center = 50,50).
const ORBITS = industries.map((ind, i) => {
    const ax = 16 + i * 6.4; // semi-major axis grows outward (max 48, inside viewBox)
    return {
        id: ind.id,
        ax,
        ay: ax * 0.62, // elliptical
        period: 70 + i * 14, // slow crawl — easy to aim at (seconds)
        phase: (i / industries.length) * Math.PI * 2, // spread start angles
        hue: HUES[i % HUES.length],
    };
});

const DETAIL_ROWS = [
    { key: 'problemSpace', label: 'Problem Space' },
    { key: 'aiOpportunity', label: 'AI Opportunity' },
    { key: 'whyItWins', label: 'Why It Wins' },
];

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

    // Orbital motion — write planet positions each frame (or place once if reduced).
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
        <section id="industries" className="relative mx-auto max-w-6xl px-6 py-40 sm:py-52">
            <Reveal>
                <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
                    The Industries Orbit
                </p>
            </Reveal>
            <ScrollRevealText
                as="h2"
                className="mb-16 max-w-3xl text-3xl leading-snug font-medium tracking-tight text-balance sm:text-5xl"
            >
                Built for the industries where trust decides everything.
            </ScrollRevealText>

            <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Detail panel — order last on mobile (system on top), first on desktop */}
                <div className="order-2 lg:order-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="rounded-2xl border border-hairline bg-space-raise/70 p-8 backdrop-blur-sm"
                        >
                            <h3
                                className="mb-5 text-2xl font-medium tracking-tight"
                                style={{ color: selectedHue }}
                            >
                                {selected.name}
                            </h3>

                            {/* What we can do for you — the lead */}
                            <p className="mb-2 font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                                What we can do for you
                            </p>
                            <p className="mb-7 text-[15px] leading-relaxed text-white/80">
                                {selected.howWeHelp}
                            </p>

                            {/* Supporting detail */}
                            <dl className="grid gap-5 sm:grid-cols-3">
                                {DETAIL_ROWS.map((row) => (
                                    <div key={row.key}>
                                        <dt className="mb-2 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
                                            {row.label}
                                        </dt>
                                        <dd className="text-[12.5px] leading-relaxed text-white/55">
                                            {selected[row.key]}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.div>
                    </AnimatePresence>
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
                                        stroke={active ? o.hue : 'rgba(255,255,255,0.12)'}
                                        strokeWidth={active ? 0.5 : 0.3}
                                        style={{
                                            vectorEffect: 'non-scaling-stroke',
                                            opacity: active ? 0.9 : 0.5,
                                            transition: 'stroke 0.3s, opacity 0.3s',
                                        }}
                                        onClick={() => pick(o.id)}
                                    />
                                );
                            })}
                        </svg>

                        {/* Central core (Drop Dev) — click to resume the tour */}
                        <button
                            type="button"
                            onClick={() => setPaused(false)}
                            aria-label="Resume industry tour"
                            className="absolute top-1/2 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                            title={paused ? 'Resume tour' : 'Touring industries'}
                        >
                            <span className="absolute inset-0 rounded-full bg-accent-deep/25 blur-md" />
                            <span className="absolute inset-2 rounded-full bg-radial from-accent/70 to-accent-deep/30" />
                            <img
                                src="/DropDev gradient (1).png"
                                alt="Drop Dev core"
                                className="relative h-6 w-auto"
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
                                            width: active ? 22 : 14,
                                            height: active ? 22 : 14,
                                            background: hue,
                                            boxShadow: active
                                                ? `0 0 14px 3px ${hue}, 0 0 4px 1px #fff`
                                                : `0 0 6px 1px ${hue}aa`,
                                            opacity: active ? 1 : 0.75,
                                        }}
                                    />
                                    {active && (
                                        <span
                                            className="absolute top-1/2 left-[calc(50%+14px)] -translate-y-1/2 font-mono text-[9px] tracking-wider whitespace-nowrap uppercase"
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
