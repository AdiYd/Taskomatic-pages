import { FAQAccordion } from '@/components/client-ui/FAQAccordion';

// FAQ Section Content Configuration
const FAQ_CONTENT = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you wanted to know about Taskomatic',
  faqs: [
    {
      question: 'How does Taskomatic work?',
      answer:
        'Taskomatic is an AI-powered marketing automation platform. After quick registration and connecting your social accounts, the AI creates customized content, strategies, and campaigns that automatically publish and optimize for best results.',
    },
    {
      question: 'How does the AI create content tailored to my business?',
      answer:
        'Our AI learns your business, target audience, competitors, and brand voice. It then uses advanced models (GPT, Claude, Gemini) to generate professional content, images, and copy that matches your brand perfectly.',
    },
    {
      question: 'How do I publish paid content?',
      answer:
        'After connecting your Meta Ads account, our AI creates complete campaigns with targeting, budgets, and creatives. The system automatically optimizes campaigns 24/7 for maximum ROI.',
    },
    {
      question: 'How do I publish organic content?',
      answer:
        'Simply connect your Facebook and Instagram accounts. The AI will create content and automatically post to your business pages, groups, and Instagram according to your schedule.',
    },
    {
      question: 'What is the WhatsApp AI agent?',
      answer:
        'An autonomous chatbot that connects to your WhatsApp Business account, chats with customers, answers questions, qualifies leads, and provides service 24/7 without your intervention.',
    },
    {
      question: 'Do I need technical knowledge?',
      answer:
        'Not at all! Taskomatic is designed to be simple and intuitive. The AI handles all the complex technical aspects while you focus on growing your business.',
    },
    {
      question: 'Can I edit content before publishing?',
      answer:
        'Absolutely! You have full control. The AI generates suggestions, but you can edit, approve, or modify any content before it goes live.',
    },
    {
      question: 'How much time and money can I save with Taskomatic?',
      answer:
        'On average, users save 15-20 hours per week on marketing tasks and reduce costs by 40-60% compared to hiring marketing professionals or agencies.',
    },
  ],
};

interface FAQ {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQ[];
}

export function FAQ({
  title = FAQ_CONTENT.title,
  subtitle = FAQ_CONTENT.subtitle,
  faqs = FAQ_CONTENT.faqs,
}: FAQProps) {
  return (
    <section
      id="faq"
      className="bg-gradient-radial relative w-full overflow-hidden py-20 md:py-32"
    >
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-gradient-primary mb-4 text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-xl">{subtitle}</p>
        </div>

        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
