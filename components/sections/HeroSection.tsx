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
    <section className="w-full bg-gradient-to-b from-blue-600 to-blue-800 py-20 text-white md:py-32 lg:py-40">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <div className="mb-6 inline-block rounded-full bg-blue-500/30 px-6 py-2 text-sm font-medium backdrop-blur-sm">
            🚀 The Next Generation of Digital Marketing
          </div>

          <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="text-xl leading-relaxed text-blue-100 md:text-2xl">
            {subtitle}
          </p>

          <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
            <Button
              size="lg"
              className="bg-white text-lg text-blue-600 hover:bg-blue-50"
            >
              {cta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-lg text-white hover:bg-white/10"
            >
              {cta_secondary}
            </Button>
          </div>

          <p className="pt-4 text-sm text-blue-200">
            Trial Period • No Commitment • Cancel Anytime
          </p>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-16 flex items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-2xl backdrop-blur-sm md:mt-24">
          <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-700/20 md:h-96">
            <div className="text-center">
              <div className="mb-4 text-6xl">📊</div>
              <p className="text-lg font-medium">Dashboard Preview</p>
              <p className="text-sm text-blue-200">
                AI-Powered Marketing Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
