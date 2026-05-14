'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturesGrid({ features }: FeaturesGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {features.map((feature) => (
        <motion.div key={feature.title} variants={item}>
          <Card className="group hover:border-primary relative h-full overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl">
            {/* Gradient overlay on hover */}
            <div className="bg-gradient-accent absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

            <CardHeader className="relative">
              <motion.div
                className="mb-4 inline-block"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="bg-gradient-primary flex h-16 w-16 items-center justify-center rounded-lg text-3xl shadow-lg">
                  {feature.icon}
                </div>
              </motion.div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
