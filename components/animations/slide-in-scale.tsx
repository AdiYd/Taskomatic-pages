'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface SlideScaleProps {
  children: ReactNode;
  slideOutput?: [number, number];
  scaleOutput?: [number, number];
  className?: string;
}

export function SlideInScale({
  children,
  slideOutput = [50, 0],
  scaleOutput = [0.8, 1.05],
  className,
}: SlideScaleProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5'], // Animation triggers when element enters viewport
  });

  const slideIn = useTransform(scrollYProgress, [0, 0.2], [slideOutput[0], slideOutput[1]]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [scaleOutput[0], scaleOutput[1]]);

  return (
    <motion.div ref={ref} style={{ y: slideIn, scale }} className={className}>
      {children}
    </motion.div>
  );
}
