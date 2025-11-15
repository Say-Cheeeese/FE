'use client';

import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import LongButton from '@/global/components/LongButton';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

interface UploadButtonInDetailProps {
  buttonText?: string;
}

export default function UploadButtonInDetail({
  buttonText,
}: UploadButtonInDetailProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const albumId =
    typeof params.albumId === 'string'
      ? params.albumId
      : Array.isArray(params.albumId)
        ? params.albumId[0]
        : '';

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    await handleFileUpload(e, albumId, router, { stay: true });
    setIsUploading(false);
    window.location.reload();
  };

  const handleButtonClick = () => {
    if (!isUploading) fileInputRef.current?.click();
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
        text={isUploading ? '업로드중이에요.' : buttonText || '앨범 채우기'}
        noFixed={false}
        onClick={handleButtonClick}
        disabled={isUploading}
      />
    </>
  );
}
