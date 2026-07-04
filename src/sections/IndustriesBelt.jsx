/*
 * The industries orbit — a belt of six industries the camera passes through.
 * Each chip expands into a problem → AI opportunity → why-it-wins panel
 * (content carried over verbatim from the previous site).
 */
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { industries } from '../data/content';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';
import { cn } from '../lib/utils';

const DETAIL_COLUMNS = [
    { key: 'problemSpace', label: 'Problem Space' },
    { key: 'aiOpportunity', label: 'AI Opportunity' },
    { key: 'whyItWins', label: 'Why It Wins' },
];

export default function IndustriesBelt() {
    const [selectedId, setSelectedId] = useState(null);
    const reduced = useReducedMotion();
    const selected = industries.find((ind) => ind.id === selectedId);

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

            {/* The belt */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" role="list">
                {industries.map((ind, i) => (
                    <Reveal key={ind.id} delay={i * 0.05}>
                        <button
                            type="button"
                            role="listitem"
                            onClick={() => setSelectedId(selectedId === ind.id ? null : ind.id)}
                            aria-expanded={selectedId === ind.id}
                            className={cn(
                                'group flex w-full flex-col items-center gap-2 rounded-2xl border px-4 py-6 transition-colors duration-300',
                                selectedId === ind.id
                                    ? 'border-hairline-accent bg-accent-deep/10'
                                    : 'border-hairline bg-white/3 hover:border-white/15 hover:bg-white/5'
                            )}
                        >
                            <span className="text-2xl" aria-hidden="true">
                                {ind.icon}
                            </span>
                            <span className="font-mono text-[11px] tracking-wider text-white/70 uppercase group-hover:text-white">
                                {ind.name}
                            </span>
                        </button>
                    </Reveal>
                ))}
            </div>

            {/* Expanded detail panel */}
            <AnimatePresence mode="wait">
                {selected && (
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: reduced ? 0.2 : 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="rounded-2xl border border-hairline-accent bg-space-raise/80 p-8 backdrop-blur-sm">
                            <h3 className="mb-6 flex items-center gap-3 text-xl font-medium">
                                <span aria-hidden="true">{selected.icon}</span>
                                {selected.name}
                            </h3>
                            <div className="grid gap-8 md:grid-cols-3">
                                {DETAIL_COLUMNS.map((col) => (
                                    <div key={col.key}>
                                        <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                                            {col.label}
                                        </p>
                                        <p className="text-sm leading-relaxed text-white/55">
                                            {selected[col.key]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
