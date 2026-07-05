/*
 * On route/hash change: scroll to the #hash target if present (retrying
 * briefly while the destination page mounts), otherwise scroll to top.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.slice(1);
            let tries = 0;
            const attempt = () => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ block: 'start' });
                } else if (tries++ < 20) {
                    requestAnimationFrame(attempt);
                }
            };
            attempt();
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
