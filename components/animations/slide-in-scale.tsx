'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface SlideScaleProps {
  children: ReactNode;
  slideOutput?: [number, number];
  scaleOutput?: [number, number];
  className?: string;
}

export function SlideInScale({
  children,
  slideOutput = [-50, 0],
  scaleOutput = [0.8, 1.0],
  className,
}: SlideScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Mobile-first: start with true

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: ULTRA-fast animation that completes as soon as element is visible
  // Desktop: more dramatic effect with longer scroll
  const offset: ['start end', 'start 0.7'] | ['start 0.95', 'start 0.6'] =
    isMobile
      ? ['start end', 'start 0.7'] // Mobile: completes when element is just 30% visible
      : ['start 0.95', 'start 0.6']; // Desktop: more scroll for dramatic effect

  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  });

  // Mobile: full animation progression, desktop: smoother
  const slideProgress = isMobile ? [0, 1] : [0, 0.5];
  const scaleProgress = isMobile ? [0, 1] : [0, 0.7];

  const slideIn = useTransform(scrollYProgress, slideProgress, [
    slideOutput[0],
    slideOutput[1],
  ]);
  const scale = useTransform(scrollYProgress, scaleProgress, [
    scaleOutput[0],
    scaleOutput[1],
  ]);

  return (
    <motion.div
      ref={ref}
      style={{ y: slideIn, scale }}
      className={className}
      data-framer-motion // Prevent CSS interference
    >
      {children}
    </motion.div>
  );
}
