import { Card, CardContent } from '@/components/ui/card';
import { TESTIMONIALS_SECTION } from '@/lib/constants';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-slate-200 bg-gradient-to-br from-white to-slate-50 transition-all hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="pt-6">
                <Quote className="mb-4 h-8 w-8 text-blue-500" />
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-6 text-sm text-slate-700">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-900">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-slate-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
