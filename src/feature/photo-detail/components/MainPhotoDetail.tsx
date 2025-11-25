import { PhotoListResponseSchema } from '@/global/api/ep';
import { DEFAULT_PROFILE_IMAGE } from '@/global/constants/images';
import dynamic from 'next/dynamic';
import { useState } from 'react';
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

interface MainPhotoDetailProps {
  images: PhotoListResponseSchema[];
  albumId: string;
  photoId: number | null;
}

export default function MainPhotoDetail({
  albumId,
  images,
  photoId,
}: MainPhotoDetailProps) {
  const [activeIndex, setActiveIndex] = useState(
    findImageIndexByPhotoId(images, photoId),
  );

  const changeActiveIndex = (newIndex: number): void => {
    setActiveIndex(newIndex);
  };

  const activeImage = images[activeIndex];
  if (!activeImage) return null;

  return (
    <>
      <HeaderPhotoDetail
        name={activeImage.name}
        profileImageUrl={DEFAULT_PROFILE_IMAGE}
      />
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
        imageUrl={activeImage.thumbnailUrl}
      />
    </>
  );
}

function findImageIndexByPhotoId(
  images: PhotoListResponseSchema[],
  targetPhotoId: number | null,
): number {
  if (!targetPhotoId) return -1;

  return images.findIndex((image) => image.photoId === targetPhotoId);
}
