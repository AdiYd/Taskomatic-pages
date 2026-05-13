export const SITE_NAME = 'Taskomatic';
export const SITE_URL = 'https://taskomatic.net';
export const SITE_DESCRIPTION =
  'AI-Powered Digital Marketing Platform - Automate Your Marketing';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO_SECTION = {
  title: 'AI-Managed Marketing That Initiates, Creates, Publishes & Optimizes',
  subtitle:
    'The next generation of digital marketing. All the tools your business needs to grow faster with AI automation.',
  cta: 'Start Now',
  cta_secondary: 'See How It Works',
};

export const FEATURES_SECTION = {
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

export const HOW_IT_WORKS = {
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

export const PRICING_SECTION = {
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

export const TESTIMONIALS_SECTION = {
  title: 'What Our Customers Say',
  subtitle: 'Hundreds of satisfied customers already use Taskomatic',
  testimonials: [
    {
      quote:
        'The product completely changed the way we work. I manage to save hours of work every week!',
      author: 'Yossi Cohen',
      role: 'Real Estate Agent Business Owner',
    },
    {
      quote:
        'The ability to manage all processes in parallel is simply amazing. Our lead volume increased by 40% in the first month!',
      author: 'Ronit Levi',
      role: 'Content Manager at Startup',
    },
    {
      quote:
        'The system helps me manage my marketing independently and generate results without needing an expensive professional.',
      author: 'Avi Goldstein',
      role: 'Self-Employed',
    },
    {
      quote:
        'The time saved by automating processes allowed me to focus on improving products and service. Thank you!',
      author: 'Michal Barak',
      role: 'Online Store Owner',
    },
  ],
};

export const FAQ_SECTION = {
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

export const CTA_SECTION = {
  title: 'Ready to Lead Your Marketing into the AI Era?',
  subtitle:
    'Join leading businesses saving time and money with the complete AI-powered marketing platform',
  cta: 'Start Trial Now',
  subcta: 'Trial Period • No Commitment • Cancel Anytime',
};

export const FOOTER = {
  description:
    'Advanced AI solution for smart marketing on Facebook. Save time, increase exposure, and reach a wider target audience.',
  links: {
    product: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  contact: {
    email: 'info@taskomatic.net',
    phone: '+972-555-074146',
  },
  copyright: '© 2026 Taskomatic. All rights reserved.',
};
