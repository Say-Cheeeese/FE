'use client';

import { useAlbumPhotosInfiniteQuery } from '@/feature/photo-detail/hooks/useAlbumPhotosInfiniteQuery';
import CustomHeader, {
  HEADER_HEIGHT,
} from '@/global/components/header/CustomHeader';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
  const [mode, setMode] = useState<AlbumDetailMode>('default');
  const albumInfosRef = useRef<HTMLDivElement | null>(null);
  const [isAlbumInfosHidden, setIsAlbumInfosHidden] = useState(false);
  // TODO : photoIds를 담지않고, 이미지 url도 상태로 관리해야함. 혹은, photoIds로 이미지를 받아와야함.
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([]);
  const [selectionResetKey, setSelectionResetKey] = useState(0);
  const [sortType, setSortType] = useState<PhotoSortType>('liked');

  const sorting = photoSortToApiSorting[sortType];
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

  const handleTogglePhotoSelection = (photoId: number): void => {
    setSelectedPhotoIds((prev) => {
      if (prev.includes(photoId)) {
        return prev.filter((id) => id !== photoId);
      } else {
        return [...prev, photoId];
      }
    });
  };

  const handleDownload = (): void => {
    setMode('default');
    setSelectedPhotoIds([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (mode === 'select') return;
    if (selectedPhotoIds.length === 0) return;

    setSelectedPhotoIds([]);
    setSelectionResetKey((prev) => prev + 1);
  }, [items.length, mode, selectedPhotoIds.length]);
  const albumData = useGetAlbumInvitation(albumId);

  return (
    <>
      <CustomHeader
        isShowBack
        isHidden={mode === 'select'}
        title={isAlbumInfosHidden ? (albumData.data?.title ?? '') : ''}
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
          albumInfo={albumData.data}
          isLoading={albumData.isLoading}
          isError={albumData.isError}
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
      {mode === 'default' && (
        <NavBarAlbumDetail
          albumId={albumId}
          sortType={sortType}
          changeSortType={(newType) => setSortType(newType)}
        />
      )}
      {mode === 'select' && (
        <DownloadActionBar
          selectedCount={selectedPhotoIds.length}
          onDownload={handleDownload}
        />
      )}
    </>
  );
}
