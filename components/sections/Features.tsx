import { FeaturesGrid } from '@/components/client-ui/FeaturesGrid';

// Features Section Content Configuration
const FEATURES_CONTENT = {
  title: 'All The Tools Your Business Needs to Grow Faster',
  subtitle:
    'An all-in-one platform combining advanced technological tools for managing your business marketing.',
  features: [
    {
      title: 'AI-Managed Paid Campaigns',
      description:
        'Automated system that runs, tests, and optimizes ads on social networks 24/7 to bring you the best ROI.',
      icon: '🎯',
    },
    {
      title: 'Automated Organic Social Marketing',
      description:
        'The system prepares customized content and automatically publishes it on Facebook groups, business pages, and Instagram.',
      icon: '📱',
    },
    {
      title: 'Professional Content Studio',
      description:
        'Produce images, copywriting, and converting videos with advanced AI models tailored to your brand voice.',
      icon: '🎨',
    },
    {
      title: 'Social Media Management',
      description:
        'Automatic and organic posting to Facebook groups, business pages, and Instagram from one central dashboard.',
      icon: '📊',
    },
    {
      title: 'WhatsApp AI Agent',
      description:
        'Autonomous bot that chats with your customers, provides service, and warms up leads around the clock.',
      icon: '💬',
    },
    {
      title: 'Analytics Dashboard',
      description:
        'Get clear insights and precise AI recommendations on how to improve your marketing in real-time.',
      icon: '📈',
    },
  ],
};

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export function Features({
  title = FEATURES_CONTENT.title,
  subtitle = FEATURES_CONTENT.subtitle,
  features = FEATURES_CONTENT.features,
}: FeaturesProps) {
  return (
    <section
      id="features"
      className="bg-gradient-radial relative w-full overflow-hidden py-20 md:py-32"
    >
      {/* Background pattern */}
      <div className="bg-grid-pattern absolute inset-0 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-50" />

      <div className="relative container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-gradient-primary mb-4 text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            {subtitle}
          </p>
        </div>

        <FeaturesGrid features={features} />
      </div>
    </section>
  );
}
