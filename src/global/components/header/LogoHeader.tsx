import Image from 'next/image';
import Link from 'next/link';

interface LogoHeaderProps {
  showLogin?: boolean;
  bgColor?: string;
}

export default function LogoHeader({
  showLogin = true,
  bgColor = 'white',
}: LogoHeaderProps) {
  return (
    <>
      <div
        className='border-divider-gray fixed top-0 right-0 left-0 z-50 border-b'
        style={{ background: bgColor }}
      >
        <div className='mx-auto flex h-18 w-full max-w-[430px] items-center justify-between px-5'>
          <Image
            src='/assets/login/cheese-logo.svg'
            width={120}
            height={120}
            alt='치즈 아이콘'
          />
          {showLogin && (
            <Link href='/login'>
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
