// shadcn/ui Popover 컴포넌트
'use client';

import * as RadixPopover from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Popover = RadixPopover.Root;

const PopoverTrigger = RadixPopover.Trigger;

const PopoverAnchor = RadixPopover.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'border-border bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 z-50 w-auto rounded-xl border p-4 shadow-md outline-none',
        className,
      )}
      {...props}
    />
  </RadixPopover.Portal>
));
PopoverContent.displayName = RadixPopover.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
