import Image from 'next/image';
import UploadButtonInDetail from './UploadButtonInDetail';

export default function NoPhotoBody() {
  return (
    <div className='flex flex-col items-center gap-3 pt-[11.74vh]'>
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
      <UploadButtonInDetail buttonText='앨범 채우기' />
    </div>
  );
}
