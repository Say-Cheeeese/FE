'use client';
import { PhotoListResponseSchema } from '@/global/api/ep';
import PhotoBox from '@/global/components/photo/PhotoBox';
import Toast from '@/global/components/toast/Toast';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { buildQuery } from '@/global/utils/buildQuery';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { useAlbumSortStore } from '@/store/useAlbumSortStore';
import { useAlbumTypeStore } from '@/store/useAlbumTypeStore';
import { useSelectedPhotosStore } from '@/store/useSelectedPhotosStore';
import {
    type FetchNextPageOptions,
    type InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import IncludeMyPhotosToggle from './IncludeMyPhotosToggle';
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
  const {
    selectedPhotos,
    addSelectedPhoto,
    deleteSelectedPhoto,
    clearSelectedPhotos,
    setSelectedPhotos,
    isSelected,
  } = useSelectedPhotosStore(
    useShallow((state) => ({
      selectedPhotos: state.selectedPhotos,
      addSelectedPhoto: state.addSelectedPhoto,
      deleteSelectedPhoto: state.deleteSelectedPhoto,
      clearSelectedPhotos: state.clearSelectedPhotos,
      setSelectedPhotos: state.setSelectedPhotos,
      isSelected: state.isSelected,
    })),
  );
  const [includeMyPhotos, setIncludeMyPhotos] = useState(true);
  const [isSelectAllMode, setIsSelectAllMode] = useState(false);
  const { sortType } = useAlbumSortStore(
    useShallow((state) => ({
      sortType: state.sortType,
    })),
  );
  const { albumType } = useAlbumTypeStore(
    useShallow((state) => ({
      albumType: state.albumType,
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
      setIsSelectAllMode(false);
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

  const filteredPhotos = useMemo(() => {
    return mode === 'default' || includeMyPhotos
      ? photos
      : photos.filter((photo) => !photo.isMine);
  }, [includeMyPhotos, mode, photos]);

  const selectablePhotos = useMemo(
    () =>
      filteredPhotos.filter(
        ({ photoId, imageUrl, isRecentlyDownloaded }) =>
          !!photoId && !!imageUrl && !isRecentlyDownloaded,
      ),
    [filteredPhotos],
  );
  const selectedPhotoIds = useMemo(
    () => new Set(selectedPhotos.map(({ id }) => id)),
    [selectedPhotos],
  );
  const isAllSelected =
    selectablePhotos.length > 0 &&
    selectablePhotos.every(({ photoId }) => selectedPhotoIds.has(photoId));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setIsSelectAllMode(false);
      clearSelectedPhotos();
      return;
    }
    setIsSelectAllMode(true);
    setSelectedPhotos(
      selectablePhotos.map(({ photoId, imageUrl }) => ({
        id: photoId,
        url: imageUrl ?? '',
      }))
    );
  };

  useEffect(() => {
    if (mode !== 'select') return;
    if (!isSelectAllMode) return;

    setSelectedPhotos(
      selectablePhotos.map(({ photoId, imageUrl }) => ({
        id: photoId,
        url: imageUrl ?? '',
      }))
    );
  }, [isSelectAllMode, mode, selectablePhotos, setSelectedPhotos]);

  return (
    <section ref={photoListRef} className='relative p-4'>
      <div ref={anchorRef} className='invisible absolute top-[-72px] left-0' />
      {mode === 'default' ? (
        <div className='mb-3 flex justify-between'>
          <span className='typo-body-lg-regular text-text-subtle'>
            총 {(albumType === 'all' ? totalPhotoCount : photos.length) || 0}장
          </span>
          <button
            type='button'
            className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill-pressed rounded-[4px] px-3 py-1.5'
            style={{
              background: '#F1F2F3',
            }}
            onClick={() => {
              trackGaEvent(GA_EVENTS.click_album_photo_select, {
                album_id: albumId,
              });
              handleChangeMode('select');
            }}
          >
            선택
          </button>
        </div>
      ) : (
        <div className='mb-3'>
          <div className='mb-3 flex justify-between'>
            <button
              type='button'
              className='typo-body-sm-medium text-text-subtle rounded-[4px] px-3 py-1.5'
              style={{
                background: '#F1F2F3',
              }}
              onClick={handleToggleSelectAll}
            >
              {isAllSelected ? '전체 선택 취소' : '전체 선택'}
            </button>
            <button
              type='button'
              className='typo-body-sm-medium text-text-subtle rounded-[4px] px-3 py-1.5'
              style={{
                background: '#F1F2F3',
              }}
              onClick={() => handleChangeMode('default')}
            >
              취소
            </button>
          </div>
          <IncludeMyPhotosToggle
            checked={includeMyPhotos}
            onChange={setIncludeMyPhotos}
          />
        </div>
      )}
      <div className='grid grid-cols-3 gap-0.5'>
        {filteredPhotos.map(
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
                mode={mode}
                // 띱많은순이 아니면, 좋아요수가 있을때 의식하게되어 보여주지않음.
                likeCount={
                  sortType === 'liked' || albumType === 'deep'
                    ? likeCnt
                    : undefined
                }
                liked={
                  sortType === 'liked' || albumType === 'deep'
                    ? isLiked
                    : undefined
                }
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
                  if (mode === 'default') {
                    router.push(
                      `/photo/detail/${albumId}${buildQuery({ photoId: photoId })}`,
                    );
                  } else {
                    Toast.alert(
                      `금방 다운받은 사진이에요.\n1시간 뒤에 다시 시도하세요.`,
                    );
                  }
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
