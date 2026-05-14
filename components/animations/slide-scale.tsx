'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface SlideScaleProps {
  children: ReactNode;
  slideOutput?: [number, number, number];
  scaleOutput?: [number, number, number];
  className?: string;
}

export function SlideScale({
  children,
  slideOutput = [50, 0, -50],
  scaleOutput = [0.8, 1.05, 0.8],
  className,
}: SlideScaleProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1'], // Animation starts at entry, ends at exit
  });

  const slideIn = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 1],
    [slideOutput[0], slideOutput[1], slideOutput[1], slideOutput[2]]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 1],
    [scaleOutput[0], scaleOutput[1], scaleOutput[1], scaleOutput[2]]
  );

  return (
    <motion.div ref={ref} style={{ y: slideIn, scale }} className={className}>
      {children}
    </motion.div>
  );
}
