/*
 * Arrival — the camera settles. One confident closing line, one understated
 * contact action (StarBorder comet-trail CTA inside a Magnetic gravity well),
 * and the footer.
 */
import { contact } from '../data/content';
import StarBorder from '../components/ui/StarBorder';
import Magnetic from '../components/ui/Magnetic';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';

export default function Arrival() {
    return (
        <section id="contact" className="relative">
            <div className="mx-auto flex min-h-[90vh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
                <ScrollRevealText
                    as="h2"
                    className="mb-10 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-6xl"
                >
                    You've reached the edge of the map. The rest, we build together.
                </ScrollRevealText>
                <Reveal delay={0.15}>
                    <Magnetic>
                        <StarBorder as="a" href={`mailto:${contact.email}`} speed="5s">
                            Get in touch
                        </StarBorder>
                    </Magnetic>
                </Reveal>
            </div>

            <footer className="border-t border-hairline">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <img src="/DropDev gradient (1).png" alt="Drop Dev" className="h-6 w-auto" />
                        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                            {contact.location}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] tracking-wider text-white/45">
                        <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                            {contact.email}
                        </a>
                        <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-accent">
                            {contact.phone}
                        </a>
                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <p className="font-mono text-[10px] text-white/25">
                        © {new Date().getFullYear()} Drop Dev
                    </p>
                </div>
            </footer>
        </section>
    );
}
