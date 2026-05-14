'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface Carousel3DItem {
  id: string | number;
  content: ReactNode;
  alt?: string;
}

export interface Carousel3DProps {
  items: Carousel3DItem[];
  className?: string;
  wrapperClassName?: string;
  cardClassName?: string;
  // Carousel customization
  cardWidth?: number;
  cardHeight?: number;
  translateZ?: number;
  rotateX?: number;
  perspective?: number;
  animationDuration?: number;
}

export function Carousel3D({
  items,
  className,
  wrapperClassName,
  cardClassName,
  cardWidth = 160,
  cardHeight = 160,
  translateZ = 200,
  rotateX = -10,
  perspective = 1000,
  animationDuration = 32,
}: Carousel3DProps) {
  const quantity = items.length;

  return (
    <div
      className={cn('carousel3d-wrapper', wrapperClassName)}
      style={
        {
          '--quantity': quantity,
        } as React.CSSProperties
      }
    >
      <div
        className={cn('carousel3d-inner', className)}
        style={
          {
            '--w': `${cardWidth}px`,
            '--h': `${cardHeight}px`,
            '--translateZ': `${translateZ}px`,
            '--rotateX': `${rotateX}deg`,
            '--perspective': `${perspective}px`,
            '--animation-duration': `${animationDuration}s`,
          } as React.CSSProperties
        }
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'carousel3d-card',
              'border border-primary/10 hover:border-primary/80',
              cardClassName
            )}
            style={
              {
                '--index': index,
              } as React.CSSProperties
            }
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// Convenience component for image carousels
export interface Carousel3DImageItem {
  id: string | number;
  src: string;
  alt: string;
}

export interface Carousel3DImagesProps extends Omit<Carousel3DProps, 'items'> {
  images: Carousel3DImageItem[];
  sizes?: string;
  priority?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  translateZ?: number;
  rotateX?: number;
  perspective?: number;
  animationDuration?: number;
}

export function Carousel3DImages({
  images,
  sizes = '(max-width: 640px) 160px, (max-width: 1024px) 200px, 260px',
  priority = false,
  ...carouselProps
}: Carousel3DImagesProps) {
  const items: Carousel3DItem[] = images.map(image => ({
    id: image.id,
    alt: image.alt,
    content: (
      <Image
        alt={image.alt}
        src={image.src}
        fill
        className="object-cover"
        sizes={sizes}
        priority={priority}
      />
    ),
  }));

  return <Carousel3D items={items} {...carouselProps} />;
}
