import { Button } from '@/components/ui/button';
import { SITE_NAME } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme-toggle';
import { HEADER_CONTENT } from './content';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="glass z-fixed sticky top-0 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="hover-lift group flex items-center gap-2">
          <div className="bg-gradient-primary flex h-9 w-9 items-center justify-center rounded-lg shadow-md transition-all group-hover:shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-gradient-primary text-2xl font-bold">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {HEADER_CONTENT.navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary rounded-button hover:bg-muted px-4 py-2 text-sm font-medium transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="ghost-primary"
            size="sm"
            asChild
            className="hidden sm:inline-flex"
          >
            <Link href={HEADER_CONTENT.cta.secondary.href}>
              {HEADER_CONTENT.cta.secondary.label}
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={HEADER_CONTENT.cta.primary.href}>
              {HEADER_CONTENT.cta.primary.label}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
