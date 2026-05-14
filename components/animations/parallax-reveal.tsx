'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxRevealProps {
  children: ReactNode;
  speed?: number;
  rotate?: number;
  className?: string;
}

export function ParallaxReveal({
  children,
  speed = 50,
  rotate = 5,
  className,
}: ParallaxRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  // Rotation effect
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [rotate, 0, -rotate]);

  // Scale for depth
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1.05, 1.05, 0.9]);

  // Opacity fade in/out
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        opacity,
        rotateX,
        transformPerspective: 1000,
      }}
      className={className}
      data-framer-motion
    >
      {children}
    </motion.div>
  );
}
