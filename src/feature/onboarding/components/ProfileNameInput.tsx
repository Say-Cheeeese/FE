'use client';
import React, { useState } from 'react'
import { X } from 'lucide-react'
export default function ProfileNameInput() {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setInputValue(value);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-2'>
        <div className='h-5 text-body-sm-semibold text-text-basic px-2'>이름</div>
        <div className='relative'>
          <input 
            type='text' 
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className='p-4 bg-element-gray-lighter w-full rounded-[8px] text-body-lg-medium text-text-basic placeholder:text-text-subtier focus:outline-1 focus:outline-border-primary' 
            placeholder='친구들이 알아볼 수 있도록 설정해주세요'
          />
          {isFocused && inputValue && (
            <button
              className='absolute right-4 top-1/2 transform -translate-y-1/2 p-1 w-5 h-5 bg-element-gray flex items-center justify-center rounded-full'
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              onClick={() => setInputValue('')}
            >
                <X size={13} strokeWidth={4} color='#fff'/>
            </button>
          )}
        </div>
        {showError && (
          <div className='px-2 text-caption-sm-medium text-text-error'>
            이름은 최대 10자까지만 가능해요
          </div>
        )}
      </div>
    </div>
  )
}
