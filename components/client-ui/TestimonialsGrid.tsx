'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
    >
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group bg-gradient-accent/5 hover:border-primary h-full overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <CardContent className="pt-6">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Quote className="text-primary mb-4 h-8 w-8" />
              </motion.div>
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-warning">
                    ★
                  </span>
                ))}
              </div>
              <p className="mb-6 text-sm">"{testimonial.quote}"</p>
              <div className="border-border border-t pt-4">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-muted-foreground text-xs">
                  {testimonial.role}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
