'use client';
import { useGetAlbumAvailableCount } from '@/feature/album/detail/hooks/useGetAlbumAvailableCount';
import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import CheckNoImgModal from '@/feature/upload/components/CheckNoImgModal';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import AlbumSharePreviewSection from './AlbumSharePreviewSection';

interface ScreenPhotoShareEntryProps {
  albumId: string;
}

export default function ScreenPhotoShareEntry({
  albumId,
}: ScreenPhotoShareEntryProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useGetAlbumAvailableCount(albumId);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(e, albumId, router);
  };

  return (
    <>
      <CustomHeader title='앨범 채우기' />

      <main className='flex min-h-[calc(100dvh-72px)] flex-col items-center pt-8'>
        <AlbumSharePreviewSection albumId={albumId} />

        <div className='mb-5 flex w-full flex-1 flex-col items-center justify-end'>
          {/* 말풍선 */}
          <div className='relative mt-6 mb-6 px-6'>
            <div className='relative mx-auto w-fit rounded-2xl bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]'>
              <div className='typo-body-md-medium text-text-basic flex items-center space-x-2'>
                <span role='img' aria-label='카메라'>
                  📸
                </span>

                <span>지금 {data?.availableCount}장 더 올릴 수 있어요</span>
              </div>
              {/* 말풍선 꼬리 */}
              <div className='absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2'>
                <div className='absolute inset-0 rotate-45 bg-white shadow-[2px_3px_4px_rgba(0,0,0,0.1)]' />
              </div>
            </div>
          </div>

          <div className='w-full px-6'>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              multiple
              onChange={onFileChange}
              className='hidden'
            />
            <LongButton
              text='내가 찍은 사진 올리기'
              noFixed
              onClick={handleUpload}
            />
          </div>

          <CheckNoImgModal
            albumId={albumId}
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
    </>
  );
}
