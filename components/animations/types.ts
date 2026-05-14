import { ReactNode } from 'react';

export type AnimationType = 'slide-scale' | 'fade-blur' | 'parallax-reveal' | 'stagger-fade';

export interface BaseAnimationProps {
  children: ReactNode;
  className?: string;
}

export interface SlideScaleProps extends BaseAnimationProps {
  slideOutput?: [number, number, number];
  scaleOutput?: [number, number, number];
}

export interface SlideInScaleProps extends BaseAnimationProps {
  slideOutput?: [number, number];
  scaleOutput?: [number, number];
}

export interface FadeBlurProps extends BaseAnimationProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  blur?: number;
  duration?: number;
}

export interface ParallaxRevealProps extends BaseAnimationProps {
  speed?: number;
  rotate?: number;
}

export interface StaggerFadeProps extends BaseAnimationProps {
  delay?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export type AnimationProps =
  | ({ type: 'slide-scale' } & SlideScaleProps)
  | ({ type: 'slide-in-scale' } & SlideInScaleProps)
  | ({ type: 'fade-blur' } & FadeBlurProps)
  | ({ type: 'parallax-reveal' } & ParallaxRevealProps)
  | ({ type: 'stagger-fade' } & StaggerFadeProps);
