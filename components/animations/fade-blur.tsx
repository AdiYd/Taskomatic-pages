'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.5'],
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
        filter: useTransform(blurValue, value => `blur(${value}px)`),
      }}
      transition={{ duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
