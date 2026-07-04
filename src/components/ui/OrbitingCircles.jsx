/*
 * Adapted from MagicUI — orbiting-circles
 * (research/components/magicui/orbiting-circles.tsx). JSX port; the orbit
 * keyframes/animation token live in index.css @theme. Children become moons
 * orbiting whatever the parent centers (here: a planet orb).
 */
import React from 'react';
import { cn } from '../../lib/utils';

export function OrbitingCircles({
    className,
    children,
    reverse,
    duration = 20,
    radius = 160,
    path = true,
    iconSize = 30,
    speed = 1,
    ...props
}) {
    const calculatedDuration = duration / speed;
    return (
        <>
            {path && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="pointer-events-none absolute inset-0 size-full"
                    aria-hidden="true"
                >
                    <circle
                        className="stroke-white/10"
                        strokeWidth="1"
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="none"
                    />
                </svg>
            )}
            {React.Children.map(children, (child, index) => {
                const angle = (360 / React.Children.count(children)) * index;
                return (
                    <div
                        style={{
                            '--duration': calculatedDuration,
                            '--radius': radius,
                            '--angle': angle,
                            '--icon-size': `${iconSize}px`,
                        }}
                        className={cn(
                            'animate-orbit absolute top-1/2 left-1/2 flex size-(--icon-size) -translate-x-1/2 -translate-y-1/2 transform-gpu items-center justify-center rounded-full',
                            { '[animation-direction:reverse]': reverse },
                            'motion-reduce:animate-none',
                            className
                        )}
                        {...props}
                    >
                        {child}
                    </div>
                );
            })}
        </>
    );
}
