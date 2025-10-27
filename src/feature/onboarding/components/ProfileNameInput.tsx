'use client';
import React, { useState } from 'react';
import Input from '@/global/components/Input';

interface ProfileNameInputProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
}

export default function ProfileNameInput({
  nickname,
  onNicknameChange,
}: ProfileNameInputProps) {
  const [error, setError] = useState<string>('');

  const handleNicknameChange = (value: string) => {
    if (value.length > 10) {
      setError('이름은 최대 10자까지만 가능해요');
    } else {
      setError('');
      onNicknameChange(value);
    }
  };

  return (
    <Input
      label='이름'
      value={nickname}
      onChange={handleNicknameChange}
      placeholder='친구들이 알아볼 수 있도록 설정해주세요'
      error={error}
    />
  );
}
