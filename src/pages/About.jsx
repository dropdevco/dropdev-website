/*
 * About — a calmer, elegant scrolling page in the same galaxy aesthetic
 * (near-black, violet accent, hairline borders, mono labels, oversized
 * display type). No planet-flight scrollytelling, no icons — just type,
 * hairlines, and the shared starfield behind everything.
 */
import { contact } from '../data/content';
import StarBorder from '../components/ui/StarBorder';
import Magnetic from '../components/ui/Magnetic';
import Reveal from '../components/ui/Reveal';
import ScrollRevealText from '../components/ui/ScrollRevealText';

const EMPOWER = [
    {
        title: 'Technology Into Community',
        body: 'We build with communities, not just for them—ensuring technology adoption creates real, lasting value.',
    },
    {
        title: 'The Impossible Made Possible',
        body: "If you have a challenge that feels unsolvable, talk to us. We thrive at the edge of what's technically possible.",
    },
];

const PHILOSOPHY = [
    {
        num: '01',
        title: 'Vertical Beats Horizontal',
        body: 'Deep industry expertise creates defensible advantages that horizontal tools cannot match. We build for specific verticals, not generic use cases.',
    },
    {
        num: '02',
        title: 'Local-First AI',
        body: "Data privacy is not a feature—it's a foundation. We build AI systems that run where your data lives, giving you complete control and compliance confidence.",
    },
    {
        num: '03',
        title: 'Ship, Then Improve',
        body: "The best AI system is one that's actually running in production. We bias toward shipping working systems fast, then optimizing relentlessly.",
    },
    {
        num: '04',
        title: 'We Can Build It Better',
        body: 'We look at what exists in your industry and we ask: how would we rebuild this from scratch with modern AI? The answer is always illuminating.',
    },
];

export default function About() {
    return (
        <div className="relative">
            {/* Hero */}
            <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 pt-40 pb-24 text-center">
                <Reveal>
                    <p className="mb-6 font-mono text-[11px] tracking-[0.35em] text-accent uppercase">
                        About Drop Dev
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <h1 className="gem-text max-w-3xl text-5xl leading-[1.05] font-medium tracking-tighter text-balance sm:text-6xl lg:text-7xl">
                        We Build What Others Only Imagine
                    </h1>
                </Reveal>
                <Reveal delay={0.25}>
                    <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
                        DropDev is a vertical AI consulting company. We bring cutting-edge
                        technology—OCR, RAG systems, local AI, and purpose-built software—into
                        communities and industries that need it most. We make the impossible
                        possible.
                    </p>
                </Reveal>
            </section>

            {/* Mission */}
            <section className="mx-auto max-w-4xl px-6 py-24">
                <Reveal>
                    <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
                        Our Mission
                    </p>
                </Reveal>
                <ScrollRevealText
                    as="h2"
                    className="mb-10 text-3xl leading-snug font-medium tracking-tight sm:text-5xl"
                >
                    To empower people through technology.
                </ScrollRevealText>
                <div className="max-w-2xl space-y-6 text-[15px] leading-relaxed text-white/55 sm:text-base">
                    <Reveal>
                        <p>
                            We believe AI should not belong only to the Fortune 500. Our mission is
                            to bring enterprise-grade artificial intelligence to organizations,
                            communities, and industries that are ready to leap forward—but haven't
                            had the right technology partner to get them there.
                        </p>
                    </Reveal>
                    <Reveal>
                        <p>
                            We don't just consult. We look at what you're doing and show you how we
                            can build it better—faster, smarter, and with AI at the core. If your
                            competitors are using yesterday's tools, we'll help you build tomorrow's
                            platform today.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Vision — pull quote */}
            <section className="mx-auto max-w-4xl px-6 py-24">
                <Reveal>
                    <p className="mb-8 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
                        Our Vision
                    </p>
                </Reveal>
                <ScrollRevealText
                    as="blockquote"
                    className="border-l border-hairline-accent pl-8 text-2xl leading-snug font-medium tracking-tight text-white/85 text-balance sm:text-3xl lg:text-4xl"
                >
                    "We believe in a world where the best technology doesn't belong only to the
                    largest companies. Our role is to bring AI capability to every community, every
                    industry, every founder with an idea worth building—and show them what becomes
                    possible."
                </ScrollRevealText>
            </section>

            {/* How We Empower People */}
            <section className="mx-auto max-w-5xl px-6 py-24">
                <Reveal>
                    <p className="mb-10 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
                        How We Empower People
                    </p>
                </Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                    {EMPOWER.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.1}>
                            <div className="h-full rounded-2xl border border-hairline bg-white/3 p-8 transition-colors duration-300 hover:border-white/15">
                                <h3 className="mb-3 text-lg font-medium tracking-tight text-white">
                                    {item.title}
                                </h3>
                                <p className="text-[13.5px] leading-relaxed text-white/50">
                                    {item.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Philosophy */}
            <section className="mx-auto max-w-5xl px-6 py-24">
                <Reveal>
                    <p className="mb-10 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
                        Our Philosophy
                    </p>
                </Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                    {PHILOSOPHY.map((item, i) => (
                        <Reveal key={item.num} delay={i * 0.08}>
                            <div className="h-full rounded-2xl border border-hairline bg-white/3 p-8 transition-colors duration-300 hover:border-white/15">
                                <span className="font-mono text-[13px] tracking-[0.2em] text-accent/50">
                                    {item.num}
                                </span>
                                <h3 className="mt-4 mb-3 text-lg font-medium tracking-tight text-white">
                                    {item.title}
                                </h3>
                                <p className="text-[13.5px] leading-relaxed text-white/50">
                                    {item.body}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
                <ScrollRevealText
                    as="h2"
                    className="mb-6 text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl"
                >
                    Ready to See What's Possible?
                </ScrollRevealText>
                <Reveal>
                    <p className="mb-10 max-w-xl text-base leading-relaxed text-white/55">
                        Tell us what you're building—or what's holding you back. We'll bring the
                        AI.
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <Magnetic>
                        <StarBorder as="a" href={`mailto:${contact.email}`} speed="5s">
                            Get in touch
                        </StarBorder>
                    </Magnetic>
                </Reveal>
            </section>
        </div>
    );
}
