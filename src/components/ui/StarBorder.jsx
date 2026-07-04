/*
 * Adapted from ReactBits — StarBorder (research/components/reactbits/star-border.jsx)
 * Ported to Tailwind (keyframes registered in index.css @theme as
 * --animate-star-top / --animate-star-bottom). Zero-dependency comet-trail CTA.
 */
import { cn } from '../../lib/utils';

export default function StarBorder({
    as: Component = 'button',
    className,
    color = '#a78bfa',
    speed = '6s',
    thickness = 1,
    children,
    ...rest
}) {
    return (
        <Component
            className={cn('relative inline-block overflow-hidden rounded-full', className)}
            style={{ padding: `${thickness}px 0`, ...rest.style }}
            {...rest}
        >
            <div
                className="animate-star-bottom absolute right-[-250%] bottom-[-12px] z-0 h-1/2 w-[300%] rounded-full opacity-70"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
                aria-hidden="true"
            />
            <div
                className="animate-star-top absolute top-[-12px] left-[-250%] z-0 h-1/2 w-[300%] rounded-full opacity-70"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
                aria-hidden="true"
            />
            <div className="relative z-10 rounded-full border border-hairline bg-space px-7 py-3.5 text-center font-mono text-sm tracking-wider text-white uppercase">
                {children}
            </div>
        </Component>
    );
}
