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
  const photoIdParam = searchParams.get('photoId');
  const photoId = photoIdParam === null ? null : Number(photoIdParam);
  const { items: images } = useAlbumPhotosInfiniteQuery({
    code: albumId,
    size: 2000,
    sorting: sort,
  });

  if (images.length === 0) return null;

  const currentPhotoId = photoId ?? images[0].photoId;

  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col justify-between'>
      <HeaderPhotoDetail albumId={albumId} photoId={currentPhotoId} />
      <MainPhotoDetail albumId={albumId} photoId={photoId} images={images} />
    </main>
  );
}
