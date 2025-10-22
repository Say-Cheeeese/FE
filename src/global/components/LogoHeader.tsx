import Image from 'next/image';
import Link from 'next/link';

interface LogoHeaderProps {
  showLogin?: boolean;
}

export default function LogoHeader({ showLogin = true }: LogoHeaderProps) {
  return (
    <div className='fixed top-0 left-0 right-0 bg-white z-50'>
      <div className='mx-auto max-w-[393px] w-full flex justify-between px-5 h-18 items-center'>
        <Image
          src='/assets/login/cheese-logo.svg'
          width={120}
          height={120}
          alt='치즈 아이콘'
        />
        {showLogin && (
          <Link href='/login'>
            <div className='py-[10px] px-3 cursor-pointer'>
              <span className='text-body-sm-medium text-text-basic'>
                로그인
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
