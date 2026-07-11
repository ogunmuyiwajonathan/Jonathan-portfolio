import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function CountUp({
    end,
    duration = 2,
    suffix = '',
    prefix = '',
    className = '',
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = (now - startTime) / (duration * 1000);
            const progress = Math.min(elapsed, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [isInView, end, duration]);

    return (
        <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
            {prefix}{count}{suffix}
        </span>
    );
}
