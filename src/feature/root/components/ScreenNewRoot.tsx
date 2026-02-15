'use client';

import { useCheckAuth } from '@/global/hooks/useCheckAuth';
import { useEffect, useState } from 'react';
import FlashRending from './FlashRending';
import { RendingBody } from './RendingBody';

const ScreenNewRoot = () => {
  const { isAuthed } = useCheckAuth();
  const [showSplash, setShowSplash] = useState(true);

  // 비로그인 상태일 때만 2초 후 스플래시 숨김
  useEffect(() => {
    if (isAuthed === false) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthed]);

  // 인증 확인 중일 때
  if (isAuthed === null) {
    return <FlashRending />;
  }

  // 비로그인이고 스플래시 표시 중일 때
  if (isAuthed === false && showSplash) {
    return <FlashRending />;
  }

  // 로그인 상태이거나 비로그인에서 스플래시 시간이 지난 경우
  return (
    <div className='bg-background-brand flex h-screen flex-col items-center justify-center'>
      <RendingBody />
    </div>
  );
};

export default ScreenNewRoot;
