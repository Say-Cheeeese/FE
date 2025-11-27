'use client';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type='button'
              disabled={disabled}
              className={cn(
                'bg-element-gray-lighter typo-body-lg-medium text-text-basic placeholder:text-text-subtier flex w-full items-center justify-between rounded-[8px] p-4',
                error
                  ? 'outline-text-error outline-1'
                  : 'focus:outline-border-primary focus:outline-1',
                disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
              )}
            >
              <span className={parsedDate ? '' : 'text-gray-400'}>
                {parsedDate ? format(parsedDate, 'yyyy-MM-dd') : placeholder}
              </span>
              <CalendarIcon className='ml-2 h-5 w-5 text-gray-400' />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align='start'
            className='border-none bg-transparent p-0 shadow-none'
          >
            <Calendar
              mode='single'
              selected={parsedDate}
              onSelect={(date: Date | undefined) => {
                if (date) {
                  onChange(format(date, 'yyyy-MM-dd'));
                  setOpen(false);
                }
              }}
              fromDate={minDate}
              toDate={maxDate}
            />
          </PopoverContent>
        </Popover>
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
