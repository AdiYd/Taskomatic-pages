import { HeroContent } from '@/components/client-ui/HeroContent';

// Hero Section Content Configuration
const HERO_CONTENT = {
  title: 'AI-Managed Marketing That Initiates, Creates, Publishes & Optimizes',
  subtitle:
    'The next generation of digital marketing. All the tools your business needs to grow faster with AI automation.',
  cta: 'Start Now',
  cta_secondary: 'See How It Works',
};

interface HeroProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  cta_secondary?: string;
}

export function Hero({
  title = HERO_CONTENT.title,
  subtitle = HERO_CONTENT.subtitle,
  cta = HERO_CONTENT.cta,
  cta_secondary = HERO_CONTENT.cta_secondary,
}: HeroProps) {
  return (
    <section className="text-foreground relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
      {/* Animated gradient overlay */}
      <div className="bg-gradient-radial absolute inset-0 opacity-50" />

      <HeroContent
        title={title}
        subtitle={subtitle}
        cta={cta}
        cta_secondary={cta_secondary}
      />
    </section>
  );
}
