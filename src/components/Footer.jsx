/*
 * Shared site footer, rendered once by Layout under every route.
 * Carries the wordmark, the three ways to reach us, the social links, and the
 * legal pages (Privacy Policy, Terms and Conditions).
 */
import { Link } from 'react-router-dom';
import { contact, socials } from '../data/content';
import SocialIcon from './SocialIcon';

const LEGAL = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms and Conditions' },
];

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-hairline bg-banner/70">
            <div className="mx-auto max-w-6xl px-6 py-14">
                <div className="grid gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
                    {/* Identity */}
                    <div className="flex flex-col items-center gap-3 sm:items-start">
                        <div className="flex items-center gap-3">
                            <img src="/DropDev gradient (1).png" alt="" className="h-10 w-auto" />
                            <span className="text-xl font-medium tracking-tight text-white">
                                DropDev
                            </span>
                        </div>
                        <span className="label-mono text-white/60">{contact.location}</span>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center gap-3 sm:items-start">
                        <span className="label-mono text-accent">Contact</span>
                        <a
                            href={`mailto:${contact.email}`}
                            className="text-base text-white/80 transition-colors hover:text-accent"
                        >
                            {contact.email}
                        </a>
                        <a
                            href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                            className="text-base text-white/80 transition-colors hover:text-accent"
                        >
                            {contact.phone}
                        </a>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col items-center gap-3 sm:items-start">
                        <span className="label-mono text-accent">Follow</span>
                        <ul className="flex items-center gap-3">
                            {socials.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        title={s.label}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-white/70 transition-colors hover:border-hairline-accent hover:text-accent"
                                    >
                                        <SocialIcon name={s.icon} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col items-center gap-3 sm:items-start">
                        <span className="label-mono text-accent">Legal</span>
                        {LEGAL.map((l) => (
                            <Link
                                key={l.to}
                                to={l.to}
                                className="text-base text-white/80 transition-colors hover:text-accent"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <p className="mt-12 border-t border-hairline pt-6 text-center font-mono text-sm text-white/60">
                    © {new Date().getFullYear()} Drop Dev
                </p>
            </div>
        </footer>
    );
}
