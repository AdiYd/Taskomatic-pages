'use client';

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface HorizontalScrollContainerProps {
  children?: React.ReactNode;
  /**
   * Number of items to show at different breakpoints
   * Supports decimal values (e.g., 2.5 shows 2.5 items to hint at scrolling)
   */
  itemsToShow?: {
    mobile?: number;
    md?: number;
    lg?: number;
  };
  /**
   * Gap between items in pixels
   */
  gap?: number;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Drag resistance level (0-100). 0 = fully free drag, 100 = high resistance/snapping.
   * @default 0
   */
  resistance?: number;

  /**
   * Whether to enable drag-free scrolling
   * @default true
   */
  dragFree?: boolean;

  /**
   * Whether to show pagination dots
   * @default false
   */
  showDots?: boolean;

  /**
   * Whether to loop the carousel
   * @default false
   */
  loop?: boolean;

  /**
   * Alignment of items in the carousel
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Scroll direction
   * @default 'rtl'
   */
  direction?: 'ltr' | 'rtl';
}

export function HorizontalScrollContainer({
  children,
  itemsToShow = {
    mobile: 2.5,
    md: 4.5,
    lg: 6,
  },
  gap = 4,
  showDots = false,
  dragFree,
  className,
  resistance = 0, // New prop, default to 0 (fully free)
  loop = false,
  align = 'start',
  direction = 'rtl',
}: HorizontalScrollContainerProps) {
  const childrenArray = React.Children.toArray(children);

  // Map resistance to Embla options
  const getDragOptions = (resistance: number) => {
    if (dragFree === true) return { dragFree: true, dragThreshold: 5 }; // Default to very free if dragFree is true
    if (dragFree === false) return { dragFree: false, dragThreshold: 50 }; // Default to snappy if dragFree is false
    if (resistance <= 20) {
      // Low resistance: Fully free with minimal threshold
      return { dragFree: true, dragThreshold: 5 };
    } else if (resistance <= 80) {
      // Medium resistance: Free but with higher threshold for "stickiness"
      return { dragFree: true, dragThreshold: 20 + (resistance - 20) * 2 }; // Scales from 20 to ~180
    } else {
      // High resistance: Snappy with even higher threshold
      return { dragFree: false, dragThreshold: 50 };
    }
  };

  const dragOpts = getDragOptions(resistance);

  if (!childrenArray || childrenArray.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align,
        containScroll: 'trimSnaps',
        loop,
        direction,
        ...dragOpts, // Spread the drag options
      }}
      className={cn('relative w-full overflow-hidden', className)}
    >
      <CarouselContent className="touch-pan-y" style={{ gap: `${gap}px` }}>
        {childrenArray.map((child, index) => (
          <CarouselItem
            key={index}
            className={cn(
              'min-w-0 shrink-0',
              // Mobile: default itemsToShow.mobile
              `basis-[calc((100%-${gap * (itemsToShow.mobile! - 1)}px)/${itemsToShow.mobile})]`,
              // md breakpoint
              `md:basis-[calc((100%-${gap * (itemsToShow.md! - 1)}px)/${itemsToShow.md})]`,
              // lg breakpoint
              `lg:basis-[calc((100%-${gap * (itemsToShow.lg! - 1)}px)/${itemsToShow.lg})]`
            )}
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      {showDots && <CarouselDots />}
    </Carousel>
  );
}
