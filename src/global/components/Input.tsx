'use client';
import React, { useState, InputHTMLAttributes } from 'react';
import { X } from 'lucide-react';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** 입력 필드 위에 표시될 라벨 텍스트 */
  label?: string;
  /** 입력 필드의 현재 값 */
  value: string;
  /** 값이 변경될 때 호출되는 콜백 함수 */
  onChange: (value: string) => void;
  /** 에러 메시지 (표시 시 빨간색으로 나타남) */
  error?: string;
  /** 입력 필드 아래 표시될 도움말 텍스트 */
  helperText?: string;
  /** 포커스 시 입력 내용을 지우는 X 버튼 표시 여부 (기본값: true) */
  showClear?: boolean;
}

export default function Input({
  label,
  value,
  onChange,
  error,
  helperText,
  showClear = true,
  className,
  disabled,
  maxLength,
  ...restProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
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
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            maxLength={maxLength}
            className={`bg-element-gray-lighter text-body-lg-medium text-text-basic placeholder:text-text-subtier focus:outline-border-primary w-full rounded-[8px] p-4 focus:outline-1 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'outline-text-error outline-1' : ''} ${shouldShowClear ? 'pr-12' : ''} `}
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
