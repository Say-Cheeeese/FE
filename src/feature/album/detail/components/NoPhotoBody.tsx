import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

interface NoPhotoBodyProps {
  text: string;
  isRefresh?: boolean;
}

export default function NoPhotoBody({ text, isRefresh }: NoPhotoBodyProps) {
  const queryClient = useQueryClient();
  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };
  return (
    <div className='flex flex-col items-center gap-3 pt-[11.74vh]'>
      <Image
        src='/assets/album/no-album-icon.svg'
        width={74}
        height={84}
        alt='사진 없음'
        priority
      />
      <span className='typo-caption-md-regular text-text-disabled'>{text}</span>
      {isRefresh && (
        <button
          className='bg-button-tertiary-fill text-text-subtle typo-body-sm-medium h-8 w-[73px] rounded-[4px]'
          onClick={handleRefresh}
        >
          새로고침
        </button>
      )}
    </div>
  );
}
