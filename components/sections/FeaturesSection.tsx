import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FEATURES_SECTION } from "@/lib/constants"

interface Feature {
  title: string
  description: string
  icon: string
}

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}

export function FeaturesSection({
  title = FEATURES_SECTION.title,
  subtitle = FEATURES_SECTION.subtitle,
  features = FEATURES_SECTION.features,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="w-full py-20 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
