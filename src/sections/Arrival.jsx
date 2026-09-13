/*
 * Arrival: the closing contact block, and the target of every "Get in Touch"
 * button on the site.
 *
 * This used to be a single mailto: link, which does nothing at all on a
 * machine with no mail client set up. The email address and phone number are
 * now spelled out on the page as large tappable links, so there is always
 * something that works.
 */
import { contact } from '../data/content';
import StarBorder from '../components/ui/StarBorder';
import Magnetic from '../components/ui/Magnetic';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';

export default function Arrival() {
    return (
        <section id="contact" className="relative scroll-mt-28">
            <div className="mx-auto flex min-h-[90vh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
                <Reveal>
                    <p className="label-mono mb-6 text-accent">Get in Touch</p>
                </Reveal>
                <ScrollRevealText
                    as="h2"
                    className="mb-8 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-6xl"
                >
                    Tell us what you want to build.
                </ScrollRevealText>
                <Reveal delay={0.1}>
                    <p className="mb-12 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
                        Send us a note or give us a call. We will get back to you within one
                        business day.
                    </p>
                </Reveal>

                <Reveal delay={0.15}>
                    <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
                        <a
                            href={`mailto:${contact.email}`}
                            className="text-xl font-medium tracking-tight text-white underline decoration-accent/50 underline-offset-8 transition-colors hover:text-accent sm:text-2xl"
                        >
                            {contact.email}
                        </a>
                        <a
                            href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                            className="text-xl font-medium tracking-tight text-white underline decoration-accent/50 underline-offset-8 transition-colors hover:text-accent sm:text-2xl"
                        >
                            {contact.phone}
                        </a>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <Magnetic>
                        <StarBorder
                            as="a"
                            href={`mailto:${contact.email}?subject=Project%20inquiry`}
                            speed="5s"
                        >
                            Email Us
                        </StarBorder>
                    </Magnetic>
                </Reveal>
            </div>
        </section>
    );
}
