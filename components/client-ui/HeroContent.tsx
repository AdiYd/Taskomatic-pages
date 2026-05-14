'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface HeroContentProps {
  title: string;
  subtitle: string;
  cta: string;
  cta_secondary: string;
}

export function HeroContent({
  title,
  subtitle,
  cta,
  cta_secondary,
}: HeroContentProps) {
  return (
    <>
      {/* Floating particles - client-side animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20"
            initial={{
              x: (i * 50) % 1000,
              y: (i * 30) % 800,
            }}
            animate={{
              y: [(i * 30) % 800, (i * 30 + 200) % 800],
              x: [(i * 50) % 1000, (i * 50 + 100) % 1000],
            }}
            transition={{
              duration: 10 + (i % 10),
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl space-y-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium ring-1 ring-white/20 backdrop-blur-md"
          >
            <Sparkles className="text-warning h-4 w-4" />
            <span>The Next Generation of Digital Marketing</span>
            <Zap className="text-warning h-4 w-4" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gradient-primary text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl leading-relaxed opacity-90 md:text-2xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="gradient-secondary"
                size="lg"
                className="group shadow-xl hover:shadow-2xl"
              >
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                {cta}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg">
                {cta_secondary}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
