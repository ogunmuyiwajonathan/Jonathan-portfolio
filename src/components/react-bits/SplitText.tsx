import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string } | { opacity: number; y: number };
  animationTo?: { opacity: number; transform: string } | { opacity: number; y: number };
  easing?: string | ((t: number) => number);
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stagger?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 100,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
  stagger = 0,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const letters = text.split('');
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next: any) => {
          await next(animationTo);
          animatedCount.current += 1;
          if (animatedCount.current === letters.length && onAnimationComplete) {
            onAnimationComplete();
          }
        }
        : animationFrom,
      delay: i * stagger + delay,
      config: { easing: easing as any } as any,
    }))
  );

  return (
    <span ref={ref} className={`split-text ${className} inline-block`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={props}
          className="inline-block transition-transform will-change-[transform,opacity]"
        >
          {letters[index] === ' ' ? '\u00A0' : letters[index]}
        </animated.span>
      ))}
    </span>
  );
};

export default SplitText;
