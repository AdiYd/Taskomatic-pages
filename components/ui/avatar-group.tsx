// src/components/ui/avatar-group.tsx

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

interface AvatarGroupProps {
  items: {
    src?: string;
    alt?: string;
    fallback?: string;
  }[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
  onClick?: (index: number) => void;
}

const sizeClasses = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
};

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    { items, max = 5, size = 'sm', className, onClick, showTooltip = true },
    ref
  ) => {
    const displayItems = items.slice(0, max);
    const remainingCount = items.length - max;
    const hasMore = remainingCount > 0;

    const renderAvatar = (
      item: AvatarGroupProps['items'][0],
      index: number
    ) => {
      const avatarContent = (
        <Avatar
          className={cn(
            sizeClasses[size],
            'border-background border transition-transform hover:z-10 hover:scale-110',
            className
          )}
        >
          <AvatarImage
            onClick={() => onClick?.(index)}
            src={item.src}
            alt={item.alt || `Avatar ${index + 1}`}
          />
          <AvatarFallback className="text-[10px] font-semibold">
            {item.fallback || item.alt?.charAt(0)?.toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
      );

      if (showTooltip && item.alt) {
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>{avatarContent}</TooltipTrigger>
              <TooltipContent>
                <p>{item.alt}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return <React.Fragment key={index}>{avatarContent}</React.Fragment>;
    };

    return (
      <div ref={ref} className="flex -space-x-2">
        {displayItems.map((item, index) => renderAvatar(item, index))}
        {hasMore && (
          <Avatar
            className={cn(
              sizeClasses[size],
              'border-background bg-muted border-2',
              className
            )}
          >
            <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { AvatarGroup };
export type { AvatarGroupProps };
