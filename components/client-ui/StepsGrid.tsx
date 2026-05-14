'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepsGridProps {
  steps: Step[];
}

export function StepsGrid({ steps }: StepsGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
    >
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative flex flex-col items-center text-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative mb-6"
          >
            <div className="bg-gradient-primary absolute inset-0 rounded-full opacity-20 blur-xl" />
            <div className="bg-gradient-secondary relative flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold text-white shadow-2xl">
              {step.number}
            </div>
          </motion.div>

          <h3 className="text-foreground mb-3 text-xl font-semibold">
            {step.title}
          </h3>
          <p className="text-muted-foreground">{step.description}</p>

          {/* Animated connecting arrow (except for last item) */}
          {index < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="absolute top-10 right-0 hidden translate-x-1/2 lg:block"
            >
              <ArrowRight className="text-primary h-8 w-8" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
