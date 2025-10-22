import LogoHeader from '@/global/components/LogoHeader';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
export default function LoginPage() {
  return (
    <div className='px-4 w-full min-h-screen flex flex-col'>
      {/* 헤더 */}
      <LogoHeader showLogin={true} />
      {/* 본문 */}
      <div className='flex-1 mt-18'>
        <ChevronRight className='w-6 h-6' strokeWidth={1} color='#000'/>
      </div>
      {/* footer */}
      <div className='flex flex-col items-center gap-3 mb-[70px]'>
        <Link
          href='/login'
          className='flex flex-col items-center justify-center cursor-pointer w-full h-14 bg-button-primary-fill rounded-[8px]'
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
