'use client';
import React, { useState, InputHTMLAttributes, useRef } from 'react';
import { X } from 'lucide-react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  showClear?: boolean;
}

export default function XInput({
  label,
  value,
  onChange,
  error,
  helperText,
  showClear = true,
  className,
  disabled,
  maxLength,
  type,
  ...restProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleInputClick = () => {
    if (type === 'date' && inputRef.current) {
      inputRef.current.showPicker?.();
    }
  };

  const shouldShowClear = showClear && isFocused && value && !disabled;

  return (
    <div className={className}>
      <div className='flex flex-col gap-2'>
        {label && (
          <div className='text-body-sm-semibold text-text-basic h-5 px-2'>
            {label}
          </div>
        )}

        <div className='relative'>
          <input
            ref={inputRef}
            value={value}
            type={type}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            maxLength={maxLength}
            className={`bg-element-gray-lighter text-body-lg-medium text-text-basic placeholder:text-text-subtier focus:outline-border-primary w-full rounded-[8px] p-4 focus:outline-1 disabled:cursor-not-allowed disabled:opacity-50 ${
              error ? 'outline-text-error outline-1' : ''
            } ${shouldShowClear ? 'pr-12' : ''} ${
              type === 'date' ? 'cursor-pointer' : ''
            } ${
              type === 'number'
                ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                : ''
            }`}
            style={
              type === 'date' && !value
                ? {
                    colorScheme: 'light',
                    color: '#8E9398',
                  }
                : type === 'date'
                  ? {
                      colorScheme: 'light',
                      color: '#18191B',
                    }
                  : undefined
            }
            {...restProps}
          />

          {shouldShowClear && (
            <button
              type='button'
              className='bg-element-gray hover:bg-element-gray-dark absolute top-1/2 right-4 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full p-1 transition-colors'
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              onClick={handleClear}
              aria-label='입력 내용 지우기'
            >
              <X size={13} strokeWidth={4} color='#fff' />
            </button>
          )}
        </div>

        {(error || helperText) && (
          <div
            className={`text-caption-sm-medium px-2 ${
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
