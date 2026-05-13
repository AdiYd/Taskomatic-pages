import { Card, CardContent } from '@/components/ui/card';
import { TESTIMONIALS_SECTION } from '@/lib/constants';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  title = TESTIMONIALS_SECTION.title,
  subtitle = TESTIMONIALS_SECTION.subtitle,
  testimonials = TESTIMONIALS_SECTION.testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-4 text-slate-700 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-slate-600">
                    {testimonial.role} ב-{testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
