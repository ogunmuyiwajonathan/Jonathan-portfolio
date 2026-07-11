import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
    distance?: number;
    once?: boolean;
}

const directionMap: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
};

export default function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    distance = 40,
    once = true,
}: ScrollRevealProps) {
    const offset = directionMap[direction];
    const scale = direction === 'none' ? { x: 0.96, y: 0.96 } : { x: 1, y: 1 };

    const variants: Variants = {
        hidden: {
            opacity: 0,
            x: offset.x ? Math.sign(offset.x) * distance : 0,
            y: offset.y ? Math.sign(offset.y) * distance : 0,
            scale: scale.x,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-60px' }}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
