'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollableDatePicker } from '@/components/ui/scrollable-date-picker';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

interface DateXInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  min?: string;
  max?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function DateXInput({
  label,
  value,
  onChange,
  error,
  helperText,
  min,
  max,
  placeholder = 'YYYY-MM-DD',
  disabled,
  className,
}: DateXInputProps) {
  const [open, setOpen] = React.useState(false);
  const parsedDate =
    value && value !== '' && value !== placeholder
      ? new Date(value)
      : undefined;

  const minDate = min ? new Date(min) : undefined;
  const maxDate = max ? new Date(max) : undefined;

  return (
    <div className={className}>
      <div className='flex flex-col gap-2'>
        {label && (
          <div className='typo-body-sm-semibold text-text-basic h-5 px-2'>
            {label}
          </div>
        )}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button
              type='button'
              disabled={disabled}
              className={cn(
                'bg-element-gray-lighter typo-body-lg-regular text-text-basic placeholder:text-text-subtier flex w-full items-center justify-between rounded-[8px] p-4',
                error
                  ? 'outline-text-error outline-1'
                  : 'focus:outline-border-primary focus:outline-1',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              )}
            >
              <span className={parsedDate ? '' : 'text-text-subtler'}>
                {parsedDate ? format(parsedDate, 'yyyy-MM-dd') : placeholder}
              </span>
              <CalendarIcon className='text-text-subtler ml-2 h-5 w-5' />
            </button>
          </DrawerTrigger>
          <DrawerContent className='bg-background-white'>
            <div className='mx-auto w-full max-w-sm'>
              <DrawerHeader>
                <DrawerTitle className='text-center'>날짜 선택</DrawerTitle>
              </DrawerHeader>
              <div className='p-4 pb-8' data-vaul-no-drag>
                <ScrollableDatePicker
                  value={parsedDate}
                  onChange={(date: Date) => {
                    onChange(format(date, 'yyyy-MM-dd'));
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        {(error || helperText) && (
          <div
            className={`typo-caption-sm-medium px-2 ${
              error ? 'text-text-error' : 'text-text-subtier'
            }`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    </div>
  );
}
