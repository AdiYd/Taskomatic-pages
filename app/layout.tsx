import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import './animations.css';
import './blures.css';
import './shapes.css';
import './clip.css';
import './carousel-3d.css';

import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieToastEn, ScrollToTop } from '@/components/layout';
import { AccessibilityWidgetEnglish } from '@/components/layout/accessibility-widget/accessibility-widget-en';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - AI-Powered Marketing Automation`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} - AI-Powered Marketing Automation`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - AI-Powered Marketing Automation`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${rubik.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`flex min-h-full flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="page-main-theme"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ScrollToTop />
          <AccessibilityWidgetEnglish />
          <CookieToastEn />
        </ThemeProvider>
      </body>
    </html>
  );
}
