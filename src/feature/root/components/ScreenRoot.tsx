'use client';
import LogoHeader from '@/global/components/header/LogoHeader';
import LongButton from '@/global/components/LongButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SelectedList from './SelectedList';
import SelectMenu from './SelectMenu';

export default function ScreenRoot() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<
    'first' | 'second' | 'third'
  >('first');
  const handleCreateAlbumClick = () => {
    localStorage.setItem('entry', 'create-album');
    router.push('/login');
  };
  return (
    <div className='scrollbar-hide flex w-full flex-col items-center overflow-y-auto px-4'>
      {/* 헤더 */}
      <LogoHeader showLogin={true} checkAuth={false} />
      {/* 본문 */}
      <span className='typo-heading-md-bold mt-6 mb-[354px] text-center text-[#424349]'>
        딱 7일만 열리는 특별한 <br />
        공유 앨범 서비스
      </span>
      <div
        className='absolute flex justify-center'
        style={{
          width: '411px',
          height: '411px',
          top: '146px',
          background:
            'radial-gradient(55.18% 55.18% at 50% 50%, #FFDC5C 0%, rgba(255, 255, 255, 0) 100%)',
          pointerEvents: 'none',
        }}
      >
        <Image
          src='/assets/rending/phone.svg'
          width={294}
          height={288}
          priority
          alt='핸드폰 일러스트'
          style={{ zIndex: 1, pointerEvents: 'auto' }}
          className='-mt-10'
        />
      </div>
      <span className='typo-body-sm-regular mt-[58px] mb-3 text-[#747681]'>
        1000개 모임에서 치이이즈를 사용했어요
      </span>
      <LongButton
        text='우리 앨범 만들기'
        noFixed={true}
        onClick={handleCreateAlbumClick}
      />

      <Image
        src='/assets/login/triangle-polygon.svg'
        width={38}
        height={43}
        alt='삼각형'
        className='mt-7 mb-15'
      />
      <Image
        src='/assets/rending/text-group.svg'
        width={338}
        height={87}
        loading='lazy'
        alt='소개 텍스트'
      />
      <Image
        src='/assets/login/cheese-icon.svg'
        width={44.1}
        height={42.6}
        loading='lazy'
        alt='치즈 아이콘'
        className='mt-25 mb-[18.75px]'
      />
      <Image
        src='/assets/login/cheese-logo.svg'
        width={181.4}
        height={38.61}
        loading='lazy'
        alt='치즈 아이콘'
      />
      <span className='typo-body-lg-medium text-text-subtle mt-6 mb-25 text-center'>
        일정의 마무리,
        <br />
        사진 주고받기도 가볍고 귀엽게
      </span>
      <div className='typo-body-sm-semibold text-text-basic mb-6 flex flex-col items-center gap-1'>
        <span>추억을 더 소중하게 만드는</span>
        <span className='text-[20px]'>치이이즈의 세 가지 방법</span>
      </div>
      <div className='w-full px-[26px]'>
        <SelectMenu
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <SelectedList selectedMenu={selectedMenu} />
      </div>
    </div>
  );
}
