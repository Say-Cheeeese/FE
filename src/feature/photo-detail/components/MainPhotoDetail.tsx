import { PhotoListResponseSchema } from '@/global/api/ep';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FooterPhotoDetail from './FooterPhotoDetail';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(
    findImageIndexByPhotoId(images, photoId),
  );

  const changeActiveIndex = (newIndex: number): void => {
    setActiveIndex(newIndex);

    const newPhotoId = images[newIndex]?.photoId;
    if (!newPhotoId) return;

    // 기존 searchParams 복사 후 photoId만 갱신
    const params = new URLSearchParams(searchParams.toString());
    params.set('photoId', String(newPhotoId));

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const activeImage = images[activeIndex];
  if (!activeImage) return null;

  return (
    <>
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
