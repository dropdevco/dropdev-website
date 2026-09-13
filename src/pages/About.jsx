/*
 * About: a calmer scrolling page in the same galaxy look (near-black, violet
 * accent, hairline borders, mono labels, oversized display type). No
 * planet-flight scrollytelling and no icons. Just type, hairlines, and the
 * shared starfield behind everything.
 */
import { Link } from 'react-router-dom';
import StarBorder from '../components/ui/StarBorder';
import Magnetic from '../components/ui/Magnetic';
import Reveal from '../components/ui/Reveal';
import ScrollRevealText from '../components/ui/ScrollRevealText';

const EMPOWER = [
    {
        title: 'Technology Into Community',
        body: 'We build with people, not just for them, so the tools we hand over actually get used.',
    },
    {
        title: 'The Impossible Made Possible',
        body: 'If you have a problem that feels unsolvable, talk to us. That is the work we like best.',
    },
];

const PHILOSOPHY = [
    {
        num: '01',
        title: 'Vertical Beats Horizontal',
        body: 'Knowing one industry deeply beats knowing every industry a little. We build for your business, not for everyone at once.',
    },
    {
        num: '02',
        title: 'Local-First AI',
        body: 'Privacy is not a feature you add later. We build AI that runs where your data already lives, so you stay in control.',
    },
    {
        num: '03',
        title: 'Ship, Then Improve',
        body: 'The best AI system is the one already running. We get something working fast, then keep making it better.',
    },
    {
        num: '04',
        title: 'We Can Build It Better',
        body: 'We look at the tools your industry uses and ask how we would build them today. The answer is usually a much better product.',
    },
];

export default function About() {
    return (
        <div className="relative">
            {/* Hero */}
            <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 pt-40 pb-24 text-center">
                <Reveal>
                    <p className="label-mono mb-6 text-accent">About Drop Dev</p>
                </Reveal>
                <Reveal delay={0.1}>
                    <h1 className="gem-text max-w-3xl text-5xl leading-[1.05] font-medium tracking-tighter text-balance sm:text-6xl lg:text-7xl">
                        We Build What Others Only Imagine
                    </h1>
                </Reveal>
                <Reveal delay={0.25}>
                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
                        DropDev builds AI for specific industries. We read your documents,
                        answer questions from your own data, and run it all on hardware you
                        control. We take on the work other shops call impossible.
                    </p>
                </Reveal>
            </section>

            {/* Mission */}
            <section className="mx-auto max-w-4xl px-6 py-24">
                <Reveal>
                    <p className="label-mono mb-5 text-accent">Our Mission</p>
                </Reveal>
                <ScrollRevealText
                    as="h2"
                    className="mb-10 text-3xl leading-snug font-medium tracking-tight sm:text-5xl"
                >
                    To empower people through technology.
                </ScrollRevealText>
                <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-white/75">
                    <Reveal>
                        <p>
                            AI should not belong only to the Fortune 500. We bring the same
                            quality of AI to companies and communities that are ready to move
                            but have not found the right team to build it with them.
                        </p>
                    </Reveal>
                    <Reveal>
                        <p>
                            We do not just advise. We look at what you are doing today and show
                            you how to build it better. If your competitors are still using old
                            tools, we will help you get well ahead of them.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Vision — pull quote */}
            <section className="mx-auto max-w-4xl px-6 py-24">
                <Reveal>
                    <p className="label-mono mb-8 text-accent">Our Vision</p>
                </Reveal>
                <ScrollRevealText
                    as="blockquote"
                    className="border-l border-hairline-accent pl-8 text-2xl leading-snug font-medium tracking-tight text-white/85 text-balance sm:text-3xl lg:text-4xl"
                >
                    "The best technology should not belong only to the biggest companies. Our
                    job is to put it in the hands of every community, every industry, and every
                    founder with an idea worth building."
                </ScrollRevealText>
            </section>

            {/* How We Empower People */}
            <section className="mx-auto max-w-5xl px-6 py-24">
                <Reveal>
                    <p className="label-mono mb-10 text-accent">How We Empower People</p>
                </Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                    {EMPOWER.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.1}>
                            <div className="h-full rounded-2xl border border-hairline bg-white/3 p-8 transition-colors duration-300 hover:border-white/15">
                                <h3 className="mb-3 text-xl font-medium tracking-tight text-white">
                                    {item.title}
                                </h3>
                                <p className="text-base leading-relaxed text-white/75">
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
                    <p className="label-mono mb-10 text-accent">Our Philosophy</p>
                </Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                    {PHILOSOPHY.map((item, i) => (
                        <Reveal key={item.num} delay={i * 0.08}>
                            <div className="h-full rounded-2xl border border-hairline bg-white/3 p-8 transition-colors duration-300 hover:border-white/15">
                                <span className="font-mono text-base tracking-[0.2em] text-accent/80">
                                    {item.num}
                                </span>
                                <h3 className="mt-4 mb-3 text-xl font-medium tracking-tight text-white">
                                    {item.title}
                                </h3>
                                <p className="text-base leading-relaxed text-white/75">
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
                    <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
                        Tell us what you are building, or what is holding you back. We will
                        bring the AI.
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <Magnetic>
                        <StarBorder as={Link} to="/#contact" speed="5s">
                            Get in Touch
                        </StarBorder>
                    </Magnetic>
                </Reveal>
            </section>
        </div>
    );
}
