import { PricingGrid } from '@/components/client-ui/PricingGrid';

// Pricing Section Content Configuration
const PRICING_CONTENT = {
  title: 'Choose The Plan That Fits You',
  subtitle:
    "Flexible plans for all business types. Need a different package? Let's talk 😊",
  plans: [
    {
      name: 'Organic',
      price: '₪425',
      period: '/month',
      description: 'For social media and organic growth',
      features: [
        'Official Instagram & Facebook API',
        'Auto-posting to Facebook groups',
        'AI content and media creation',
        'Intuitive interface for content creation',
        'Post likes option',
        'Statistics and recommendations',
        'WhatsApp channel with daily recommendations',
      ],
      cta: 'Start Now',
      highlighted: false,
    },
    {
      name: 'Premium Bundle',
      price: '₪799',
      period: '/month',
      badge: 'Most Popular',
      description: 'Complete solution - organic + paid',
      features: [
        'Premium AI & Meta API features',
        'Auto-posting to Facebook & Instagram',
        'Paid campaigns on Facebook & Instagram',
        'Extended AI package for content',
        'Weekly recommendations and tracking',
        'Technical support in Hebrew',
        'Smart WhatsApp AI agent for customer management',
      ],
      cta: 'Start Now',
      highlighted: true,
    },
    {
      name: 'Paid Advertising',
      price: '₪599',
      period: '/month',
      description: 'Focus on paid advertising',
      features: [
        'Official Meta Ads API',
        'Comprehensive business marketing strategy',
        'Professional campaign live within 48 hours',
        'AI package with advanced models',
        'Advanced campaign management interface',
        'WhatsApp channel for analysis and recommendations',
      ],
      cta: 'Start Now',
      highlighted: false,
    },
  ],
};

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

interface PricingProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

export function Pricing({
  title = PRICING_CONTENT.title,
  subtitle = PRICING_CONTENT.subtitle,
  plans = PRICING_CONTENT.plans,
}: PricingProps) {
  return (
    <section
      id="pricing"
      className="bg-muted/30 relative w-full overflow-hidden py-20 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-gradient-accent mb-4 text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            {subtitle}
          </p>
        </div>

        <PricingGrid plans={plans} />
      </div>
    </section>
  );
}
