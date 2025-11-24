'use client';
import { useGetAlbumAvailableCount } from '@/feature/album/detail/hooks/useGetAlbumAvailableCount';
import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import CheckNoImgModal from '@/feature/upload/components/CheckNoImgModal';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import BubbleHint from '@/global/components/tooltip/BubbleTooltip';
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
          <BubbleHint
            className='mb-6'
            message={`📸 지금 ${data?.availableCount}장 더 올릴 수 있어요`}
          />

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
