'use client';

import EmojiLoading from '@/components/ui/EmojiLoading';
import { useAlbumPhotosInfiniteQuery } from '@/feature/photo-detail/hooks/useAlbumPhotosInfiniteQuery';
import {
  useAlbumPhotosLikedInfiniteQuery,
  type AlbumPhotosLikedItem,
} from '@/feature/photo-detail/hooks/useAlbumPhotosLikedInfiniteQuery';
import { PhotoListResponseSchema } from '@/global/api/ep';
import CustomHeader, {
  HEADER_HEIGHT,
} from '@/global/components/header/CustomHeader';
import { useSelectedPhotosStore } from '@/store/useSelectedPhotosStore';
import { useUploadingStore } from '@/store/useUploadingStore';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  photoSortToApiSorting,
  type PhotoSortType,
} from '../constants/photoSort';
import { useGetAlbumInvitation } from '../hooks/useGetAlbumInvitation';
import AlbumBottomActions from './AlbumBottomActions';
import AlbumInfos from './AlbumInfos';
import AlbumPhotoSection from './AlbumPhotoSection';
import { type AlbumType } from './NavBarAlbumDetail';

export type AlbumDetailMode = 'select' | 'default';

interface ScreenAlbumDetailProps {
  albumId: string;
}

const LOADING_MODAL_DURATION = 2000;

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  const isUploading = useUploadingStore((state) => state.isUploading);
  const [showLoading, setShowLoading] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevIsUploading = useRef(isUploading);
  const router = useRouter();
  const albumInfosRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<AlbumDetailMode>('default');
  const [isAlbumInfosHidden, setIsAlbumInfosHidden] = useState(false);
  const [selectionResetKey, setSelectionResetKey] = useState(0);
  const [sortType, setSortType] = useState<PhotoSortType>('liked');
  const [albumType, setAlbumType] = useState<AlbumType>('all');
  const sorting = photoSortToApiSorting[sortType];
  const { selectedPhotoIds, togglePhotoSelection, clearSelectedPhotos } =
    useSelectedPhotosStore(
      useShallow((state) => ({
        selectedPhotoIds: state.selectedPhotoIds,
        togglePhotoSelection: state.togglePhotoSelection,
        clearSelectedPhotos: state.clearSelectedPhotos,
      })),
    );

  // isUploading이 true로 바뀌는 순간에만 2초간 showLoading true 유지
  useEffect(() => {
    if (!prevIsUploading.current && isUploading) {
      // false -> true로 바뀌는 순간
      setShowLoading(true);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = setTimeout(() => {
        setShowLoading(false);
      }, LOADING_MODAL_DURATION);
    }
    if (prevIsUploading.current && !isUploading) {
      // true -> false로 바뀌는 순간에도 showLoading을 false로 강제
      setShowLoading(false);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    }
    prevIsUploading.current = isUploading;
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, [isUploading]);

  const {
    data: invitationData,
    isLoading: isInvitationLoading,
    isError: isInvitationError,
  } = useGetAlbumInvitation(albumId);
  const isDeepAlbumType = albumType === 'deep';

  const defaultPhotosQuery = useAlbumPhotosInfiniteQuery({
    code: albumId,
    sorting,
    enabled: albumType === 'all',
    // 좋아요 누른것 실시간으로 반영되게 매번 호출
    refetchOnMount: 'always',
  });

  const likedPhotosQuery = useAlbumPhotosLikedInfiniteQuery({
    code: albumId,
    enabled: isDeepAlbumType,
    // 좋아요 누른것 실시간으로 반영되게 매번 호출
    refetchOnMount: 'always',
  });

  const likedPhotos = useMemo(
    () => mapLikedPhotosToPhotoList(likedPhotosQuery.items),
    [likedPhotosQuery.items],
  );

  const photos: PhotoListResponseSchema[] = isDeepAlbumType
    ? likedPhotos
    : defaultPhotosQuery.items;
  const fetchNextPage = isDeepAlbumType
    ? likedPhotosQuery.fetchNextPage
    : defaultPhotosQuery.fetchNextPage;
  const hasNextPage = isDeepAlbumType
    ? likedPhotosQuery.hasNextPage
    : defaultPhotosQuery.hasNextPage;
  const isFetchingNextPage = isDeepAlbumType
    ? likedPhotosQuery.isFetchingNextPage
    : defaultPhotosQuery.isFetchingNextPage;
  const isLoading = isDeepAlbumType
    ? likedPhotosQuery.isLoading
    : defaultPhotosQuery.isLoading;
  const hasPhotos = photos.length > 0;

  useEffect(() => {
    const target = albumInfosRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAlbumInfosHidden(!entry.isIntersecting);
      },
      {
        rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mode === 'select') return;
    if (selectedPhotoIds.length === 0) return;

    clearSelectedPhotos();
    setSelectionResetKey((prev) => prev + 1);
  }, [clearSelectedPhotos, photos.length, mode, selectedPhotoIds.length]);

  useEffect(() => {
    return () => {
      clearSelectedPhotos();
    };
  }, [clearSelectedPhotos]);

  const handleTogglePhotoSelection = (photoId: number): void => {
    togglePhotoSelection(photoId);
  };

  const handleChangeMode = (newMode: AlbumDetailMode) => setMode(newMode);

  const emoji = invitationData?.themeEmoji;

  return (
    <>
      {showLoading && (
        <EmojiLoading duration={LOADING_MODAL_DURATION} emoji={emoji} />
      )}
      <CustomHeader
        isShowBack
        isHidden={mode === 'select'}
        title={isAlbumInfosHidden ? (invitationData?.title ?? '') : ''}
        rightContent={
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => router.push(`/album/detail/${albumId}/sidebar`)}
            >
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </button>
          </div>
        }
      />
      <div className='mb-22 flex flex-col'>
        <AlbumInfos
          ref={albumInfosRef}
          albumId={albumId}
          albumInfo={invitationData}
          isLoading={isInvitationLoading}
          isError={isInvitationError}
        />
        <AlbumPhotoSection
          isLoading={isLoading}
          photos={photos}
          selectionResetKey={selectionResetKey}
          albumId={albumId}
          mode={mode}
          selectedPhotoIds={selectedPhotoIds}
          onTogglePhoto={handleTogglePhotoSelection}
          onChangeMode={setMode}
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
      <AlbumBottomActions
        hasPhotos={hasPhotos}
        mode={mode}
        albumId={albumId}
        sortType={sortType}
        changeSortType={setSortType}
        albumType={albumType}
        changeAlbumType={setAlbumType}
        changeAlbumMode={handleChangeMode}
        selectedCount={selectedPhotoIds.length}
      />
    </>
  );
}

function mapLikedPhotosToPhotoList(
  items: AlbumPhotosLikedItem[],
): PhotoListResponseSchema[] {
  return items.map((item) => ({
    name: item.name,
    photoId: item.photoId,
    imageUrl: item.imageUrl,
    thumbnailUrl: item.thumbnailUrl,
    likeCnt: 0,
    isLiked: true,
    isDownloaded: item.isDownloaded,
    isRecentlyDownloaded: item.isRecentlyDownloaded,
  }));
}
