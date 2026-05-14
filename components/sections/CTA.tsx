import { CTAContent } from '@/components/client-ui/CTAContent';

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
    <section className="bg-gradient-accent relative w-full overflow-hidden py-20 text-white md:py-32">
      {/* Animated background */}
      <div className="bg-gradient-radial absolute inset-0 opacity-50" />

      <CTAContent title={title} subtitle={subtitle} cta={cta} subcta={subcta} />
    </section>
  );
}
