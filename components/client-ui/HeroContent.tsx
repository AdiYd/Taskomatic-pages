'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronsDown } from 'lucide-react';

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
      <div className="relative z-10 container mx-auto max-w-6xl px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto space-y-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium ring-1 ring-white/20 backdrop-blur-md"
          >
            <span>The Next Gen of Digital Marketing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gradient-primary leading-tight font-bold"
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
                {cta}
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg">
                {cta_secondary}
              </Button>
            </motion.div>
          </motion.div>
          {/* Double arrow down animation */}
          <motion.div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
            <ChevronsDown className="text-muted-foreground size-10 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
