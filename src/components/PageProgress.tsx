import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Particle type for the burst effect
interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
}

// Blue-themed particle colors (matches your accent palette)
const COLORS = ['#5b78f6', '#2ea9ff', '#a5b4fc', '#7c9eff', '#c3d0ff'];

function useParticles(trigger: number) {
    const [particles, setParticles] = useState<Particle[]>([]);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (trigger === 0) return;

        // Spawn particles along the top edge
        const newParticles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
            id: trigger * 100 + i,
            x: Math.random() * window.innerWidth,
            y: 2,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 2 + 1,
            size: Math.random() * 4 + 2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            life: 1,
        }));

        setParticles(newParticles);

        let frame = 0;
        const animate = () => {
            frame++;
            setParticles(prev =>
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        vy: p.vy + 0.08,
                        life: p.life - 0.025,
                    }))
                    .filter(p => p.life > 0)
            );
            if (frame < 60) rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [trigger]);

    return particles;
}

export default function PageProgress() {
    const location = useLocation();
    const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');
    const [key, setKey] = useState(0);
    const [particleTrigger, setParticleTrigger] = useState(0);
    const particles = useParticles(particleTrigger);

    useEffect(() => {
        setKey(k => k + 1);
        setPhase('loading');

        const completeTimer = setTimeout(() => {
            setPhase('done');
            setParticleTrigger(t => t + 1);
        }, 550);

        const idleTimer = setTimeout(() => setPhase('idle'), 1100);

        return () => {
            clearTimeout(completeTimer);
            clearTimeout(idleTimer);
        };
    }, [location.pathname]);

    return (
        <>
            {/* Particles canvas */}
            <AnimatePresence>
                {particles.map(p => (
                    <motion.div
                        key={p.id}
                        className="fixed z-[9999] pointer-events-none rounded-full"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            opacity: p.life,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                        }}
                        initial={{ scale: 1 }}
                        animate={{ scale: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                ))}
            </AnimatePresence>

            {/* Main bar */}
            <AnimatePresence mode="wait">
                {phase !== 'idle' && (
                    <motion.div
                        key={`bar-${key}`}
                        className="fixed top-0 left-0 right-0 z-[9998] pointer-events-none"
                        style={{ height: '3px' }}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
                    >
                        {/* Background track */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'rgba(91, 120, 246, 0.12)',
                            }}
                        />

                        {/* Main fill */}
                        <motion.div
                            className="absolute inset-y-0 left-0"
                            style={{
                                background: 'linear-gradient(90deg, #5b78f6 0%, #2ea9ff 50%, #a5b4fc 100%)',
                                boxShadow: '0 0 12px rgba(91, 120, 246, 0.7), 0 0 4px rgba(165, 180, 252, 0.9)',
                                transformOrigin: 'left',
                            }}
                            initial={{ scaleX: 0 }}
                            animate={
                                phase === 'loading'
                                    ? { scaleX: 0.85, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                                    : { scaleX: 1, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } }
                            }
                        />

                        {/* Shimmer sweep */}
                        {phase === 'loading' && (
                            <motion.div
                                className="absolute inset-y-0"
                                style={{
                                    width: '120px',
                                    background:
                                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                                    left: '-120px',
                                }}
                                animate={{ left: ['-120px', '100vw'] }}
                                transition={{
                                    duration: 0.9,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    repeatDelay: 0.2,
                                }}
                            />
                        )}

                        {/* Leading edge glow dot */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#2ea9ff',
                                boxShadow: '0 0 8px 3px rgba(91, 120, 246, 0.9)',
                                left: 0,
                                transformOrigin: 'left center',
                            }}
                            initial={{ left: '0%', opacity: 0 }}
                            animate={
                                phase === 'loading'
                                    ? { left: '85%', opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                                    : { left: '100%', opacity: [1, 0], transition: { duration: 0.18, ease: 'easeOut' } }
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner notch flash on complete */}
            <AnimatePresence>
                {phase === 'done' && (
                    <motion.div
                        key={`flash-${key}`}
                        className="fixed top-0 left-0 z-[9997] pointer-events-none"
                        style={{
                            width: '60px',
                            height: '60px',
                            background:
                                'radial-gradient(circle at top left, rgba(91,120,246,0.35) 0%, transparent 70%)',
                        }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.8 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}