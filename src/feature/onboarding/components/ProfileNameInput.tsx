'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProfileNameInputProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
}

export default function ProfileNameInput({
  nickname,
  onNicknameChange,
}: ProfileNameInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      onNicknameChange(value);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-2'>
        <div className='text-body-sm-semibold text-text-basic h-5 px-2'>
          이름
        </div>
        <div className='relative'>
          <input
            type='text'
            value={nickname}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className='bg-element-gray-lighter text-body-lg-medium text-text-basic placeholder:text-text-subtier focus:outline-border-primary w-full rounded-[8px] p-4 focus:outline-1'
            placeholder='친구들이 알아볼 수 있도록 설정해주세요'
          />
          {isFocused && nickname && (
            <button
              className='bg-element-gray absolute top-1/2 right-4 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center rounded-full p-1'
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              onClick={() => onNicknameChange('')}
            >
              <X size={13} strokeWidth={4} color='#fff' />
            </button>
          )}
        </div>
        {showError && (
          <div className='text-caption-sm-medium text-text-error px-2'>
            이름은 최대 10자까지만 가능해요
          </div>
        )}
      </div>
    </div>
  );
}
