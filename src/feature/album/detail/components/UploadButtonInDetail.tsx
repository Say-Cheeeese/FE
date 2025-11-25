'use client';

import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import { EP } from '@/global/api/ep';
import LongButton from '@/global/components/LongButton';
import Toast from '@/global/components/toast/Toast';
import { useUploadingStore } from '@/store/useUploadingStore';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';

interface UploadButtonInDetailProps {
  buttonText?: string;
}

export default function UploadButtonInDetail({
  buttonText,
}: UploadButtonInDetailProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUploaded = useUploadingStore((state) => state.isUploaded);
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const albumId =
    typeof params.albumId === 'string'
      ? params.albumId
      : Array.isArray(params.albumId)
        ? params.albumId[0]
        : '';

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const { success } = await handleFileUpload(e, albumId, router, {
      stay: true,
    });

    await queryClient.invalidateQueries({
      queryKey: [EP.album.photos(albumId)],
    });

    if (success) {
      setTimeout(() => Toast.check(`총 ${success}장을 앨범에 채웠어요.`), 2000);
    }
  };

  const handleButtonClick = () => {
    if (!isUploaded) fileInputRef.current?.click();
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
      <LongButton
        text={isUploaded ? '업로드중이에요.' : buttonText || '앨범 채우기'}
        noFixed={false}
        onClick={handleButtonClick}
        disabled={isUploaded}
      />
    </>
  );
}
