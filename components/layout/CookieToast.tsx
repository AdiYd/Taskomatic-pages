'use client';

import { PrivacyPolicyDialog } from '@/app/privacy/privacy-policy-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CookieToastProps {
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

export function CookieToast({
  onAccept,
  onDecline,
  className,
}: CookieToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('postomatic-cookie-consent');
    if (!consent) {
      // Delay showing the toast for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
    return;
  }, []);

  const notifyClarityConsent = (granted: boolean) => {
    // Notify Microsoft Clarity about consent decision
    if (
      typeof window !== 'undefined' &&
      (
        window as unknown as {
          clarity?: (
            action: string,
            options: { ad_storage: string; analytics_storage: string }
          ) => void;
        }
      ).clarity
    ) {
      (
        window as unknown as {
          clarity: (
            action: string,
            options: { ad_storage: string; analytics_storage: string }
          ) => void;
        }
      ).clarity('consent', {
        ad_storage: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('postomatic-cookie-consent', 'accepted');
    notifyClarityConsent(true);
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onAccept?.();
    }, 300);
  };

  const handleDecline = () => {
    localStorage.setItem('postomatic-cookie-consent', 'declined');
    notifyClarityConsent(false);
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDecline?.();
    }, 300);
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handlePrivacyDialogAccept = () => {
    handleAccept();
  };

  const handlePrivacyDialogDecline = () => {
    handleDecline();
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className={cn(
          'fixed right-4 bottom-4 z-9999 w-[90%] sm:max-w-105',
          'pointer-events-auto',
          className
        )}
      >
        <div
          className={cn(
            'relative rounded-lg border border-gray-200 dark:border-gray-700',
            'bg-card/95 shadow-lg backdrop-blur-3xl',
            'p-3 pr-6',
            'transition-all duration-300 ease-out',
            isExiting
              ? 'animate-out slide-out-to-right-full fade-out-80'
              : 'animate-in slide-in-from-bottom-full fade-in-0'
          )}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={cn(
              'absolute top-3 left-3 z-10 rounded-lg',
              'bg-stone-800 p-1 dark:bg-stone-700',
              'text-stone-200 hover:text-white',
              'transition-all duration-200',
              'hover:bg-stone-700 dark:hover:bg-stone-600',
              'focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:outline-none'
            )}
            aria-label="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="space-y-4">
            {/* Title */}
            <div dir="rtl" className="flex items-baseline gap-4">
              <h3 className="text-foreground text-lg font-semibold">עוגיות</h3>
              <span className="text-2xl" aria-hidden="true">
                🍪
              </span>
            </div>

            {/* Description */}
            <p
              dir="rtl"
              className="text-muted-foreground text-sm leading-relaxed"
            >
              אנחנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך ולנתח את תנועת
              המשתמשים באתר. על ידי המשך השימוש באתר, אתה מסכים לשימוש שלנו
              בעוגיות. ניתן לקרוא עוד ב
              <button
                onClick={() => setShowPrivacyDialog(true)}
                className="hover:text-foreground mx-1 font-medium underline transition-colors"
              >
                מדיניות הפרטיות
              </button>
              שלנו.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleDecline}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                דחה
              </Button>
              <Button
                onClick={handleAccept}
                variant="main"
                size="sm"
                className="flex-1"
              >
                אני מסכים
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Dialog */}
      <PrivacyPolicyDialog
        lang="he"
        open={showPrivacyDialog}
        onOpenChange={setShowPrivacyDialog}
        onAccept={handlePrivacyDialogAccept}
        onDecline={handlePrivacyDialogDecline}
        showActions={true}
      />
    </>
  );
}
