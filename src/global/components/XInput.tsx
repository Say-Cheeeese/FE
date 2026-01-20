'use client';
import { X } from 'lucide-react';
import React, { InputHTMLAttributes, useRef, useState } from 'react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** 인풋 상단 라벨 텍스트 */
  label?: string;
  /** 인풋 값 (항상 string) */
  value: string;
  /** 값 변경 시 호출되는 콜백 (string) */
  onChange: (value: string) => void;
  /** 에러 메시지 (있으면 하단에 표시) */
  error?: string;
  /** 하단 서브 텍스트(설명, 안내 등) */
  helperText?: string;
  /** X 버튼(입력 내용 지우기) 노출 여부, false면 아예 안보임 (기본값 true) */
  showClear?: boolean;
  /** true면 입력값 없어도 X 버튼 항상 노출, false면 입력값 있을 때만 노출 (기본값 false) */
  showClearAlways?: boolean;
}

export default function XInput({
  label,
  value,
  onChange,
  error,
  helperText,
  showClear = true,
  showClearAlways = false,
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

  const shouldShowClear =
    showClear && isFocused && !disabled && (showClearAlways || value);

  return (
    <div className={className}>
      <div className='flex flex-col gap-2'>
        {label && (
          <div className='typo-body-sm-semibold text-text-basic h-5 px-2'>
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
            className={`bg-element-gray-lighter typo-body-lg-medium text-text-basic placeholder:text-text-subtler w-full rounded-[8px] p-4 disabled:cursor-not-allowed disabled:opacity-50 ${error
                ? 'outline-text-error outline-1'
                : 'focus:outline-border-primary focus:outline-1'
              } ${shouldShowClear ? 'pr-12' : ''} ${type === 'date' ? 'cursor-pointer' : ''
              } ${type === 'number'
                ? '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                : ''
              }`}
            style={
              type === 'date' && !value
                ? {
                  color: '#8E9398',
                }
                : type === 'date'
                  ? {
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
            className={`typo-caption-sm-medium px-2 ${error ? 'text-text-error' : 'text-text-subtier'
              }`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    </div>
  );
}
