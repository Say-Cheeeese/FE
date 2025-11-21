'use client';
import { PhotoListResponseSchema } from '@/global/api/ep';
import PhotoBox from '@/global/components/photo/PhotoBox';
import Toast from '@/global/components/toast/Toast';
import { buildQuery } from '@/global/utils/buildQuery';
import { useAlbumSortStore } from '@/store/useAlbumSortStore';
import { useSelectedPhotosStore } from '@/store/useSelectedPhotosStore';
import {
  type FetchNextPageOptions,
  type InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import { AlbumDetailMode } from './ScreenAlbumDetail';

const SELECT_MODE_MIN_HEIGHT = '800px';

export const ID_PHOTO_LIST = 'photo-list';
export const ID_PHOTO_LIST_ANCHOR = 'photo-list-anchor';

interface PhotoListProps {
  albumId: string;
  selectable?: boolean;
  changeMode: (newMode: AlbumDetailMode) => void;
  mode: AlbumDetailMode;
  photos: PhotoListResponseSchema[];
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  totalPhotoCount?: number;
}

export default function PhotoList({
  albumId,
  selectable = false,
  changeMode,
  mode,
  photos,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  totalPhotoCount,
}: PhotoListProps) {
  const router = useRouter();
  const photoListRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { addSelectedPhoto, deleteSelectedPhoto, isSelected } =
    useSelectedPhotosStore(
      useShallow((state) => ({
        selectedPhotos: state.selectedPhotos,
        addSelectedPhoto: state.addSelectedPhoto,
        deleteSelectedPhoto: state.deleteSelectedPhoto,
        clearSelectedPhotos: state.clearSelectedPhotos,
        isSelected: state.isSelected,
      })),
    );
  const { sortType, setSortType } = useAlbumSortStore(
    useShallow((state) => ({
      sortType: state.sortType,
      setSortType: state.setSortType,
    })),
  );

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

  const handlePhotoPress = ({
    photoId,
    photoUrl,
  }: {
    photoId: number;
    photoUrl: string;
  }): void => {
    if (!selectable) return;

    if (isSelected(photoId)) {
      deleteSelectedPhoto(photoId);
    } else {
      addSelectedPhoto({ id: photoId, url: photoUrl });
    }
  };

  const handleChangeMode = (nextMode: AlbumDetailMode): void => {
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
          총 {totalPhotoCount || 0}장
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
        {photos.map(
          ({
            photoId,
            likeCnt,
            isLiked,
            thumbnailUrl,
            imageUrl,
            isDownloaded,
            isRecentlyDownloaded,
          }) => {
            if (!photoId || !thumbnailUrl || !imageUrl) {
              return null;
            }

            return (
              <PhotoBox
                key={photoId}
                downloaded={isDownloaded}
                disabled={isRecentlyDownloaded}
                pressed={isSelected(photoId)}
                // 띱많은순이 아니면, 좋아요수가 있을때 의식하게되어 보여주지않음.
                likeCount={sortType === 'liked' ? likeCnt : undefined}
                liked={sortType === 'liked' ? isLiked : undefined}
                imageSrc={thumbnailUrl}
                responsive
                onPress={() => {
                  if (mode === 'default') {
                    router.push(
                      `/photo/detail/${albumId}${buildQuery({ photoId: photoId })}`,
                    );
                  } else {
                    handlePhotoPress({ photoId, photoUrl: imageUrl });
                  }
                }}
                onDisabledPress={() => {
                  Toast.alert(
                    `금방 다운받은 사진이에요.\n1시간 뒤에 다시 시도하세요.`,
                  );
                }}
              />
            );
          },
        )}
      </div>
      <div ref={loadMoreRef} />
    </section>
  );
}
