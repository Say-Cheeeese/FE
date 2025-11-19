'use client';

import { PhotoListResponseSchema, PhotoSorting } from '@/global/api/ep';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useAlbumPhotosInfiniteQuery } from '../hooks/useAlbumPhotosInfiniteQuery';
import FooterPhotoDetail from './FooterPhotoDetail';
import HeaderPhotoDetail from './HeaderPhotoDetail';
const SwiperPhotoList = dynamic(() => import('./SwiperPhotoList'), {
  ssr: false,
  loading: () => (
    <div className='flex h-full flex-1 items-center justify-center'>
      <div className='h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent' />
    </div>
  ),
});

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
  const [activeIndex, setActiveIndex] = useState(2);

  const changeActiveIndex = (newIndex: number): void => {
    setActiveIndex(newIndex);
  };

  const { items: images } = useAlbumPhotosInfiniteQuery({
    code: albumId,
    size: 2000,
    sorting: sort,
  });

  useEffect(() => {
    const index = findImageIndexByPhotoId(images, photoId);
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [images, photoId]);

  const activeImage = images[activeIndex];
  if (!activeImage) return null;

  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col justify-between'>
      <HeaderPhotoDetail albumId={albumId} />
      <SwiperPhotoList
        activeIndex={activeIndex}
        changeActiveIndex={changeActiveIndex}
        images={images}
      />
      <FooterPhotoDetail
        albumId={albumId}
        photoId={activeImage.photoId}
        isLiked={activeImage.isLiked}
        likeCnt={activeImage.likeCnt}
        isRecentlyDownloaded={activeImage.isRecentlyDownloaded}
        imageUrl={activeImage.imageUrl}
      />
    </main>
  );
}

function findImageIndexByPhotoId(
  images: PhotoListResponseSchema[],
  targetPhotoId?: number,
): number {
  if (!targetPhotoId) return -1;

  return images.findIndex((image) => image.photoId === targetPhotoId);
}
