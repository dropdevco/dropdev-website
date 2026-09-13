/*
 * Specialties, formerly "Capabilities" / "The Engine Room". The four things
 * we are best at.
 *
 * The old version hid this copy under a cursor-tracked flashlight: text sat at
 * 14% opacity until you swept the mouse over it. That was removed. Everything
 * here is fully lit and readable at rest, on every device.
 */
import { specialties } from '../data/content';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';

export default function Specialties() {
    return (
        <section id="specialties" className="relative mx-auto max-w-6xl scroll-mt-28 px-6 py-32 sm:py-44">
            <Reveal>
                <p className="label-mono mb-5 text-accent">Our Specialties</p>
            </Reveal>
            <ScrollRevealText
                as="h2"
                className="mb-16 max-w-3xl text-3xl leading-snug font-medium tracking-tight text-balance sm:text-5xl"
            >
                Four things we do better than anyone.
            </ScrollRevealText>

            <div className="grid gap-4 sm:grid-cols-2">
                {specialties.map((item, i) => (
                    <Reveal key={item.id} delay={i * 0.08}>
                        <div className="h-full rounded-[2rem] border border-hairline bg-white/4 p-2 transition-colors duration-300 hover:border-hairline-accent">
                            <div className="h-full rounded-[calc(2rem-0.5rem)] bg-space-raise/80 p-8 ring-1 ring-white/5 ring-inset">
                                <span
                                    aria-hidden="true"
                                    className="mb-6 block h-1.5 w-10 rounded-full"
                                    style={{ background: item.color }}
                                />
                                <h3 className="mb-4 text-2xl font-medium tracking-tight text-white">
                                    {item.title}
                                </h3>
                                <p className="text-lg leading-relaxed text-white/75">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
