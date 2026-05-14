'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface StaggerFadeProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function StaggerFade({
  children,
  delay = 0,
  staggerDelay = 0.1,
  direction = 'up',
  className,
}: StaggerFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up':
        return { x: 0, y: 30 };
      case 'down':
        return { x: 0, y: -30 };
      case 'left':
        return { x: 30, y: 0 };
      case 'right':
        return { x: -30, y: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: {
                opacity: 0,
                x: offset.x,
                y: offset.y,
                scale: 0.9,
              },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  damping: 12,
                  stiffness: 100,
                },
              },
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              scale: 0.9,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
              },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}
