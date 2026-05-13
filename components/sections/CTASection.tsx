import { Button } from '@/components/ui/button';
import { CTA_SECTION } from '@/lib/constants';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  cta?: string;
}

export function CTASection({
  title = CTA_SECTION.title,
  subtitle = CTA_SECTION.subtitle,
  cta = CTA_SECTION.cta,
}: CTASectionProps) {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-20 md:py-32">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="text-xl text-blue-50">{subtitle}</p>
          <Button size="lg" variant="secondary" className="text-base">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
