import KakaoSignupButton from '@/feature/login/components/KakaoSignupButton';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className='flex h-screen w-full flex-col px-4'>
      {/* <LogoHeader showLogin={false} /> */}
      <div className='mt-[173px] flex w-full flex-1 flex-col items-center gap-[17px]'>
        <Image
          src='/assets/login/cheese-icon.svg'
          width={68}
          height={68}
          alt='치즈 아이콘'
        />
        <Image
          src='/assets/login/cheese-logo.svg'
          width={120}
          height={120}
          alt='치즈 아이콘'
        />
        <span className='typo-body-lg-semibold text-text-subtle'>
          우리가 특별한 순간을 기억하는 법
        </span>
      </div>
      <div className='mt-10 flex flex-col gap-2'>
        <div className='flex flex-col items-center justify-center'>
          <div className='bg-surface-inverse h-9 w-[177px] cursor-pointer rounded-full py-2 pl-[14px]'>
            <span className='typo-body-sm-semibold text-text-basic-inverse flex items-center gap-1'>
              ⚡️3초만에 빠른 회원가입
            </span>
          </div>
          <Image
            src='/assets/login/reverse-triangle-black.svg'
            width={14}
            height={8}
            alt='삼각형'
          />
        </div>
        <KakaoSignupButton />
      </div>
    </div>
  );
}
