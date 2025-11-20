'use client';

import { PhotoSorting } from '@/global/api/ep';
import { useAlbumPhotosInfiniteQuery } from '../hooks/useAlbumPhotosInfiniteQuery';
import HeaderPhotoDetail from './HeaderPhotoDetail';
import MainPhotoDetail from './MainPhotoDetail';

interface ScreenPhotoDetailProps {
  albumId: string;
  sort: PhotoSorting;
  photoId?: number;
}

export default function ScreenPhotoDetail({
  albumId,
  sort,
  photoId,
}: ScreenPhotoDetailProps) {
  const { items: images } = useAlbumPhotosInfiniteQuery({
    code: albumId,
    size: 2000,
    sorting: sort,
  });

  if (!images) return null;

  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col justify-between'>
      <HeaderPhotoDetail albumId={albumId} photoId={photoId} />
      <MainPhotoDetail albumId={albumId} photoId={photoId} images={images} />
    </main>
  );
}
