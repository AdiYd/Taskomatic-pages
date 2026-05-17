'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Carousel3D } from '../ui/carousel-3d';
import { useState, useEffect } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const carouselItems = features.map((feature) => ({
    id: feature.title,
    content: (
      <Card className="group hover:border-primary relative h-full border transition-all duration-300 hover:shadow-2xl">
        {/* Gradient overlay on hover */}
        <div className="bg-gradient-accent absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        <CardHeader className="relative">
          <div className="bg-gradient-primary flex size-12 items-center justify-center rounded-lg shadow-lg">
            {feature.icon}
          </div>
          <CardTitle>{feature.title}</CardTitle>
          <CardDescription className="text-base">
            {feature.description}
          </CardDescription>
        </CardHeader>
      </Card>
    ),
  }));

  // For mobile, we can show a simpler grid instead of the carousel
  // Only render after client-side hydration to prevent mismatch
  if (!isClient) {
    // During SSR/hydration, always render the carousel to match server HTML
    return (
      <Carousel3D
        items={carouselItems}
        cardWidth={480}
        cardHeight={300}
        translateZ={550}
        rotateX={-4}
        perspective={8000}
        animationDuration={45}
        wrapperClassName="mt-36"
      />
    );
  }

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {carouselItems.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    );
  }

  return (
    <Carousel3D
      items={carouselItems}
      cardWidth={480}
      cardHeight={300}
      translateZ={550}
      rotateX={-4}
      perspective={8000}
      animationDuration={45}
      wrapperClassName="mt-36"
    />
  );
}
