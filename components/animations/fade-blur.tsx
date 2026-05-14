'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface FadeBlurProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  blur?: number;
  duration?: number;
  className?: string;
}

export function FadeBlur({
  children,
  direction = 'up',
  blur = 10,
  duration = 0.6,
  className,
}: FadeBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Mobile-first: start with true

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: ULTRA-fast animation that completes as soon as element is visible
  // Desktop: smoother progression
  const offset: ['start end', 'start 0.7'] | ['start 0.85', 'start 0.5'] =
    isMobile ? ['start end', 'start 0.7'] : ['start 0.85', 'start 0.5'];

  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  });

  // Calculate movement based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { x: 0, y: 40 };
      case 'down':
        return { x: 0, y: -40 };
      case 'left':
        return { x: 40, y: 0 };
      case 'right':
        return { x: -40, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  const x = useTransform(scrollYProgress, [0, 1], [initialPos.x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [initialPos.y, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 1], [blur, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        opacity,
        scale,
        filter: useTransform(blurValue, (value) => `blur(${value}px)`),
      }}
      transition={{ duration, ease: 'easeOut' }}
      className={className}
      data-framer-motion
    >
      {children}
    </motion.div>
  );
}
