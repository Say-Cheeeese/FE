'use client';

import { PhotoSorting } from '@/global/api/ep';
import { useSearchParams } from 'next/navigation';
import { useAlbumPhotosInfiniteQuery } from '../hooks/useAlbumPhotosInfiniteQuery';
import HeaderPhotoDetail from './HeaderPhotoDetail';
import MainPhotoDetail from './MainPhotoDetail';

interface ScreenPhotoDetailProps {
  albumId: string;
}

export default function ScreenPhotoDetail({ albumId }: ScreenPhotoDetailProps) {
  const searchParams = useSearchParams();

  const sort: PhotoSorting =
    (searchParams.get('sort') as PhotoSorting) || 'CREATED_AT';
  const photoId = Number(searchParams.get('photoId')) ?? 0;
  const { items: images } = useAlbumPhotosInfiniteQuery({
    code: albumId,
    size: 2000,
    sorting: sort,
  });

  if (images.length === 0) return null;

  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col justify-between'>
      <HeaderPhotoDetail albumId={albumId} photoId={photoId} />
      <MainPhotoDetail albumId={albumId} photoId={photoId} images={images} />
    </main>
  );
}
