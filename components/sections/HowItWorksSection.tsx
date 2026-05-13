import { HOW_IT_WORKS } from '@/lib/constants';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

export function HowItWorksSection({
  title = HOW_IT_WORKS.title,
  subtitle = HOW_IT_WORKS.subtitle,
  steps = HOW_IT_WORKS.steps,
}: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      className="w-full bg-gradient-to-b from-slate-50 to-white py-20 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-lg">
                {step.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-slate-600">{step.description}</p>

              {/* Connecting arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 right-0 hidden translate-x-1/2 lg:block">
                  <svg
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
