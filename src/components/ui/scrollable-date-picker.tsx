'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';

const ITEM_HEIGHT = 32;
const CONTAINER_HEIGHT = 236;

interface PickerColumnProps {
  items: number[];
  value: number;
  label: string;
  onChange: (value: number) => void;
}

function PickerColumn({ items, value, label, onChange }: PickerColumnProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Calculate padding to center items in selection indicator
  const paddingTop = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2; // 102px

  // Scroll to value on mount and when value changes externally
  React.useEffect(() => {
    if (containerRef.current && !isScrollingRef.current) {
      const index = items.indexOf(value);
      if (index !== -1) {
        containerRef.current.scrollTop = index * ITEM_HEIGHT;
      }
    }
  }, [value, items]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    isScrollingRef.current = true;

    // Debounce: wait for scroll to stop
    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

      // Snap to exact position
      containerRef.current.scrollTop = clampedIndex * ITEM_HEIGHT;

      const newValue = items[clampedIndex];
      if (newValue !== undefined && newValue !== value) {
        onChange(newValue);
      }

      isScrollingRef.current = false;
    }, 100);
  };

  const handleItemClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='relative h-[236px] overflow-hidden'>
      <div
        ref={containerRef}
        className='scrollbar-hide h-full snap-y snap-mandatory overflow-y-auto scroll-smooth'
        onScroll={handleScroll}
      >
        {/* Top padding spacer */}
        <div style={{ height: paddingTop }} />

        {items.map((item, index) => (
          <div
            key={item}
            className='flex h-8 cursor-pointer snap-center items-center justify-center'
            onClick={() => handleItemClick(index)}
          >
            <div
              className={cn(
                'typo-heading-sm-medium whitespace-nowrap transition-colors duration-200',
                value === item ? 'text-text-basic' : 'text-text-disabled',
              )}
            >
              {item}
              {label}
            </div>
          </div>
        ))}

        {/* Bottom padding spacer */}
        <div style={{ height: paddingTop }} />
      </div>
    </div>
  );
}

interface ScrollableDatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function ScrollableDatePicker({
  value,
  onChange,
  minDate,
  maxDate,
}: ScrollableDatePickerProps) {
  const currentDate = value || new Date();

  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth() + 1;
  const selectedDay = currentDate.getDate();

  // Generate years
  const currentYear = new Date().getFullYear();
  const minYear = minDate?.getFullYear() || 2020;
  const maxYear = maxDate?.getFullYear() || currentYear + 50;

  const years = React.useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i),
    [minYear, maxYear],
  );

  const months = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => i + 1),
    [],
  );

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = React.useMemo(
    () =>
      Array.from(
        { length: getDaysInMonth(selectedYear, selectedMonth) },
        (_, i) => i + 1,
      ),
    [selectedYear, selectedMonth],
  );

  const handleYearChange = (year: number) => {
    const daysInNewMonth = getDaysInMonth(year, selectedMonth);
    const newDay = Math.min(selectedDay, daysInNewMonth);
    onChange(new Date(year, selectedMonth - 1, newDay));
  };

  const handleMonthChange = (month: number) => {
    const daysInNewMonth = getDaysInMonth(selectedYear, month);
    const newDay = Math.min(selectedDay, daysInNewMonth);
    onChange(new Date(selectedYear, month - 1, newDay));
  };

  const handleDayChange = (day: number) => {
    onChange(new Date(selectedYear, selectedMonth - 1, day));
  };

  return (
    <div className='relative mx-auto flex h-[236px] w-full max-w-sm items-center justify-center overflow-hidden'>
      {/* Selection Indicator */}
      <div className='bg-element-gray-light pointer-events-none absolute inset-x-4 top-1/2 z-0 h-8 -translate-y-1/2 rounded-[6px]' />

      {/* Columns Container */}
      <div className='z-10 flex h-[236px] w-full justify-center px-6'>
        <div className='relative h-full min-w-0 flex-1'>
          <PickerColumn
            items={years}
            value={selectedYear}
            label='년'
            onChange={handleYearChange}
          />
        </div>
        <div className='relative h-full min-w-0 flex-1'>
          <PickerColumn
            items={months}
            value={selectedMonth}
            label='월'
            onChange={handleMonthChange}
          />
        </div>
        <div className='relative h-full min-w-0 flex-1'>
          <PickerColumn
            items={days}
            value={selectedDay}
            label='일'
            onChange={handleDayChange}
          />
        </div>
      </div>

      {/* Top fade gradient */}
      <div className='pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-white to-transparent' />

      {/* Bottom fade gradient */}
      <div className='pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-white to-transparent' />
    </div>
  );
}
