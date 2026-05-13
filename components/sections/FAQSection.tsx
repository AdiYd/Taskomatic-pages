import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_SECTION } from "@/lib/constants"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  faqs?: FAQ[]
}

export function FAQSection({
  title = FAQ_SECTION.title,
  subtitle = FAQ_SECTION.subtitle,
  faqs = FAQ_SECTION.faqs,
}: FAQSectionProps) {
  return (
    <section id="faq" className="w-full py-20 md:py-32 bg-slate-50">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-slate-600">
            {subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-right">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-right text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
