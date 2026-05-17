import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollArea,
} from '@/components/ui';
import { privacyPolicyEn, privacyPolicy as privacyPolicyHe } from '@/lib/legal';

interface PrivacyPolicyDialogProps {
  open: boolean;
  lang?: 'en' | 'he';
  onOpenChange: (open: boolean) => void;
  onAccept?: () => void;
  onDecline?: () => void;
  showActions?: boolean;
}

export function PrivacyPolicyDialog({
  open,
  lang = 'en',
  onOpenChange,
  onAccept,
  onDecline,
  showActions = true,
}: PrivacyPolicyDialogProps) {
  const privacyPolicy = lang === 'he' ? privacyPolicyHe : privacyPolicyEn;
  const handleAccept = () => {
    localStorage.setItem('postomatic-cookie-consent', 'accepted');
    onAccept?.();
    onOpenChange(false);
  };

  const handleDecline = () => {
    localStorage.setItem('postomatic-cookie-consent', 'declined');
    onDecline?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={lang === 'he' ? 'rtl' : 'ltr'}
        className="z-10000 h-[90vh] w-[90vw] max-w-5xl p-0"
      >
        <DialogHeader className="p-6 pb-1">
          <DialogTitle className="text-center text-lg">
            {privacyPolicy.title}
          </DialogTitle>
          <p className="text-muted-foreground text-center text-sm">
            {privacyPolicy.lastUpdate}
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-150px)] px-6">
          <div
            style={{ direction: lang === 'he' ? 'rtl' : 'ltr' }}
            className="space-y-6 pb-4"
            dir={lang === 'he' ? 'rtl' : 'ltr'}
          >
            {/* Introduction */}
            <div className="space-y-3">
              {privacyPolicy.introduction.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground text-sm leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Sections */}
            {privacyPolicy.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <h3 className="text-foreground text-lg font-semibold">
                  {section.title}
                </h3>

                {section.content && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {section.content}
                  </p>
                )}

                {section.list && (
                  <ul
                    className={`space-y-2 ${lang === 'he' ? 'mr-4' : 'ml-4'}`}
                  >
                    {section.list.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-muted-foreground text-sm leading-relaxed"
                      >
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections && (
                  <div
                    className={`space-y-4 ${lang === 'he' ? 'mr-4' : 'ml-4'}`}
                  >
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="space-y-2">
                        <h4 className="text-foreground text-base font-medium">
                          {subsection.title}
                        </h4>
                        {subsection.content && (
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {subsection.content}
                          </p>
                        )}
                        {subsection.list && (
                          <ul
                            className={`space-y-2 ${lang === 'he' ? 'mr-4' : 'ml-4'}`}
                          >
                            {subsection.list.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="text-muted-foreground text-sm leading-relaxed"
                              >
                                <span
                                  dangerouslySetInnerHTML={{ __html: item }}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.contact &&
                  (lang === 'he' ? (
                    <div
                      className="bg-muted/50 space-y-2 rounded-lg p-4 text-sm"
                      dir="rtl"
                    >
                      <p className="font-medium">{section.contact.company}</p>
                      <p>דוא&quot;ל: {section.contact.email}</p>
                      <p>אתר: {section.contact.website}</p>
                    </div>
                  ) : (
                    <div className="bg-muted/50 space-y-2 rounded-lg p-4 text-sm">
                      <p className="font-medium">{section.contact.company}</p>
                      <p>Email: {section.contact.email}</p>
                      <p>Website: {section.contact.website}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>

        {showActions && (
          <DialogFooter className="gap-3 p-6 pt-2 sm:gap-3">
            <Button
              onClick={handleDecline}
              variant="outline"
              size="sm"
              className="flex-1 py-1"
            >
              {lang === 'he' ? 'אני לא מסכים' : "I Don't Agree"}
            </Button>
            <Button
              onClick={handleAccept}
              variant="main"
              size="sm"
              className="flex-1 py-1"
            >
              {lang === 'he' ? 'אני מסכים' : 'I Agree'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
