'use client';

import CustomHeader, {
  HEADER_HEIGHT,
} from '@/global/components/header/CustomHeader';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { PhotoListResult } from '../api/getPhotoListByAlbumId';
import { useGetAlbumInvitation } from '../hooks/useGetAlbumInvitation';
import AlbumInfos from './AlbumInfos';
import DownloadActionBar from './DownloadActionBar';
import NavBarAlbumDetail from './NavBarAlbumDetail';
import NoPhotoBody from './NoPhotoBody';
import PhotoList from './PhotoList';
import { PhotoSortType } from './SelectPhotoSortType';

export type AlbumDetailMode = 'select' | 'default' | 'empty';

interface ScreenAlbumDetailProps {
  albumId: string;
  initialData: PhotoListResult; // 서버에서 전달받은 초기 데이터
}

export default function ScreenAlbumDetail({
  albumId,
  initialData,
}: ScreenAlbumDetailProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AlbumDetailMode>(
    initialData.responses && initialData.responses.length > 0
      ? 'default'
      : 'empty',
  );
  const albumInfosRef = useRef<HTMLDivElement | null>(null);
  const [isAlbumInfosHidden, setIsAlbumInfosHidden] = useState(false);
  // TODO : photoIds를 담지않고, 이미지 url도 상태로 관리해야함. 혹은, photoIds로 이미지를 받아와야함.
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [selectionResetKey, setSelectionResetKey] = useState(0);
  const [sortType, setSortType] = useState<PhotoSortType>('liked');

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

  const handleTogglePhotoSelection = (photoId: string) => {
    setSelectedPhotoIds((prev) => {
      if (prev.includes(photoId)) {
        return prev.filter((id) => id !== photoId);
      } else {
        return [...prev, photoId];
      }
    });
  };

  const handleDownload = () => {
    setMode('default');
    setSelectedPhotoIds([]);
  };

  useEffect(() => {
    // 사진이 없으면 empty 모드로 자동 진입
    if (!initialData.responses || initialData.responses.length === 0) {
      if (mode !== 'empty') setMode('empty');
      return;
    }
    // 사진이 있으면 select/reset 로직 유지
    if (mode === 'select') return;
    if (selectedPhotoIds.length === 0) return;

    setSelectedPhotoIds([]);
    setSelectionResetKey((prev) => prev + 1);
  }, [mode, selectedPhotoIds, initialData.responses]);
  const albumData = useGetAlbumInvitation(albumId);

  return (
    <>
      <CustomHeader
        isShowBack
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
          photos={initialData.responses}
        />
        {mode === 'empty' ? (
          <NoPhotoBody />
        ) : (
          <PhotoList
            key={selectionResetKey}
            selectable={mode === 'select'}
            onTogglePhoto={handleTogglePhotoSelection}
            selectedList={selectedPhotoIds}
            mode={mode}
            changeMode={(newMode) => setMode(newMode)}
            photos={initialData.responses}
          />
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
