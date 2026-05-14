import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        main: 'bg-foreground text-background shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
        'main-outline':
          'border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background hover:scale-[1.02] active:scale-[0.98]',
        default:
          'bg-primary shine-button text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary-hover shine-on-hover hover:scale-[1.02] active:scale-[0.98]',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:bg-secondary-hover hover:scale-[1.02] active:scale-[0.98]',
        accent:
          'bg-accent text-accent-foreground shadow-md hover:shadow-lg hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98]',
        success:
          'bg-success text-success-foreground shadow-md hover:shadow-lg hover:bg-success/90 hover:scale-[1.02] active:scale-[0.98]',
        warning:
          'bg-warning text-warning-foreground shadow-md hover:shadow-lg hover:bg-warning/90 hover:scale-[1.02] active:scale-[0.98]',
        info: 'bg-info text-info-foreground shadow-md hover:shadow-lg hover:bg-info/90 hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] active:scale-[0.98]',
        'outline-secondary':
          'border-2 border-secondary bg-background text-secondary hover:bg-secondary hover:text-secondary-foreground hover:scale-[1.02] active:scale-[0.98]',
        ghost:
          'text-foreground hover:bg-muted hover:text-foreground hover:scale-[1.02] active:scale-[0.98]',
        'ghost-primary':
          'text-primary hover:bg-primary/10 hover:text-primary hover:scale-[1.02] active:scale-[0.98]',
        link: 'text-foreground/80 underline-offset-4 hover:underline hover:text-foreground',
        gradient:
          'bg-gradient-primary text-white shadow-lg hover:shadow-xl shine-on-hover hover:scale-[1.02] active:scale-[0.98]',
        'gradient-secondary':
          'bg-gradient-secondary text-white shadow-lg hover:shadow-xl shine-on-hover hover:scale-[1.02] active:scale-[0.98]',
        'gradient-accent':
          'bg-gradient-accent text-white shadow-lg hover:shadow-xl shine-on-hover hover:scale-[1.02] active:scale-[0.98]',
        glass:
          'glass border border-white/20 text-foreground shadow-lg hover:shadow-xl backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4 text-sm',
        xs: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-lg',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10 text-sm',
        'icon-sm': 'h-9 w-9',
        'icon-xs': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
