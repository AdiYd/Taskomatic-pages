'use client';

import { FadeBlur } from './fade-blur';
import { ParallaxReveal } from './parallax-reveal';
import { SlideInScale } from './slide-in-scale';
import { SlideScale } from './slide-scale';
import { StaggerFade } from './stagger-fade';
import type { AnimationProps } from './types';

export function AnimationWrapper(props: AnimationProps) {
  const { type, children, className } = props;

  switch (type) {
    case 'slide-scale':
      return (
        <SlideScale
          slideOutput={props.slideOutput}
          scaleOutput={props.scaleOutput}
          className={className}
        >
          {children}
        </SlideScale>
      );
    case 'slide-in-scale':
      return (
        <SlideInScale
          slideOutput={props.slideOutput}
          scaleOutput={props.scaleOutput}
          className={className}
        >
          {children}
        </SlideInScale>
      );
    case 'fade-blur':
      return (
        <FadeBlur
          direction={props.direction}
          blur={props.blur}
          duration={props.duration}
          className={className}
        >
          {children}
        </FadeBlur>
      );

    case 'parallax-reveal':
      return (
        <ParallaxReveal speed={props.speed} rotate={props.rotate} className={className}>
          {children}
        </ParallaxReveal>
      );

    case 'stagger-fade':
      return (
        <StaggerFade
          delay={props.delay}
          staggerDelay={props.staggerDelay}
          direction={props.direction}
          className={className}
        >
          {children}
        </StaggerFade>
      );

    default:
      // Type safety: this will cause a TypeScript error if we forget to handle a case
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
  }
}
