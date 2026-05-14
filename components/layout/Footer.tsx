'use client';

import { SITE_NAME } from '@/lib/constants';
import { FOOTER_CONTENT } from './content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  const socialIcons = {
    twitter: 'ri:twitter-x-fill',
    linkedin: 'mdi:linkedin',
    github: 'mdi:github',
    discord: 'ic:baseline-discord',
  };

  return (
    <footer className="from-muted/30 to-background border-t bg-linear-to-b">
      <div className="mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section - Spans 2 columns */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="hover-lift group mb-4 inline-flex items-center gap-2"
            >
              <div className="bg-gradient-primary flex h-10 w-10 items-center justify-center rounded-lg shadow-md transition-all group-hover:shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-gradient-primary text-xl font-bold">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              {FOOTER_CONTENT.description}
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h4 className="text-foreground text-sm font-semibold">
                {FOOTER_CONTENT.newsletter.title}
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder={FOOTER_CONTENT.newsletter.placeholder}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className="flex-1"
                  required
                />
                <Button type="submit" size="icon-sm" className="shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-muted-foreground text-xs">
                {FOOTER_CONTENT.newsletter.description}
              </p>
            </div>
          </div>

          {/* Navigation Sections */}
          {FOOTER_CONTENT.sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground mb-4 text-sm font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary group inline-flex items-center text-sm transition-colors"
                    >
                      <span className="transition-transform group-hover:translate-x-1">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} {SITE_NAME}. {FOOTER_CONTENT.copyright.text}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {FOOTER_CONTENT.copyright.disclaimer}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {FOOTER_CONTENT.social.links.map((social) => {
                const iconName =
                  socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon-sm"
                    asChild
                    className=""
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon icon={iconName} className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
