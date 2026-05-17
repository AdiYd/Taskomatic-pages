import { TaskomaticLogo } from '@/components/custom/logo';
import { Button } from '@/components/ui/button';
import { privacyPolicy } from '@/lib/legal';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות - Taskomatic',
  description:
    'מדיניות הפרטיות של Taskomatic - הגנה על המידע שלך והסבר מפורט על איסוף ושימוש במידע',
  robots: 'all',
  alternates: {
    canonical: 'https://app.taskomatic.net/privacy',
  },
  openGraph: {
    title: 'מדיניות פרטיות - Taskomatic',
    description: 'מדיניות הפרטיות של Taskomatic',
    url: 'https://app.taskomatic.net/privacy',
    siteName: 'Taskomatic',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex justify-center my-4">
        <TaskomaticLogo width={150} height={96} />
      </div>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{privacyPolicy.title}</h1>
          <p className="text-sm text-muted-foreground">{privacyPolicy.lastUpdate}</p>
        </div>

        <div className="text-start p-4">
          <div className="space-y-6 text-right" dir="rtl">
            {/* Introduction */}
            <div className="space-y-3">
              {privacyPolicy.introduction.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Sections */}
            {privacyPolicy.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>

                {section.content && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                )}

                {section.list && (
                  <ul className="space-y-2 mr-4">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm leading-relaxed text-muted-foreground">
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections && (
                  <div className="space-y-4 mr-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="space-y-2">
                        <h4 className="text-base font-medium text-foreground">
                          {subsection.title}
                        </h4>
                        {subsection.content && (
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {subsection.content}
                          </p>
                        )}
                        {subsection.list && (
                          <ul className="space-y-2 mr-4">
                            {subsection.list.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="text-sm leading-relaxed text-muted-foreground"
                              >
                                <span dangerouslySetInnerHTML={{ __html: item }} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.contact && (
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                    <p className="font-medium">{section.contact.company}</p>
                    <p>דוא"ל: {section.contact.email}</p>
                    <p>אתר: {section.contact.website}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Link href="/">
            <Button variant="default" size="lg">
              חזרה לדף הבית
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
