import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import LongButton from '@/global/components/LongButton';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function NoPhotoBody() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  // albumId를 URL에서 추출 (app router 기준)
  const params = useParams();
  const albumId =
    typeof params.albumId === 'string'
      ? params.albumId
      : Array.isArray(params.albumId)
        ? params.albumId[0]
        : '';

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    await handleFileUpload(e, albumId, router);
    setIsUploading(false);
    // handleFileUpload에서 사진이 없으면 이동하지 않으므로, 여기선 아무것도 안 함
  }

  function handleButtonClick() {
    if (!isUploading) fileInputRef.current?.click();
  }

  return (
    <div className='flex flex-col items-center gap-3 pt-[11.74vh]'>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        onChange={onFileChange}
        className='hidden'
      />
      <Image
        src='/assets/album/no-album-icon.svg'
        width={74}
        height={84}
        alt='사진 없음'
        priority
      />
      <span className='typo-caption-md-regular text-text-disabled'>
        앨범에 아직 사진이 없어요
      </span>
      <button
        className='bg-button-tertiary-fill text-text-subtle typo-body-sm-medium h-8 w-[73px] rounded-[4px]'
        onClick={() => window.location.reload()}
      >
        새로고침
      </button>
      <LongButton
        text={isUploading ? '업로드중이에요.' : '앨범 채우기'}
        noFixed={true}
        onClick={handleButtonClick}
        disabled={isUploading}
      />
    </div>
  );
}
