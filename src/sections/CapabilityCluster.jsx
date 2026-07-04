/*
 * The engine room — a tight constellation of the four core AI capabilities,
 * presented as spotlight cards (kokonutui) with hover-dim siblings. A GSAP
 * scroll-scrubbed statement line introduces the cluster.
 */
import { useState } from 'react';
import { capabilities } from '../data/content';
import SpotlightCard from '../components/ui/SpotlightCard';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';

export default function CapabilityCluster() {
    const [hoveredId, setHoveredId] = useState(null);

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
                Four core systems power every planet in this galaxy.
            </ScrollRevealText>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {capabilities.map((cap, i) => (
                    <Reveal key={cap.id} delay={i * 0.08}>
                        <SpotlightCard
                            item={cap}
                            dimmed={hoveredId !== null && hoveredId !== cap.id}
                            onHoverStart={() => setHoveredId(cap.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="h-full"
                        />
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
