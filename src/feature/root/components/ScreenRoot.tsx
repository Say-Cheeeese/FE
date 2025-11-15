'use client';
import LogoHeader from '@/global/components/header/LogoHeader';
import LongButton from '@/global/components/LongButton';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ScreenRoot() {
  const router = useRouter();
  const handleCreateAlbumClick = () => {
    localStorage.setItem('entry', 'create-album');
    router.push('/login');
  };
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
        <LongButton
          text='우리 앨범 만들기'
          noFixed={true}
          onClick={handleCreateAlbumClick}
        />
        <span className='typo-body-sm-regular text-text-subtler mb-[14px]'>
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
