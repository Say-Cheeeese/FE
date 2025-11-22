'use client';
import { DEFAULT_PROFILE_IMAGE } from '@/global/constants/images';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePhotoDetailQuery } from '../hooks/usePhotoDetailQuery';

interface HeaderPhotoDetailProps {
  albumId: string;
  photoId: number;
}

export default function HeaderPhotoDetail({
  albumId,
  photoId,
}: HeaderPhotoDetailProps) {
  const router = useRouter();
  const { data } = usePhotoDetailQuery({
    albumId,
    photoId: photoId,
    options: { enabled: !!photoId },
  });

  const handleClose = (): void => {
    router.back();
  };

  return (
    <section className='flex shrink-0 items-center justify-between gap-3 p-5'>
      <div className='flex h-8 w-8 shrink-0 items-center justify-center text-3xl'>
        <img
          src={data?.profileImage || DEFAULT_PROFILE_IMAGE}
          alt='프로필 사진'
          width={32}
          height={32}
          className='rounded-full text-xs'
        />
      </div>
      <span className='typo-heading-sm-semibold text-text-basic-inverse flex-1 truncate'>
        {data?.name}
      </span>
      <button type='button' onClick={handleClose}>
        <X width='24' height='24' color='white' />
      </button>
    </section>
  );
}
