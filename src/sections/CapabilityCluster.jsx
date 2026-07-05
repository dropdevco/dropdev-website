/*
 * The engine room — the four core AI capabilities on a dark "asteroid surface."
 * Text sits nearly unlit by default; a flashlight that tracks the cursor
 * reveals a bright, gem-like copy underneath it (a duplicate text layer masked
 * by a radial gradient centered on the pointer). Both layers share identical
 * layout so they register exactly.
 *
 * No hover (touch) or prefers-reduced-motion → skip the flashlight and render
 * everything fully lit and readable.
 */
import { useRef, useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';
import { capabilities } from '../data/content';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';
import { cn } from '../lib/utils';

const RADIUS = 220;

// Hover-capability as an external store (lint-clean, no setState-in-effect).
const hoverQuery = '(hover: hover)';
function subscribeHover(cb) {
    const m = window.matchMedia(hoverQuery);
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
}
const getHover = () => window.matchMedia(hoverQuery).matches;

function CardContent({ bright }) {
    return capabilities.map((cap) => (
        <div
            key={cap.id}
            className="flex flex-col gap-3 rounded-2xl border border-transparent p-6"
        >
            <h3
                className={cn(
                    'text-lg font-medium tracking-tight',
                    bright ? 'gem-text' : 'text-white'
                )}
            >
                {cap.title}
            </h3>
            <p className={cn('text-[13.5px] leading-relaxed', bright ? 'text-white/85' : 'text-white')}>
                {cap.description}
            </p>
        </div>
    ));
}

export default function CapabilityCluster() {
    const reduced = useReducedMotion();
    const stageRef = useRef(null);
    const frame = useRef(0);
    const canHover = useSyncExternalStore(subscribeHover, getHover, () => true);

    const flashlight = canHover && !reduced;

    const handleMove = (e) => {
        if (!flashlight || !stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (frame.current) return;
        frame.current = requestAnimationFrame(() => {
            frame.current = 0;
            stageRef.current?.style.setProperty('--mx', `${x}px`);
            stageRef.current?.style.setProperty('--my', `${y}px`);
        });
    };

    const gridCls = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4';

    return (
        <section id="capabilities" className="relative mx-auto max-w-6xl px-6 py-40 sm:py-52">
            <Reveal>
                <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
                    The Engine Room
                </p>
            </Reveal>
            <ScrollRevealText
                as="h2"
                className="mb-16 max-w-3xl text-3xl leading-snug font-medium tracking-tight text-balance sm:text-5xl"
            >
                Four core systems power every world we build.
            </ScrollRevealText>

            <div
                ref={stageRef}
                onMouseMove={handleMove}
                onMouseLeave={() => {
                    stageRef.current?.style.setProperty('--mx', '-9999px');
                    stageRef.current?.style.setProperty('--my', '-9999px');
                }}
                className="relative overflow-hidden rounded-3xl border border-hairline p-4 sm:p-6"
                style={{
                    '--mx': '-9999px',
                    '--my': '-9999px',
                    background:
                        'radial-gradient(120% 120% at 50% 0%, rgba(167,139,250,0.06), transparent 60%), #06060d',
                }}
            >
                {/* Faint asteroid texture */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.5) 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.4) 0.5px, transparent 1px)',
                        backgroundSize: '90px 90px, 130px 130px',
                    }}
                />

                {flashlight ? (
                    <>
                        {/* Dim base layer — barely-lit rock */}
                        <div className={cn(gridCls, 'relative opacity-[0.14]')} aria-hidden="true">
                            <CardContent bright={false} />
                        </div>
                        {/* Bright gem layer, revealed only under the flashlight */}
                        <div
                            className={cn(gridCls, 'pointer-events-none absolute inset-4 sm:inset-6')}
                            style={{
                                maskImage: `radial-gradient(circle ${RADIUS}px at var(--mx) var(--my), #000 0%, #000 34%, transparent 74%)`,
                                WebkitMaskImage: `radial-gradient(circle ${RADIUS}px at var(--mx) var(--my), #000 0%, #000 34%, transparent 74%)`,
                            }}
                        >
                            <CardContent bright />
                        </div>
                        {/* Soft light halo following the cursor */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background: `radial-gradient(circle ${RADIUS}px at var(--mx) var(--my), rgba(167,139,250,0.10), transparent 70%)`,
                            }}
                        />
                    </>
                ) : (
                    // No-hover / reduced-motion: fully lit, plainly readable
                    <div className={gridCls}>
                        <CardContent bright />
                    </div>
                )}
            </div>
        </section>
    );
}
