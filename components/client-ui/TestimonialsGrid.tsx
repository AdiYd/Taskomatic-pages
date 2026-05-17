'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from '@/components/ui/carousel';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

const googleGradientsColors = [
  'from-blue-500 to-cyan-500',
  'from-red-500 to-orange-500',
  'from-yellow-500 to-amber-500',
  'from-green-500 to-emerald-500',
];

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="mx-auto w-full max-w-7xl overflow-visible *:overflow-visible"
    >
      <CarouselContent>
        {testimonials.slice(0, 4).map((testimonial, index) => (
          <CarouselItem
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            key={index}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: (index % 4) * 0.1,
                type: 'spring',
                stiffness: 120,
              }}
              className="h-full"
            >
              <Card className="bg-card/60 group relative h-full overflow-hidden backdrop-blur-[200px] transition-all duration-300 hover:shadow-lg">
                {/* Animated gradient background */}
                <div className="from-primary/5 to-accent/5 absolute inset-0 bg-linear-to-br via-transparent opacity-0 group-hover:opacity-100" />

                {/* Quote icon decoration */}
                <motion.div
                  className="absolute top-4 right-4 opacity-10"
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <Quote className="text-primary h-12 w-12" />
                </motion.div>

                <CardHeader className="relative">
                  <div className="mb-4 flex items-center gap-4">
                    <motion.div
                      className="from-primary to-primary/50 text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br font-bold shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {testimonial.name.charAt(0)}
                    </motion.div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + i * 0.1,
                        }}
                        whileHover={{ scale: 1.3, rotate: 360 }}
                      >
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <motion.p
                    className="text-muted-foreground italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </motion.p>
                </CardContent>

                {/* Bottom accent */}
                <div
                  className={cn(
                    'absolute right-0 bottom-0 left-0 h-1 bg-linear-to-r opacity-30',
                    googleGradientsColors[index % googleGradientsColors.length]
                  )}
                />
              </Card>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12" />
      <CarouselNext className="hidden md:flex -right-4 lg:-right-12" /> */}
      <CarouselDots className="mt-8" />
    </Carousel>
  );
}
