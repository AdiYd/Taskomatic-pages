'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToTopProps {
  /**
   * Bottom position from viewport bottom (Tailwind class value)
   * @default 'bottom-8'
   */
  bottom?: string;
  /**
   * Right position from viewport right (Tailwind class value)
   * @default 'right-8'
   */
  right?: string;
  /**
   * Number of screen heights to scroll before showing button
   * @default 2
   */
  showAfterScreens?: number;
}

export function ScrollToTop({
  bottom = 'bottom-8',
  right = 'right-8',
  showAfterScreens = 2,
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Calculate threshold based on screen heights
      const threshold = window.innerHeight * showAfterScreens;

      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Check initial scroll position
    toggleVisibility();

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfterScreens]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
          className={`z-fixed fixed ${bottom} ${right}`}
        >
          <Button
            onClick={scrollToTop}
            size="icon-xs"
            variant="ghost"
            className="glass shadow-glow-lg hover:shadow-glow z-999 transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
