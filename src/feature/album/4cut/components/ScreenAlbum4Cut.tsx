'use client';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import PersonSvg from '@/global/svg/PersonSvg';
import { Download, Menu, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Container4Cut from './Container4Cut';

interface ScreenAlbum4CutProps {
  albumId: string;
}

export default function ScreenAlbum4Cut({ albumId }: ScreenAlbum4CutProps) {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    // TODO : 치즈네컷 확정
    setIsConfirmed(true);
  };

  const handleDownload = () => {
    // TODO : 다운로드 로직
    console.log('다운로드 클릭');
  };

  const handleShare = () => {
    // TODO : 공유 로직
    console.log('공유하기 클릭');
  };

  return (
    <>
      <CustomHeader
        isShowBack
        title='김수한무거북이와두루미삼천'
        rightContent={
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => router.push(`/album/detail/${albumId}/sidebar`)}
            >
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </button>
          </div>
        }
      />
      <section className='mt-8 flex flex-col items-center'>
        <div className='typo-body-lg-semibold mb-2'>현재 TOP 4 사진</div>
        <Container4Cut />
      </section>

      <div className='fixed bottom-5 flex w-full flex-col items-center px-4'>
        {isConfirmed ? (
          <div className='flex w-full max-w-[430px] justify-center gap-3'>
            <button
              onClick={handleDownload}
              className='bg-button-tertiary-fill text-text-subtle flex flex-1 items-center justify-center gap-1 rounded-[8px] py-[15px]'
            >
              <Download
                width={24}
                height={24}
                color='var(--color-icon-basic)'
              />
              <span className='typo-body-1xl-semibold'>다운로드</span>
            </button>
            <button
              onClick={handleShare}
              className='bg-button-tertiary-fill text-text-subtle flex flex-1 items-center justify-center gap-1 rounded-[8px] py-[15px]'
            >
              <Send width={24} height={24} color='var(--color-icon-basic)' />
              <span className='typo-body-1xl-semibold'>공유하기</span>
            </button>
          </div>
        ) : (
          <>
            <div className='typo-body-sm-semibold flex items-center gap-2 pb-3'>
              <span>띱 진행상황</span>
              <div className='flex items-center'>
                <span className='p-[5px]'>
                  <PersonSvg />
                </span>
                <span>7 / 8 명</span>
              </div>
            </div>
            <ConfirmModal
              trigger={<LongButton text='사진 확정하기' noFixed />}
              title='이대로 확정하시겠어요?'
              description='예쁜 치즈네컷을 만들어드릴게요.'
              confirmText='확정하기'
              onConfirm={handleConfirm}
            />
          </>
        )}
      </div>
    </>
  );
}
