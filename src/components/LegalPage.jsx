/*
 * Shared renderer for the legal documents in data/legal.js (Privacy Policy,
 * Terms and Conditions).
 *
 * Legal copy needs to be read, not skimmed, so this page drops the galaxy
 * scrollytelling entirely: a fixed measure, generous line height, 17px body
 * text, and a sticky table of contents on desktop. The starfield still sits
 * behind it via Layout, but content sits on its own quiet panel so the text
 * never competes with moving stars.
 */
import { Link } from 'react-router-dom';
import Reveal from './ui/Reveal';

// Inline markup: **bold**, *italic*, and [label](href).
const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function Inline({ text }) {
    return text.split(INLINE).map((part, i) => {
        if (!part) return null;

        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={i} className="font-medium text-white">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
            const [, label, href] = link;
            const cls =
                'text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60';

            // Same-page anchor
            if (href.startsWith('#')) {
                return (
                    <a key={i} href={href} className={cls}>
                        {label}
                    </a>
                );
            }
            // Internal route
            if (href.startsWith('/')) {
                return (
                    <Link key={i} to={href} className={cls}>
                        {label}
                    </Link>
                );
            }
            // mailto / tel stay in place; everything else opens in a new tab
            const external = !/^(mailto:|tel:)/.test(href);
            return (
                <a
                    key={i}
                    href={href}
                    className={cls}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                    {label}
                </a>
            );
        }

        return <span key={i}>{part}</span>;
    });
}

function Block({ block }) {
    switch (block.type) {
        case 'h3':
            return (
                <h3 className="mt-12 mb-5 text-2xl font-medium tracking-tight text-white first:mt-0">
                    <Inline text={block.text} />
                </h3>
            );

        case 'short':
            return (
                <div className="my-7 rounded-2xl border border-hairline-accent bg-accent/8 px-6 py-5">
                    <p className="label-mono mb-2 text-accent">In Short</p>
                    <p className="text-[17px] leading-relaxed text-white/80">
                        <Inline text={block.text} />
                    </p>
                </div>
            );

        case 'ul':
            return (
                <ul className="my-6 space-y-4">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-4">
                            <span
                                aria-hidden="true"
                                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                            />
                            <span className="text-[17px] leading-relaxed text-white/75">
                                <Inline text={item} />
                            </span>
                        </li>
                    ))}
                </ul>
            );

        case 'p':
        default:
            return (
                <p
                    className={
                        block.caps
                            ? 'my-6 text-[15px] leading-relaxed whitespace-pre-line text-white/65'
                            : 'my-6 text-[17px] leading-relaxed whitespace-pre-line text-white/75'
                    }
                >
                    <Inline text={block.text} />
                </p>
            );
    }
}

export default function LegalPage({ doc }) {
    return (
        <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-32 sm:pt-44">
            {/* Header */}
            <header className="mb-14 border-b border-hairline pb-12">
                <Reveal>
                    <p className="label-mono mb-6 text-accent">Legal</p>
                </Reveal>
                <Reveal delay={0.05}>
                    <h1 className="text-4xl font-medium tracking-tight text-balance sm:text-6xl">
                        {doc.title}
                    </h1>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-6 text-lg text-white/60">
                        {doc.updatedLabel} {doc.updated}
                    </p>
                </Reveal>
            </header>

            <div className="grid gap-14 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
                {/* Table of contents */}
                <nav aria-label="Contents" className="lg:sticky lg:top-32 lg:self-start">
                    <p className="label-mono mb-5 text-white/60">Contents</p>
                    <ul className="space-y-3 border-l border-hairline pl-5">
                        {doc.sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="block text-[15px] leading-snug text-white/65 transition-colors hover:text-accent"
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Document body */}
                <article className="min-w-0 max-w-[68ch]">
                    {doc.intro.length > 0 && (
                        <div className="mb-14 border-b border-hairline pb-6">
                            {doc.intro.map((block, i) => (
                                <Block key={i} block={block} />
                            ))}
                        </div>
                    )}

                    {doc.sections.map((section) => (
                        <section key={section.id} id={section.id} className="mb-16 scroll-mt-32">
                            <h2 className="mb-6 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                                {section.title}
                            </h2>
                            {section.blocks.map((block, i) => (
                                <Block key={i} block={block} />
                            ))}
                        </section>
                    ))}
                </article>
            </div>
        </div>
    );
}
