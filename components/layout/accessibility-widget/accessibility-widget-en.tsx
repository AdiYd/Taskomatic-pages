'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  Accessibility,
  AlignVerticalSpaceAround,
  Contrast,
  Eye,
  EyeOff,
  Focus,
  Link as LinkIcon,
  Minus,
  Moon,
  MousePointer2,
  Palette,
  PauseCircle,
  Plus,
  Sun,
  Type,
  XCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type AccessibilitySettings = {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  contrast: boolean;
  cursorSize: boolean;
  underlineLinks: boolean;
  grayscale: boolean;
  invertColors: boolean;
  highlightFocus: boolean;
  pauseAnimations: boolean;
  readableFont: boolean;
};

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  letterSpacing: 0,
  lineHeight: 1.5,
  contrast: false,
  cursorSize: false,
  underlineLinks: false,
  grayscale: false,
  invertColors: false,
  highlightFocus: false,
  pauseAnimations: false,
  readableFont: false,
};

type AccessibilityWidgetProps = {
  position?: 'left' | 'right';
};

export function AccessibilityWidgetEnglish({
  position = 'left',
}: AccessibilityWidgetProps = {}) {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem('a11y-settings');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse accessibility settings', e);
      }
    }
  }, []);

  // Apply settings whenever they change
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Letter spacing
    root.style.letterSpacing = `${settings.letterSpacing}px`;

    // Line height
    root.style.setProperty(
      '--a11y-line-height',
      settings.lineHeight.toString()
    );

    // CSS classes
    root.classList.toggle('a11y-high-contrast', settings.contrast);
    root.classList.toggle('a11y-large-cursor', settings.cursorSize);
    root.classList.toggle('a11y-underline-links', settings.underlineLinks);
    root.classList.toggle('a11y-grayscale', settings.grayscale);
    root.classList.toggle('a11y-invert', settings.invertColors);
    root.classList.toggle('a11y-highlight-focus', settings.highlightFocus);
    root.classList.toggle('a11y-pause-animations', settings.pauseAnimations);
    root.classList.toggle('a11y-readable-font', settings.readableFont);

    // Save to localStorage
    localStorage.setItem('a11y-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('a11y-settings');
  };

  const isDefault =
    JSON.stringify(settings) === JSON.stringify(defaultSettings);

  const positionClasses = position === 'left' ? 'left-4' : 'right-4';

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className={cn('fixed bottom-8 z-50', positionClasses)}>
            <Button
              size="icon"
              variant="info"
              className={cn(
                'border-primary/30 hover:border-primary group relative rounded-full border-2 shadow-lg transition-transform hover:scale-105',
                isOpen && 'border-primary scale-105'
              )}
              aria-label="Accessibility Settings"
            >
              <Accessibility />
              {!isDefault && (
                <span className="bg-primary absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full" />
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="bg-background relative max-h-[80vh] w-[80%] max-w-96 overflow-y-hidden border pt-0 shadow-lg backdrop-blur-sm max-sm:right-16"
          //   align="end"
          //   side="top"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b pt-2 pb-2">
              <div className="flex items-center gap-2">
                <Accessibility className="text-primary h-5 w-5" />
                <h3 className="text-lg font-semibold">Accessibility</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="xs" onClick={resetAll}>
                  Reset
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setIsOpen(false)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Type className="h-4 w-4" />
                Text Size: {settings.fontSize}%
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="main-outline"
                  size="icon-xs"
                  onClick={() =>
                    updateSetting(
                      'fontSize',
                      Math.max(80, Number((settings.fontSize - 10).toFixed(1)))
                    )
                  }
                  disabled={settings.fontSize <= 80}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{
                      width: `${((settings.fontSize - 80) / 40) * 100}%`,
                    }}
                  />
                </div>
                <Button
                  variant="main-outline"
                  size="icon-xs"
                  onClick={() =>
                    updateSetting(
                      'fontSize',
                      Math.min(120, Number((settings.fontSize + 10).toFixed(1)))
                    )
                  }
                  disabled={settings.fontSize >= 120}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Letter Spacing */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Focus className="h-4 w-4" />
                Letter Spacing: {settings.letterSpacing}px
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="main-outline"
                  size="icon-xs"
                  onClick={() =>
                    updateSetting(
                      'letterSpacing',
                      Math.max(
                        -5,
                        Number((settings.letterSpacing - 1).toFixed(1))
                      )
                    )
                  }
                  disabled={settings.letterSpacing <= -5}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{
                      width: `${((settings.letterSpacing + 5) / 10) * 100}%`,
                    }}
                  />
                </div>
                <Button
                  variant="main-outline"
                  size="icon-xs"
                  onClick={() =>
                    updateSetting(
                      'letterSpacing',
                      Math.min(
                        10,
                        Number((settings.letterSpacing + 1).toFixed(1))
                      )
                    )
                  }
                  disabled={settings.letterSpacing >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <AlignVerticalSpaceAround className="h-4 w-4" />
                Line Height: {settings.lineHeight}
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="main-outline"
                  size="icon-xs"
                  onClick={() =>
                    updateSetting(
                      'lineHeight',
                      Math.max(
                        1,
                        Number((settings.lineHeight - 0.1).toFixed(1))
                      )
                    )
                  }
                  disabled={settings.lineHeight <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="bg-secondary h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{
                      width: `${((settings.lineHeight - 1) / 1.5) * 100}%`,
                    }}
                  />
                </div>
                <Button
                  variant="main-outline"
                  size="icon-xs"
                  onClick={() =>
                    updateSetting(
                      'lineHeight',
                      Math.min(
                        2,
                        Number((settings.lineHeight + 0.1).toFixed(1))
                      )
                    )
                  }
                  disabled={settings.lineHeight >= 2}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            {/* High Contrast */}
            <Button
              variant={settings.contrast ? 'main' : 'main-outline'}
              className="w-full justify-start"
              onClick={() => updateSetting('contrast', !settings.contrast)}
            >
              {settings.contrast ? (
                <Eye className="ml-2 h-4 w-4" />
              ) : (
                <EyeOff className="ml-2 h-4 w-4" />
              )}
              High Contrast
            </Button>

            {/* Large Cursor */}
            <Button
              variant={settings.cursorSize ? 'main' : 'main-outline'}
              className="w-full justify-start"
              onClick={() => updateSetting('cursorSize', !settings.cursorSize)}
            >
              <MousePointer2 className="ml-2 h-4 w-4" />
              Large Cursor
            </Button>

            {/* Underline Links */}
            <Button
              variant={settings.underlineLinks ? 'main' : 'main-outline'}
              className="w-full justify-start"
              onClick={() =>
                updateSetting('underlineLinks', !settings.underlineLinks)
              }
            >
              <LinkIcon className="ml-2 h-4 w-4" />
              Underline Links
            </Button>

            {/* Grayscale */}
            <Button
              variant={settings.grayscale ? 'main' : 'main-outline'}
              className="w-full justify-start"
              onClick={() => updateSetting('grayscale', !settings.grayscale)}
            >
              <Palette className="ml-2 h-4 w-4" />
              Grayscale
            </Button>

            {/* Invert Colors */}
            <Button
              variant={settings.invertColors ? 'main' : 'main-outline'}
              className="w-full justify-start"
              onClick={() =>
                updateSetting('invertColors', !settings.invertColors)
              }
            >
              <Contrast className="ml-2 h-4 w-4" />
              Invert Colors
            </Button>

            {/* Pause Animations */}
            <Button
              variant={settings.pauseAnimations ? 'main' : 'main-outline'}
              className="w-full justify-start"
              onClick={() =>
                updateSetting('pauseAnimations', !settings.pauseAnimations)
              }
            >
              <PauseCircle className="ml-2 h-4 w-4" />
              Pause Animations
            </Button>

            {/* Theme Switcher */}
            <div className="flex items-center justify-center gap-2">
              <Moon className="text-muted-foreground h-5 w-5" />
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={(checked: boolean) =>
                  setTheme(checked ? 'dark' : 'light')
                }
                className="relative"
              >
                <span className="bg-muted absolute left-0 h-4 w-10 rounded-full transition-all" />
                <span className="bg-primary absolute top-0.5 left-0.5 h-3 w-3 rounded-full transition-transform" />
              </Switch>
              <Sun className="text-muted-foreground h-5 w-5" />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Global Styles */}
      <style jsx global>{`
        .a11y-high-contrast {
          filter: contrast(1.5);
        }

        .a11y-large-cursor,
        .a11y-large-cursor * {
          cursor:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M2 2 L2 28 L12 20 L16 28 L20 26 L16 18 L26 18 Z" fill="white" stroke="black" stroke-width="2"/></svg>')
              0 0,
            auto !important;
        }

        .a11y-underline-links a {
          text-decoration: underline !important;
        }

        .a11y-grayscale {
          filter: grayscale(100%);
        }

        .a11y-invert {
          filter: invert(100%);
        }

        .a11y-highlight-focus {
          outline: 2px dashed rgba(255, 255, 255, 0.8);
        }

        .a11y-pause-animations {
          animation-play-state: paused !important;
        }

        .a11y-readable-font {
          font-family: 'Arial', sans-serif !important;
        }
      `}</style>
    </>
  );
}
