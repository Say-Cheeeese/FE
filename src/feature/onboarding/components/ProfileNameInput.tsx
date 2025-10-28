'use client';
import React, { useState } from 'react';
import XInput from '@/global/components/XInput';

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
    // 한글(완성형+자음+모음), 영문, 숫자만 허용하는 정규식
    const validPattern = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/;
    console.log(validPattern.test(value));
    // 유효하지 않은 문자가 있으면 에러 표시하지만 입력은 막지 않음
    if (!validPattern.test(value)) {
      setError('10글자 이내의 한글, 영문만 쓸 수 있어요');
    } else {
      setError('');
    }

    onNicknameChange(value);
  };

  return (
    <XInput
      label='이름'
      value={nickname}
      onChange={handleNicknameChange}
      placeholder='친구들이 알아볼 수 있도록 설정해주세요'
      error={error}
      maxLength={10}
    />
  );
}
