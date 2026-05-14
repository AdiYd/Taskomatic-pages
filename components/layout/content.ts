/**
 * Header & Footer Content Configuration
 * Centralized content management for layout components
 */

export const HEADER_CONTENT = {
  navigation: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: {
    primary: {
      label: 'Get Started',
      href: '/signup',
    },
    secondary: {
      label: 'Sign In',
      href: '/login',
    },
  },
};

export const FOOTER_CONTENT = {
  tagline: 'Automate your marketing with AI-powered precision',
  description:
    'Transform your digital marketing strategy with intelligent automation. Save time, boost performance, and grow your business effortlessly.',
  sections: [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Testimonials', href: '#testimonials' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        // { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Security', href: '/security' },
      ],
    },
  ],
  social: {
    title: 'Connect With Us',
    links: [
      {
        label: 'Twitter',
        href: 'https://twitter.com/taskomatic',
        icon: 'twitter',
      },
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/company/taskomatic',
        icon: 'linkedin',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/taskomatic',
        icon: 'github',
      },
      {
        label: 'Discord',
        href: 'https://discord.gg/taskomatic',
        icon: 'discord',
      },
    ],
  },
  newsletter: {
    title: 'Stay Updated',
    description: 'Get the latest marketing tips and product updates.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },
  copyright: {
    text: 'All rights reserved.',
    disclaimer: 'Built with precision and care for modern marketing teams.',
  },
};
