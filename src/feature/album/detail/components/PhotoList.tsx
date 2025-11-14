import { PhotoListResponseSchema } from '@/global/api/ep';
import PhotoBox from '@/global/components/photo/PhotoBox';
import { buildQuery } from '@/global/utils/buildQuery';
import {
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { AlbumDetailMode } from './ScreenAlbumDetail';

const SELECT_MODE_MIN_HEIGHT = '800px';

export const ID_PHOTO_LIST = 'photo-list';
export const ID_PHOTO_LIST_ANCHOR = 'photo-list-anchor';

interface PhotoListProps {
  albumId: string;
  selectable?: boolean;
  onTogglePhoto?: (photoId: number) => void;
  selectedList: number[];
  changeMode: (newMode: AlbumDetailMode) => void;
  mode: AlbumDetailMode;
  photos: PhotoListResponseSchema[];
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function PhotoList({
  albumId,
  selectable = false,
  onTogglePhoto,
  selectedList,
  changeMode,
  mode,
  photos,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PhotoListProps) {
  const router = useRouter();
  const photoListRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '200px 0px',
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handlePhotoPress = (photoId: number): void => {
    if (!selectable) return;
    onTogglePhoto?.(photoId);
  };

  const handleChangeMode = (nextMode: AlbumDetailMode) => {
    const photoListEl = photoListRef.current;
    const anchorEl = anchorRef.current;

    if (nextMode === 'select') {
      if (photoListEl) {
        photoListEl.style.minHeight = SELECT_MODE_MIN_HEIGHT;
      }

      if (anchorEl) {
        anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // behavior:smooth동작 끝나면 min-height 원복
      setTimeout(() => {
        if (photoListEl) {
          photoListEl.style.minHeight = '';
        }
      }, 300);
    }

    changeMode(nextMode);
  };

  return (
    <section ref={photoListRef} className='relative p-4'>
      <div ref={anchorRef} className='invisible absolute top-[-72px] left-0' />
      <div className='mb-3 flex justify-between'>
        <span className='typo-body-lg-regular text-text-subtle'>
          총 {photos.length ?? 0}장
        </span>
        {mode === 'default' && (
          <button
            type='button'
            className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill rounded-[4px] px-3 py-1.5'
            onClick={() => handleChangeMode('select')}
          >
            선택
          </button>
        )}
        {mode === 'select' && (
          <button
            type='button'
            className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill rounded-[4px] px-3 py-1.5'
            onClick={() => handleChangeMode('default')}
          >
            취소
          </button>
        )}
      </div>
      <div className='grid grid-cols-3 gap-0.5'>
        {photos.map((photo) => (
          <PhotoBox
            key={photo.photoId}
            pressed={selectedList.includes(photo.photoId ?? 0)}
            likeCount={photo.likeCnt}
            imageSrc={photo.thumbnailUrl}
            responsive
            onPress={() => {
              if (mode === 'default') {
                router.push(
                  `/photo/detail/${albumId}${buildQuery({ ...(photo.photoId && { photoId: photo.photoId }) })}`,
                );
              } else {
                handlePhotoPress(photo.photoId ?? 0);
              }
            }}
          />
        ))}
      </div>
      <div ref={loadMoreRef} />
    </section>
  );
}
