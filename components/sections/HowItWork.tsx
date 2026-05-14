import { StepsGrid } from '@/components/client-ui/StepsGrid';
import { SlideScale } from '@/components/animations';

// How It Works Section Content Configuration
const HOW_IT_WORKS_CONTENT = {
  title: 'How It Works?',
  subtitle: 'Four simple steps to success in digital marketing',
  steps: [
    {
      number: '1',
      title: 'Registration & Business Setup',
      description: 'Quick registration and business profile setup',
    },
    {
      number: '2',
      title: 'Connect Platforms',
      description:
        'Connect Facebook, Instagram, ad accounts, and WhatsApp - all in one place',
    },
    {
      number: '3',
      title: 'Create Campaigns with AI',
      description:
        'AI creates strategy, content, designs, and complete customized campaigns',
    },
    {
      number: '4',
      title: 'Publish & See Results',
      description:
        'Publish paid or organic campaigns and view data in real-time',
    },
  ],
};

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

export function HowItWorks({
  title = HOW_IT_WORKS_CONTENT.title,
  subtitle = HOW_IT_WORKS_CONTENT.subtitle,
  steps = HOW_IT_WORKS_CONTENT.steps,
}: HowItWorksProps) {
  return (
    <section id="how-it-works" className="bg-background clip-wave-bottom">
      <div className="container mx-auto max-w-6xl px-4">
        <SlideScale>
          <div className="mb-16 text-center">
            <h2 className="text-gradient-secondary mb-4 text-3xl font-bold md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              {subtitle}
            </p>
          </div>

          <StepsGrid steps={steps} />
        </SlideScale>
      </div>
    </section>
  );
}
