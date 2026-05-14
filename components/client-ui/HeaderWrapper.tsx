'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeaderWrapperProps {
  children: React.ReactNode;
  /**
   * Number of screen heights to scroll before hiding header
   * @default 2
   */
  hideAfterScreens?: number;
  className?: string;
}

export function HeaderWrapper({
  children,
  hideAfterScreens = 2,
  className,
}: HeaderWrapperProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll({ layoutEffect: false });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const currentScrollY = latest;
    const threshold = window.innerHeight * hideAfterScreens;

    // Check if at top
    setIsAtTop(currentScrollY < 100);

    // Only apply hide/show logic if past threshold
    if (currentScrollY < threshold) {
      setIsVisible(true);
    } else {
      // Detect scroll direction
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      // Only trigger if scroll delta is significant (prevents jitter)
      if (scrollDelta > 10) {
        setIsVisible(!isScrollingDown);
      }
    }

    lastScrollY.current = currentScrollY;
  });

  return (
    <motion.div
      initial={false}
      animate={{
        y: isVisible ? 0 : -100,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className={cn('fixed top-0 z-50 w-full', className)}
    >
      {children}
    </motion.div>
  );
}
