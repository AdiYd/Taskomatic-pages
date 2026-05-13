import { Button } from '@/components/ui/button';
import { HERO_SECTION } from '@/lib/constants';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  cta_secondary?: string;
}

export function HeroSection({
  title = HERO_SECTION.title,
  subtitle = HERO_SECTION.subtitle,
  cta = HERO_SECTION.cta,
  cta_secondary = HERO_SECTION.cta_secondary,
}: HeroSectionProps) {
  return (
    <section className="w-full bg-linear-to-b from-blue-50 to-white py-20 md:py-32 lg:py-40">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h1 className="text-4xl leading-tight font-bold text-slate-900 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-xl leading-relaxed text-slate-600 md:text-2xl">
            {subtitle}
          </p>
          <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
            <Button size="lg" className="text-base">
              {cta}
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              {cta_secondary}
            </Button>
          </div>
        </div>

        <div className="mt-16 flex h-64 items-center justify-center overflow-hidden rounded-lg bg-slate-200 md:mt-24 md:h-96">
          <div className="text-center text-slate-500">
            <p className="text-lg">תמונת הדגמה</p>
            <p className="text-sm">1200x600px</p>
          </div>
        </div>
      </div>
    </section>
  );
}
