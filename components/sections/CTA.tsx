import { CTAContent } from '@/components/client-ui/CTAContent';
import { ParallaxReveal } from '@/components/animations';

// CTA Section Content Configuration
const CTA_CONTENT = {
  title: 'Ready to Lead Your Marketing into the AI Era?',
  subtitle:
    'Join leading businesses saving time and money with the complete AI-powered marketing platform',
  cta: 'Start Trial Now',
  subcta: 'Trial Period • No Commitment • Cancel Anytime',
};

interface CTAProps {
  title?: string;
  subtitle?: string;
  cta?: string;
  subcta?: string;
}

export function CTA({
  title = CTA_CONTENT.title,
  subtitle = CTA_CONTENT.subtitle,
  cta = CTA_CONTENT.cta,
  subcta = CTA_CONTENT.subcta,
}: CTAProps) {
  return (
    <section className="blur-rotating-glow">
      <ParallaxReveal speed={0.5}>
        <CTAContent
          title={title}
          subtitle={subtitle}
          cta={cta}
          subcta={subcta}
        />
      </ParallaxReveal>
    </section>
  );
}
