'use client';
import { useCheckAuth } from '@/global/hooks/useCheckAuth';
import Link from 'next/link';
import { useCallback } from 'react';
import SvgLogo from './svg/SvgLogo';

interface LogoHeaderProps {
  showLogin?: boolean;
  bgColor?: string;
  border?: boolean;
}

export default function LogoHeader({
  showLogin = true,
  bgColor = 'white',
  border = false,
}: LogoHeaderProps) {
  const { isAuthed } = useCheckAuth();

  const handleLoginClick = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.cookie = 'entry=main; path=/;';
    }
  }, []);
  const shouldShowLogin = showLogin && !isAuthed;

  return (
    <>
      <div
        className={`fixed top-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 transform ${border ? 'border-divider-gray border-b' : ''}`}
        style={{ background: bgColor }}
      >
        <div className='mx-auto flex h-18 w-full max-w-[430px] items-center justify-between px-5'>
          <SvgLogo />
          {shouldShowLogin && (
            <Link href='/login' onClick={handleLoginClick}>
              <div className='cursor-pointer px-3 py-2.5'>
                <span className='typo-body-sm-medium text-text-basic'>
                  로그인
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* 헤더로인해 가려지는 영역 방지 */}
      <div style={{ height: 72 }} />
    </>
  );
}
