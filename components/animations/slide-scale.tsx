'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

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
  const [isMobile, setIsMobile] = useState(true); // Mobile-first: start with true

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: ULTRA-fast animation that completes as soon as element is visible
  // Desktop: longer scroll range for dramatic effect
  const offset: ['start end', 'start 0.7'] | ['start 0.9', 'end 0.1'] = isMobile
    ? ['start end', 'start 0.7']
    : ['start 0.9', 'end 0.1'];

  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
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
    <motion.div
      ref={ref}
      style={{ y: slideIn, scale }}
      className={className}
      data-framer-motion
    >
      {children}
    </motion.div>
  );
}
