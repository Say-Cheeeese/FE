'use client';

import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import LongButton from '@/global/components/LongButton';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

type UploadButtonProps = {
  albumId: string;
};

export default function UploadButton({ albumId }: UploadButtonProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    trackGaEvent(GA_EVENTS.first_upload_confirm, { album_id: albumId });
    fileInputRef.current?.click();
  }

  const queryClient = useQueryClient();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(e, albumId, router, { queryClient });
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        onChange={onFileChange}
        className='hidden'
      />
      <div className='w-full px-4'>
        <LongButton
          text='내가 찍은 사진 올리기'
          noFixed={true}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
}
