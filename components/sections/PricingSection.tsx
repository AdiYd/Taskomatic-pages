import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRICING_SECTION } from '@/lib/constants';
import { Check } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

export function PricingSection({
  title = PRICING_SECTION.title,
  subtitle = PRICING_SECTION.subtitle,
  plans = PRICING_SECTION.plans,
}: PricingSectionProps) {
  return (
    <section id="pricing" className="w-full bg-slate-50 py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${
                plan.highlighted ? 'shadow-lg ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.highlighted && (
                <Badge className="mx-auto mt-4 w-fit">הפופולרי ביותר</Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900">
                    {plan.price}
                  </div>
                  <div className="text-sm text-slate-600">{plan.period}</div>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
