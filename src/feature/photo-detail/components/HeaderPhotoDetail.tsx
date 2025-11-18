'use client';
import { useGetAlbumInfo } from '@/feature/album/detail/hooks/useGetAlbumInfo';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderPhotoDetailProps {
  albumId: string;
}

export default function HeaderPhotoDetail({ albumId }: HeaderPhotoDetailProps) {
  const router = useRouter();
  const { data } = useGetAlbumInfo(albumId);

  const handleClose = (): void => {
    router.back();
  };

  return (
    <section className='flex shrink-0 items-center justify-between gap-3 p-5'>
      <div className='flex h-8 w-8 shrink-0 items-center justify-center text-3xl'>
        {data?.themeEmoji ? convertUnicodeToEmoji(data.themeEmoji) : '😀'}
      </div>
      <span className='typo-heading-sm-semibold text-text-basic-inverse flex-1 truncate'>
        {data?.title}
      </span>
      <button type='button' onClick={handleClose}>
        <X width='24' height='24' color='white' />
      </button>
    </section>
  );
}
