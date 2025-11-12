'use client';

import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import LongButton from '@/global/components/LongButton';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

type UploadButtonProps = {
  albumId: string;
};

export default function UploadButton({ albumId }: UploadButtonProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    await handleFileUpload(e, albumId, router);
  }

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
