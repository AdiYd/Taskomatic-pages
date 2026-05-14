import { TestimonialsGrid } from '@/components/client-ui/TestimonialsGrid';

// Testimonials Section Content Configuration
const TESTIMONIALS_CONTENT = {
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

interface Testimonial {
  quote: string;
  author: string;
  role: string;
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
    <section className="bg-background relative w-full overflow-hidden py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-gradient-secondary mb-4 text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            {subtitle}
          </p>
        </div>

        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  );
}
