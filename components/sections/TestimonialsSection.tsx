import { Card, CardContent } from "@/components/ui/card"
import { TESTIMONIALS_SECTION } from "@/lib/constants"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
}

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
}

export function TestimonialsSection({
  title = TESTIMONIALS_SECTION.title,
  subtitle = TESTIMONIALS_SECTION.subtitle,
  testimonials = TESTIMONIALS_SECTION.testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="w-full py-20 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
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
  )
}
