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
import LongButton from './LongButton';

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

  // 내부 임시 상태 - Drawer 열릴 때 초기화됨
  const [tempDate, setTempDate] = React.useState<Date>(
    parsedDate || new Date(),
  );

  // Drawer 열릴 때 현재 값으로 tempDate 초기화
  React.useEffect(() => {
    if (open) {
      setTempDate(parsedDate || new Date());
    }
  }, [open, parsedDate]);

  const minDate = min ? new Date(min) : undefined;
  const maxDate = max ? new Date(max) : undefined;

  const handleConfirm = () => {
    onChange(format(tempDate, 'yyyy-MM-dd'));
    setOpen(false);
  };

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
          <DrawerContent showHandle={false} className='bg-background-white'>
            <div className='mx-auto w-full max-w-sm px-6'>
              <DrawerHeader className='typo-heading-md-bold px-0 pb-1.5'>
                <DrawerTitle className='text-start'>날짜 선택</DrawerTitle>
              </DrawerHeader>
              <div className='' data-vaul-no-drag>
                <ScrollableDatePicker
                  value={tempDate}
                  onChange={setTempDate}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>
              <LongButton
                text='확인'
                noFixed={true}
                className='mb-5'
                onClick={handleConfirm}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
