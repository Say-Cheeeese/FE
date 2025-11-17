'use client';
import { useGetUserMe } from '@/feature/main/hooks/useGetUserMe';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

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
  const { isSuccess: isLoggedIn, isLoading } = useGetUserMe({
    enabled: showLogin,
  });
  const shouldShowLogin = showLogin && !isLoading && !isLoggedIn;

  // 로그인 버튼 클릭 시 entry를 main으로 저장
  const handleLoginClick = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('entry', 'main');
    }
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 right-0 left-0 z-40 ${border ? 'border-divider-gray border-b' : ''}`}
        style={{ background: bgColor }}
      >
        <div className='mx-auto flex h-18 w-full max-w-[430px] items-center justify-between px-5'>
          <Image
            src='/assets/login/cheese-logo.svg'
            width={120}
            height={120}
            alt='치즈 아이콘'
          />
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
