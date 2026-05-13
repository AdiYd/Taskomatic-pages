import { Button } from "@/components/ui/button"
import { CTA_SECTION } from "@/lib/constants"

interface CTASectionProps {
  title?: string
  subtitle?: string
  cta?: string
}

export function CTASection({
  title = CTA_SECTION.title,
  subtitle = CTA_SECTION.subtitle,
  cta = CTA_SECTION.cta,
}: CTASectionProps) {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>
          <p className="text-xl text-blue-50">
            {subtitle}
          </p>
          <Button size="lg" variant="secondary" className="text-base">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
