'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SITE_NAME } from '@/lib/constants';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { HEADER_CONTENT } from './content';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="glass w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="hover-lift group flex items-center gap-2">
          <span className="text-gradient-primary text-2xl font-bold">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {HEADER_CONTENT.navigation.map((link) => (
            <Button
              key={link.href}
              asChild
              size="sm"
              variant="link"
              className="hover:no-underline"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:inline-flex"
          >
            <Link href={HEADER_CONTENT.cta.secondary.href}>
              {HEADER_CONTENT.cta.secondary.label}
            </Link>
          </Button>
          <Button size="sm" asChild className="hidden md:inline-flex">
            <Link href={HEADER_CONTENT.cta.primary.href}>
              {HEADER_CONTENT.cta.primary.label}
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <span className="text-gradient-primary text-2xl font-bold">
                    {SITE_NAME}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col space-y-4">
                {/* Navigation Links */}
                <nav className="flex flex-col space-y-2">
                  {HEADER_CONTENT.navigation.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="text-foreground hover:text-primary hover:bg-accent rounded-md px-3 py-2 text-lg font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* CTA Buttons */}
                <div className="border-t pt-4">
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="w-full"
                    >
                      <Link
                        href={HEADER_CONTENT.cta.secondary.href}
                        onClick={handleLinkClick}
                      >
                        {HEADER_CONTENT.cta.secondary.label}
                      </Link>
                    </Button>
                    <Button size="lg" asChild className="w-full">
                      <Link
                        href={HEADER_CONTENT.cta.primary.href}
                        onClick={handleLinkClick}
                      >
                        {HEADER_CONTENT.cta.primary.label}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
