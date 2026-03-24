'use client';

import { cn } from '@/lib/utils';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'peer focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#2C2C30] data-[state=unchecked]:bg-[#E9EBEF]',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'bg-background pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px]',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
