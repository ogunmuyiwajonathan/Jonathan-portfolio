import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/** Below this container width the marquee runs slower, so small screens stay legible. */
const MOBILE_BREAKPOINT = 640;
const MOBILE_SPEED = 35;
const DESKTOP_SPEED = 50;

/** Hard ceiling so a mis-measurement can never render an unbounded number of nodes. */
const MAX_COPIES = 8;

interface MarqueeProps {
    children: ReactNode;
    /** Pixels per second. Defaults to 35 under 640px, 50 at or above it. */
    speed?: number;
    /** Scroll right-to-left instead of left-to-right. */
    reverse?: boolean;
    /** Freeze the scroll while the pointer is over the strip. */
    pauseOnHover?: boolean;
    /** Extra classes for the overflow-hidden viewport. */
    className?: string;
}

/**
 * Infinite horizontal marquee.
 *
 * The track holds two identical halves, each containing `copies` groups. That
 * nesting is what keeps the loop seamless: the keyframe shifts by 50% of the
 * track, and 50% of the track is exactly one half no matter how many copies a
 * half holds. A flat run of groups would make 50% land mid-group and the seam
 * would jump.
 *
 * Each group carries `pr-8` to match its `gap-8`, so the gap across the seam is
 * indistinguishable from the gap between items inside a group.
 */
export default function Marquee({
    children,
    speed,
    reverse = false,
    pauseOnHover = false,
    className = '',
}: MarqueeProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);
    const [copies, setCopies] = useState(2);

    /**
     * Returns false when the group has not laid out yet, so callers can leave
     * --marquee-duration at its CSS fallback instead of dividing by zero.
     */
    const measure = useCallback((): boolean => {
        const viewport = viewportRef.current;
        const group = groupRef.current;
        if (!viewport || !group) return false;

        const groupWidth = group.getBoundingClientRect().width;
        const containerWidth = viewport.getBoundingClientRect().width;
        if (groupWidth <= 0 || containerWidth <= 0) return false;

        const resolvedSpeed =
            speed ?? (containerWidth < MOBILE_BREAKPOINT ? MOBILE_SPEED : DESKTOP_SPEED);

        const needed = Math.max(2, Math.ceil(containerWidth / groupWidth) + 1);
        const halfCopies = Math.min(MAX_COPIES, needed);
        setCopies(halfCopies);

        // The keyframe travels 50% of the track, and 50% of the track is exactly
        // one half, so the distance covered per cycle is halfWidth -- not
        // groupWidth. Dividing groupWidth by the speed would make the strip run
        // halfCopies times too fast, and faster still on wider screens that need
        // more copies, which is the opposite of a consistent reading speed.
        const halfWidth = groupWidth * halfCopies;
        viewport.style.setProperty('--marquee-duration', `${halfWidth / resolvedSpeed}s`);
        return true;
    }, [speed]);

    // Layout effect so the duration and copy count are correct before first
    // paint. A plain effect would paint one frame with the 25s fallback.
    useLayoutEffect(() => {
        measure();

        const viewport = viewportRef.current;
        const group = groupRef.current;
        if (!viewport || !group) return;

        const observer = new ResizeObserver(() => {
            measure();
        });
        observer.observe(viewport);
        observer.observe(group);

        // ResizeObserver is the primary trigger. The window listener is a
        // fallback for environments where element resize notifications are not
        // delivered, and costs one listener per marquee instance.
        const onWindowResize = () => {
            measure();
        };
        window.addEventListener('resize', onWindowResize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', onWindowResize);
        };
    }, [measure, copies]);

    // Webfonts can settle after the first measure and change the group's width.
    // The ResizeObserver normally catches that, but only if it is already
    // observing when the swap happens, so re-measure once fonts are ready.
    useEffect(() => {
        let cancelled = false;
        const fonts = document.fonts;
        if (!fonts?.ready) return;

        fonts.ready.then(() => {
            if (!cancelled) measure();
        });

        return () => {
            cancelled = true;
        };
    }, [measure]);

    const trackClassName = [
        'flex w-max shrink-0 items-center will-change-transform',
        reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div ref={viewportRef} data-marquee-viewport="" className={`overflow-hidden ${className}`}>
            <div className={trackClassName} data-marquee-track="">
                {[0, 1].map((halfIndex) => (
                    <div
                        key={halfIndex}
                        data-marquee-half={halfIndex}
                        aria-hidden={halfIndex === 1 || undefined}
                        className="flex shrink-0"
                    >
                        {Array.from({ length: copies }, (_, groupIndex) => (
                            <div
                                key={groupIndex}
                                ref={halfIndex === 0 && groupIndex === 0 ? groupRef : undefined}
                                data-marquee-group={groupIndex}
                                className="flex shrink-0 items-center gap-8 pr-8"
                            >
                                {children}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}