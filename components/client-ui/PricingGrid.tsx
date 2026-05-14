'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

interface PricingGridProps {
  plans: PricingPlan[];
}

export function PricingGrid({ plans }: PricingGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card
            className={`group relative z-50 flex h-full flex-col backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
              plan.highlighted
                ? 'border-primary from-primary/5 scale-105 border-2 bg-linear-to-b shadow-2xl'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                <Badge className="bg-gradient-secondary flex items-center gap-1 px-4 py-1.5 text-sm font-semibold shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </Badge>
              </div>
            )}

            <CardHeader className="pt-10">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col">
              <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-accent text-5xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-lg">
                    {plan.period}
                  </span>
                </div>
              </motion.div>

              <ul className="mb-8 flex-1 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1 + featureIndex * 0.05,
                    }}
                    className="flex items-start gap-3"
                  >
                    <Check className="text-success mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={plan.highlighted ? 'main' : 'main-outline'}
                  size="lg"
                  className={`w-full ${
                    plan.highlighted ? 'hover:opacity-90' : ''
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
