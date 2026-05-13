import { Button } from '@/components/ui/button';
import { CTA_SECTION } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  subcta?: string;
}

export function CTASection({
  title = CTA_SECTION.title,
  subtitle = CTA_SECTION.subtitle,
  cta = CTA_SECTION.cta,
  subcta = CTA_SECTION.subcta,
}: CTASectionProps) {
  return (
    <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 md:py-32">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="space-y-8 text-center">
          <div className="mx-auto mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            🚀 Ready to Get Started?
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-xl text-blue-50">{subtitle}</p>
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-white text-lg text-blue-600 hover:bg-blue-50"
            >
              {cta}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-blue-200">{subcta}</p>
        </div>
      </div>
    </section>
  );
}
