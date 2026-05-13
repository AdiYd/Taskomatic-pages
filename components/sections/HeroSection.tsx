import { Button } from "@/components/ui/button"
import { HERO_SECTION } from "@/lib/constants"

interface HeroSectionProps {
  title?: string
  subtitle?: string
  cta?: string
  cta_secondary?: string
}

export function HeroSection({
  title = HERO_SECTION.title,
  subtitle = HERO_SECTION.subtitle,
  cta = HERO_SECTION.cta,
  cta_secondary = HERO_SECTION.cta_secondary,
}: HeroSectionProps) {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="text-base">
              {cta}
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              {cta_secondary}
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 rounded-lg overflow-hidden bg-slate-200 h-64 md:h-96 flex items-center justify-center">
          <div className="text-center text-slate-500">
            <p className="text-lg">תמונת הדגמה</p>
            <p className="text-sm">1200x600px</p>
          </div>
        </div>
      </div>
    </section>
  )
}
