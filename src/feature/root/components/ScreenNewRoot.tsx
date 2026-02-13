'use client';

import { useCheckAuth } from '@/global/hooks/useCheckAuth';
import { useEffect, useState } from 'react';
import FlashRending from './FlashRending';

const ScreenNewRoot = () => {
  const { isAuthed } = useCheckAuth();
  const [showSplash, setShowSplash] = useState(true);

  console.log('ScreenNewRoot - isAuthed:', isAuthed, 'showSplash:', showSplash);

  // 비로그인 상태일 때만 2초 후 스플래시 숨김
  useEffect(() => {
    if (isAuthed === false) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthed]);

  // 인증 확인 중이거나 비로그인 상태에서 스플래시 표시 중일 때
  if (isAuthed === null || (isAuthed === false && showSplash)) {
    return <FlashRending />;
  }

  // 로그인 상태이거나 스플래시 시간이 지난 비로그인 사용자
  return (
    <div className='bg-background-brand flex min-h-screen items-center justify-center'>
      <div>메인 컨텐츠 영역</div>
    </div>
  );
};

export default ScreenNewRoot;
