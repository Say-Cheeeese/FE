'use client';

import { useAlbumPhotosInfiniteQuery } from '@/feature/photo-detail/hooks/useAlbumPhotosInfiniteQuery';
import CustomHeader, {
  HEADER_HEIGHT,
} from '@/global/components/header/CustomHeader';
import { useSelectedPhotosStore } from '@/store/useSelectedPhotosStore';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  photoSortToApiSorting,
  type PhotoSortType,
} from '../constants/photoSort';
import { useGetAlbumInvitation } from '../hooks/useGetAlbumInvitation';
import AlbumInfos from './AlbumInfos';
import DownloadActionBar from './DownloadActionBar';
import NavBarAlbumDetail from './NavBarAlbumDetail';
import NoPhotoBody from './NoPhotoBody';
import PhotoList from './PhotoList';

export type AlbumDetailMode = 'select' | 'default';

interface ScreenAlbumDetailProps {
  albumId: string;
}

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  const router = useRouter();
  const albumInfosRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<AlbumDetailMode>('default');
  const [isAlbumInfosHidden, setIsAlbumInfosHidden] = useState(false);
  const [selectionResetKey, setSelectionResetKey] = useState(0);
  const [sortType, setSortType] = useState<PhotoSortType>('liked');
  const sorting = photoSortToApiSorting[sortType];
  const { selectedPhotoIds, togglePhotoSelection, clearSelectedPhotos } =
    useSelectedPhotosStore(
      useShallow((state) => ({
        selectedPhotoIds: state.selectedPhotoIds,
        togglePhotoSelection: state.togglePhotoSelection,
        clearSelectedPhotos: state.clearSelectedPhotos,
      })),
    );

  const {
    data: invitationData,
    isLoading: isInvitationLoading,
    isError: isInvitationError,
  } = useGetAlbumInvitation(albumId);
  // TODO : mode가 바뀌면 무한스크롤 호출하는 API가 바뀌어야한다.
  const { items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAlbumPhotosInfiniteQuery({
      code: albumId,
      sorting,
    });

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
  }, [clearSelectedPhotos, items.length, mode, selectedPhotoIds.length]);

  useEffect(() => {
    return () => {
      clearSelectedPhotos();
    };
  }, [clearSelectedPhotos]);

  const handleTogglePhotoSelection = (photoId: number): void => {
    togglePhotoSelection(photoId);
  };

  const handleDownload = (): void => {
    setMode('default');
    clearSelectedPhotos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
          photos={items}
        />
        {!isLoading && (
          <>
            {items.length === 0 ? (
              <NoPhotoBody />
            ) : (
              <PhotoList
                key={selectionResetKey}
                albumId={albumId}
                selectable={mode === 'select'}
                onTogglePhoto={handleTogglePhotoSelection}
                selectedList={selectedPhotoIds}
                mode={mode}
                changeMode={(newMode) => setMode(newMode)}
                photos={items}
                fetchNextPage={fetchNextPage}
                hasNextPage={!!hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            )}
          </>
        )}
      </div>
      {!isLoading && mode === 'default' && (
        <NavBarAlbumDetail
          albumId={albumId}
          sortType={sortType}
          changeSortType={(newType) => setSortType(newType)}
        />
      )}
      {!isLoading && mode === 'select' && (
        <DownloadActionBar
          selectedCount={selectedPhotoIds.length}
          onDownload={handleDownload}
        />
      )}
    </>
  );
}
