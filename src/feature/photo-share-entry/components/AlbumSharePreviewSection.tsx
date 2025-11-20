'use client';

import ThreeTags_Fill_Album from '@/../public/assets/album/3Tags_Fill_Album.json';
import { useGetAlbumInvitation } from '@/feature/album/detail/hooks/useGetAlbumInvitation';
import { useAlbumPhotosInfiniteQuery } from '@/feature/photo-detail/hooks/useAlbumPhotosInfiniteQuery';
import MarqueeCarousel from '@/global/components/carousel/MarqueeCarousel';
import { DEFAULT_PROFILE_IMAGE } from '@/global/constants/images';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import dynamic from 'next/dynamic';
import AlbumPreviewCard from './AlbumPreviewCard';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface AlbumSharePreviewSectionProps {
  albumId: string;
}

export default function AlbumSharePreviewSection({
  albumId,
}: AlbumSharePreviewSectionProps) {
  const { data, isPending, isError } = useGetAlbumInvitation(albumId);
  const { items, isLoading: isItemsLoading } = useAlbumPhotosInfiniteQuery({
    code: albumId,
  });

  if (isPending || isItemsLoading) return null;
  if (isError) return null;

  const isEmpty = items.length === 0;

  return (
    <>
      <div className='bg-element-gray-lighter flex h-20 w-20 items-center justify-center rounded-full'>
        <span className='text-4xl'>
          {data?.themeEmoji ? convertUnicodeToEmoji(data.themeEmoji) : '😀'}
        </span>
      </div>

      <div className='mt-3 flex flex-col items-center px-6'>
        <h2 className='typo-heading-md-semibold text-text-basic'>
          {data?.title ?? '앨범 제목'}
        </h2>
        <p className='typo-body-md-medium text-text-subtle'>
          {data?.eventDate ?? '-'}
        </p>
      </div>

      <div className='my-8 w-full'>
        {isEmpty ? (
          <Lottie animationData={ThreeTags_Fill_Album} />
        ) : (
          <MarqueeCarousel
            items={items.map((item, i) => (
              <div key={`${item.imageUrl}-${i}`}>
                <AlbumPreviewCard
                  imageUrl={item.imageUrl ?? ''}
                  nickname={item.name ?? ''}
                  // TODO : API에서 프사 받아야함.
                  profileUrl={DEFAULT_PROFILE_IMAGE}
                />
              </div>
            ))}
            itemWidth={180}
          />
        )}
      </div>
    </>
  );
}
