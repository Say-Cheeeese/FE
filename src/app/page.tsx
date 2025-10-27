import LogoHeader from '@/global/components/LogoHeader';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
export default function LoginPage() {
  return (
    <div className='flex min-h-screen w-full flex-col px-4'>
      {/* 헤더 */}
      <LogoHeader showLogin={true} />
      {/* 본문 */}
      <div className='mt-18 flex-1'>
        <ChevronRight className='h-6 w-6' strokeWidth={1} color='#000' />
      </div>
      {/* footer */}
      <div className='mb-[70px] flex flex-col items-center gap-3'>
        <Link
          href='/login'
          className='bg-button-primary-fill flex h-14 w-full cursor-pointer flex-col items-center justify-center rounded-[8px]'
        >
          <span className='text-body-1xl-semibold text-text-primary'>
            우리 앨범 만들기
          </span>
        </Link>
        <span className='text-body-sm-regular text-text-subtler mb-[14px]'>
          100명이 앨범 만들고 추억 남기는 중
        </span>
        <Image
          src='/assets/login/triangle-polygon.svg'
          width={38}
          height={43}
          alt='삼각형'
        />
      </div>
    </div>
  );
}
