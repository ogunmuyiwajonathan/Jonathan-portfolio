import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = spotlightRef.current;
        if (!el) return;

        const onMove = (e: MouseEvent) => {
            el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(91, 120, 246, 0.07), transparent 60%)`;
        };

        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    return (
        <div
            ref={spotlightRef}
            className="pointer-events-none fixed inset-0 z-30 transition-all duration-300"
            aria-hidden="true"
        />
    );
}
