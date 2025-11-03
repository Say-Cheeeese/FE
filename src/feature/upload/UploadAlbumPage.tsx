'use client';

import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import AlbumPreviewCard from '@/feature/photo-share-entry/components/AlbumPreviewCard';
import CheckNoImgModal from '@/feature/upload/CheckNoImgModal';
import MarqueeCarousel from '@/global/components/carousel/MarqueeCarousel';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';

interface AlbumCard {
  imageUrl: string;
  nickname: string;
  profileUrl: string;
}

// ✅ API 연동 전까지는 상수로 유지
const MOCK_CARDS: AlbumCard[] = [];

export default function UploadAlbumPage() {
  const cards = MOCK_CARDS; // ✅ 나중에 API 결과로 교체 예정
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const albumId = params.albumId as string;
    await handleFileUpload(e, albumId, router);
  }

  return (
    <div className='flex flex-col'>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        onChange={onFileChange}
        className='hidden'
      />
      <CustomHeader title='앨범 채우기' />
      <main className='flex min-h-[calc(100vh-72px)] flex-col items-center justify-between pt-6 pb-[calc(20px+env(safe-area-inset-bottom))]'>
        <div className='flex w-full flex-col items-center'>
          <div className='bg-element-gray-lighter flex h-20 w-20 items-center justify-center rounded-full'>
            <span className='text-4xl'>😀</span>
          </div>

          <div className='mt-3 flex flex-col items-center px-6'>
            <h2
              className={
                cards.length === 0
                  ? 'typo-heading-md-bold text-text-brand'
                  : 'typo-heading-md-semibold text-text-basic'
              }
            >
              큐시즘 MT
            </h2>
            {cards.length === 0 ? (
              <p className='typo-heading-sm-semibold text-text-subtle'>
                앨범을 채워주세요
              </p>
            ) : (
              <p className='typo-body-md-medium text-text-subtle'>2025.08.23</p>
            )}
          </div>

          {cards.length > 0 && (
            <div className='my-8 w-full'>
              <MarqueeCarousel
                items={cards.map((item, i) => (
                  <div key={i}>
                    <AlbumPreviewCard
                      imageUrl={item.imageUrl}
                      nickname={item.nickname}
                      profileUrl={item.profileUrl}
                    />
                  </div>
                ))}
                itemWidth={180}
              />
            </div>
          )}
        </div>

        <div className='flex w-full flex-col items-center'>
          {/* 말풍선 안내는 LongButton 위에 항상 노출 */}
          <div className='relative mt-6 mb-4 px-6'>
            <div className='relative mx-auto w-fit rounded-full bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]'>
              <div className='typo-body-md-medium text-text-basic flex items-center space-x-2'>
                <span role='img' aria-label='카메라'>
                  📸
                </span>
                <span>지금 930장 더 올릴 수 있어요</span>
              </div>
              <div className='absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2'>
                <div className='absolute inset-0 rotate-45 bg-white shadow-[2px_3px_4px_rgba(0,0,0,0.1)]' />
              </div>
            </div>
          </div>
          <div className='w-full px-4'>
            <LongButton
              text='내가 찍은 사진 공유하기'
              noFixed={true}
              onClick={handleButtonClick}
            />
          </div>
          <CheckNoImgModal
            trigger={
              <button
                type='button'
                className='typo-body-sm-medium text-text-subtler mt-3'
              >
                올릴 사진이 없어요
              </button>
            }
          />
        </div>
      </main>
    </div>
  );
}
