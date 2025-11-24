'use client';
import { useAlbumEnterMutation } from '@/feature/album-entry/hooks/useAlbumEnterMutation';
import { useGetAlbumAvailableCount } from '@/feature/album/detail/hooks/useGetAlbumAvailableCount';
import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import CheckNoImgModal from '@/feature/upload/components/CheckNoImgModal';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import BubbleTooltip from '@/global/components/tooltip/BubbleTooltip';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import AlbumSharePreviewSection from './AlbumSharePreviewSection';

interface ScreenPhotoShareEntryProps {
  albumId: string;
}

export default function ScreenPhotoShareEntry({
  albumId,
}: ScreenPhotoShareEntryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInvite = searchParams.get('isInvite');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync } = useAlbumEnterMutation();
  const { data } = useGetAlbumAvailableCount(albumId);

  useEffect(() => {
    if (!isInvite) return;

    mutateAsync({ albumId });
  }, []);

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
          <div className='relative w-full px-6'>
            {data?.availableCount && (
              <BubbleTooltip
                className='absolute -top-14 left-1/2 -translate-x-1/2'
                message={`📸 지금 ${data.availableCount}장 더 올릴 수 있어요`}
              />
            )}
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
