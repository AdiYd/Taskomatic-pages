import {
  ContactForm,
  ContactFormData,
} from '@/components/client-ui/ContactForm';
import { FadeBlur } from '@/components/animations';

// Contact Section Content Configuration
const CONTACT_CONTENT = {
  title: 'Ready to Get Started?',
  subtitle: "Let's discuss how we can help transform your business",
  tagline: 'Contact Us',
};

interface ContactUsProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  includeEmail?: boolean;
  includeMessage?: boolean;
  onSubmit?: (data: ContactFormData) => void;
}

export function ContactUs({
  title = CONTACT_CONTENT.title,
  subtitle = CONTACT_CONTENT.subtitle,
  tagline = CONTACT_CONTENT.tagline,
  includeEmail = false,
  includeMessage = false,
  onSubmit,
}: ContactUsProps) {
  return (
    <section id="contact" className="shapes-floating-bubbles">
      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <FadeBlur direction="up" duration={0.6}>
          <div className="mb-16 text-center">
            {tagline && (
              <div className="mb-4 inline-block">
                <span className="bg-gradient-accent shine-border rounded-full px-4 py-1.5 text-sm font-semibold text-white">
                  {tagline}
                </span>
              </div>
            )}
            <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              {subtitle}
            </p>
          </div>
        </FadeBlur>

        {/* Contact Form */}

        <ContactForm
          includeEmail={includeEmail}
          includeMessage={includeMessage}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
}
