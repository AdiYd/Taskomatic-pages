import { TestimonialsGrid } from '@/components/client-ui/TestimonialsGrid';
import { FadeBlur } from '@/components/animations';

// Testimonials Section Content Configuration
const TESTIMONIALS_CONTENT = {
  title: 'What Our Customers Say',
  subtitle: 'Hundreds of satisfied customers already use Taskomatic',
  testimonials: [
    {
      text: 'The product completely changed the way we work. I manage to save hours of work every week!',
      name: 'Yossi Cohen',
      role: 'Real Estate Agent Business Owner',
      rating: 5,
    },
    {
      text: 'The ability to manage all processes in parallel is simply amazing. Our lead volume increased by 40% in the first month!',
      name: 'Ronit Levi',
      role: 'Content Manager at Startup',
      rating: 5,
    },
    {
      text: 'The system helps me manage my marketing independently and generate results without needing an expensive professional.',
      name: 'Avi Goldstein',
      role: 'Self-Employed',
      rating: 5,
    },
    {
      text: 'The time saved by automating processes allowed me to focus on improving products and service. Thank you!',
      name: 'Michal Barak',
      role: 'Online Store Owner',
      rating: 5,
    },
  ],
};

interface Testimonial {
  text: string;
  name: string;
  role: string;
  rating: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export function Testimonials({
  title = TESTIMONIALS_CONTENT.title,
  subtitle = TESTIMONIALS_CONTENT.subtitle,
  testimonials = TESTIMONIALS_CONTENT.testimonials,
}: TestimonialsProps) {
  return (
    <section className="bg-background clip-wave-top">
      <div className="container mx-auto max-w-6xl px-4 max-sm:pt-8">
        <FadeBlur direction="up" duration={0.6}>
          <div className="mb-16 text-center">
            <h2 className="text-gradient-secondary mb-4 text-3xl font-bold md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              {subtitle}
            </p>
          </div>
        </FadeBlur>

        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  );
}
