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
import { DEFAULT_PROFILE_IMAGE } from '@/global/constants/images';
import { useAlbumSortStore } from '@/store/useAlbumSortStore';
import { useAlbumTypeStore } from '@/store/useAlbumTypeStore';
import { useSelectedPhotosStore } from '@/store/useSelectedPhotosStore';
import { useUploadingStore } from '@/store/useUploadingStore';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { photoSortToApiSorting } from '../constants/photoSort';
import { useGetAlbumAvailableCount } from '../hooks/useGetAlbumAvailableCount';
import { useGetAlbumInvitation } from '../hooks/useGetAlbumInvitation';
import AlbumBottomActions from './AlbumBottomActions';
import AlbumInfos from './AlbumInfos';
import AlbumPhotoSection from './AlbumPhotoSection';

export type AlbumDetailMode = 'select' | 'default';

interface ScreenAlbumDetailProps {
  albumId: string;
}

const LOADING_MODAL_DURATION = 5000;

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  const router = useRouter();
  const albumInfosRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<AlbumDetailMode>('default');
  const [isAlbumInfosHidden, setIsAlbumInfosHidden] = useState(false);
  const [selectionResetKey, setSelectionResetKey] = useState(0);
  const { sortType, setSortType } = useAlbumSortStore(
    useShallow((state) => ({
      sortType: state.sortType,
      setSortType: state.setSortType,
    })),
  );
  const { albumType, setAlbumType } = useAlbumTypeStore(
    useShallow((state) => ({
      albumType: state.albumType,
      setAlbumType: state.setAlbumType,
    })),
  );
  const sorting = photoSortToApiSorting[sortType];
  const {
    selectedPhotos,
    addSelectedPhoto,
    deleteSelectedPhoto,
    clearSelectedPhotos,
  } = useSelectedPhotosStore(
    useShallow((state) => ({
      selectedPhotos: state.selectedPhotos,
      addSelectedPhoto: state.addSelectedPhoto,
      deleteSelectedPhoto: state.deleteSelectedPhoto,
      clearSelectedPhotos: state.clearSelectedPhotos,
    })),
  );
  const { isUploaded, setUploaded } = useUploadingStore(
    useShallow((state) => ({
      isUploaded: state.isUploaded,
      setUploaded: state.setUploaded,
    })),
  );

  const {
    data: invitationData,
    isLoading: isInvitationLoading,
    isError: isInvitationError,
  } = useGetAlbumInvitation(albumId);
  const isDeepAlbumType = albumType === 'deep';
  const { data } = useGetAlbumAvailableCount(albumId);
  const totalPhotoCount = data?.currentPhotoCount;
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
  const isLoading = defaultPhotosQuery.isLoading;

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
    if (selectedPhotos.length === 0) return;

    clearSelectedPhotos();
    setSelectionResetKey((prev) => prev + 1);
  }, [clearSelectedPhotos, photos.length, mode, selectedPhotos.length]);

  useEffect(() => {
    return () => {
      clearSelectedPhotos();
    };
  }, [clearSelectedPhotos]);

  const handleChangeMode = (newMode: AlbumDetailMode) => setMode(newMode);

  const emoji = invitationData?.themeEmoji;

  return (
    <>
      {isUploaded && (
        <EmojiLoading
          duration={LOADING_MODAL_DURATION}
          emoji={emoji}
          albumId={albumId}
        />
      )}
      <CustomHeader
        isShowBack
        onBackClick={() => router.replace('/main')}
        isHidden={mode === 'select'}
        title={isAlbumInfosHidden ? (invitationData?.title ?? '') : ''}
        rightContent={
          <div className='flex gap-4'>
            <Link href={`/album/detail/${albumId}/sidebar`}>
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </Link>
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
          photoCount={totalPhotoCount}
        />
        <AlbumPhotoSection
          isLoading={isLoading}
          photos={photos}
          selectionResetKey={selectionResetKey}
          albumId={albumId}
          mode={mode}
          onChangeMode={setMode}
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          totalPhotoCount={totalPhotoCount}
        />
      </div>
      <AlbumBottomActions
        mode={mode}
        albumId={albumId}
        changeAlbumMode={handleChangeMode}
        selectedCount={selectedPhotos.length}
        totalPhotoCount={totalPhotoCount}
        isLoading={isLoading}
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
    profileImage: DEFAULT_PROFILE_IMAGE, // 사용되지 않는필드. 타입을위해 임시 DEFAULT 프사 넣음.
    likeCnt: item.likeCnt ?? 0,
    isLiked: item.isLiked ?? false,
    isDownloaded: item.isDownloaded,
    isRecentlyDownloaded: item.isRecentlyDownloaded,
  }));
}
