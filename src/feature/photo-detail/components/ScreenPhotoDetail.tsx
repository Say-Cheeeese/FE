'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
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
}

export default function ScreenPhotoDetail({ albumId }: ScreenPhotoDetailProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const changeActiveIndex = (newIndex: number): void => {
    setActiveIndex(newIndex);
  };

  const {
    items: images,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAlbumPhotosInfiniteQuery({
    code: albumId,
    size: 20,
  });

  const activeImage = images[activeIndex];

  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col justify-between'>
      <HeaderPhotoDetail title={'김수한무~'} />
      <SwiperPhotoList
        activeIndex={activeIndex}
        changeActiveIndex={changeActiveIndex}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        images={images}
      />
      {/* TODO : 필드 다 옵셔널인데 required표시 가능한 지 백엔드 문의중. */}
      <FooterPhotoDetail
        photoId={activeImage?.photoId ?? 0}
        isLiked={!!activeImage?.isLiked}
        likeCnt={activeImage?.likeCnt ?? 0}
        photoUploader={''}
        isRecentlyDownloaded={!!activeImage?.isRecentlyDownloaded}
        imageUrl={
          activeImage?.thumbnailUrl ??
          'https://github.com/user-attachments/assets/b40be8db-c22e-4c44-a0ed-d2e194b8ecf6'
        } // TODO : imageUrl로 바꿔야함
      />
    </main>
  );
}
