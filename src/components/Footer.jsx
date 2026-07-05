/*
 * Shared site footer — rendered once by Layout under every route.
 * (Extracted from Arrival.jsx so home and About share one footer.)
 */
import { contact } from '../data/content';

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-hairline">
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
    );
}
