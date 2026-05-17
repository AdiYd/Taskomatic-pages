import { Header, HeaderWrapper } from '@/components/layout';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWork';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { ContactUs } from '@/components/sections/ContactUs';
import { CTA } from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Starfield Background - Fixed to viewport */}
      <div className="starfield bg-background fixed inset-0 z-0">
        <div className="shooting-stars">
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          {/* <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div> */}
        </div>
      </div>

      {/* Content above starfield */}
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <main className="bg-size-200% bg-pos-0 animate-gradient relative z-10 w-full flex-1">
        {/* Bg gradient of sky 400 to transparent, fixed at screen size  */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-linear-to-b from-sky-400/40 via-transparent via-45% to-transparent dark:bg-linear-to-br dark:from-purple-400/20" />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />

        <ContactUs />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer className="relative z-10" />
    </div>
  );
}
