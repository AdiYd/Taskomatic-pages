import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FEATURES_SECTION } from '@/lib/constants';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export function FeaturesSection({
  title = FEATURES_SECTION.title,
  subtitle = FEATURES_SECTION.subtitle,
  features = FEATURES_SECTION.features,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="w-full bg-white py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 text-4xl">{feature.icon}</div>
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
  );
}
