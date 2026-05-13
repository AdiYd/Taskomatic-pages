import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PRICING_SECTION } from "@/lib/constants"
import { Check } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
}

interface PricingSectionProps {
  title?: string
  subtitle?: string
  plans?: PricingPlan[]
}

export function PricingSection({
  title = PRICING_SECTION.title,
  subtitle = PRICING_SECTION.subtitle,
  plans = PRICING_SECTION.plans,
}: PricingSectionProps) {
  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-slate-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${
                plan.highlighted ? "ring-2 ring-blue-500 shadow-lg" : ""
              }`}
            >
              {plan.highlighted && (
                <Badge className="w-fit mx-auto mt-4">הפופולרי ביותר</Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-slate-900">
                    {plan.price}
                  </div>
                  <div className="text-sm text-slate-600">{plan.period}</div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "default" : "outline"}
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
  )
}
