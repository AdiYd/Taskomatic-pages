'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const switchVariants = cva(
  'peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        main: 'data-[state=checked]:bg-stone-800 dark:data-[state=checked]:bg-stone-200 data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        success:
          'data-[state=checked]:bg-success data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        destructive:
          'data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        warning:
          'data-[state=checked]:bg-warning data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        info: 'data-[state=checked]:bg-info data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
      },
      size: {
        xl: 'h-7 w-12',
        lg: 'h-6 w-10',
        default: 'h-[1.15rem] w-8',
        sm: 'h-[1rem] w-7',
        xs: 'h-[0.85rem] w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Switch({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  variant?: 'default' | 'main' | 'success' | 'destructive' | 'warning' | 'info';
  size?: 'xl' | 'lg' | 'default' | 'sm' | 'xs';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      dir="rtl"
      className={cn(switchVariants({ variant, size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform',
          'data-[state=unchecked]:translate-x-0 data-[state=checked]:-translate-x-[calc(100%-2px)]'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
