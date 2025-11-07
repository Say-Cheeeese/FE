'use client';

import CustomHeader, {
  HEADER_HEIGHT,
} from '@/global/components/header/CustomHeader';
import { ArrowDownUp, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AlbumInfos from './AlbumInfos';
import DownloadActionBar from './DownloadActionBar';
import NavBarAlbumDetail from './NavBarAlbumDetail';
import PhotoList from './PhotoList';

export type AlbumDetailMode = 'select' | 'default';

interface ScreenAlbumDetailProps {
  albumId: string;
}

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  const [mode, setMode] = useState<AlbumDetailMode>('default');
  const albumInfosRef = useRef<HTMLDivElement | null>(null);
  const [isAlbumInfosHidden, setIsAlbumInfosHidden] = useState(false);
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [selectionResetKey, setSelectionResetKey] = useState(0);

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

  const handleTogglePhotoSelection = (photoId: string, selected: boolean) => {
    setSelectedPhotoIds((prev) => {
      if (selected) {
        if (prev.includes(photoId)) return prev;
        return [...prev, photoId];
      }
      return prev.filter((id) => id !== photoId);
    });
  };

  useEffect(() => {
    if (mode === 'select') return;
    if (selectedPhotoIds.length === 0) return;

    setSelectedPhotoIds([]);
    setSelectionResetKey((prev) => prev + 1);
  }, [mode, selectedPhotoIds]);

  return (
    <>
      <CustomHeader
        isShowBack
        title={isAlbumInfosHidden ? '큐시즘 MT' : ''}
        rightContent={
          <div className='flex gap-4'>
            <button type='button'>
              <ArrowDownUp
                width={24}
                height={24}
                color='var(--color-icon-basic)'
              />
            </button>
            <button type='button'>
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </button>
          </div>
        }
      />
      <div className='mb-22 flex flex-col'>
        <AlbumInfos ref={albumInfosRef} />
        <PhotoList
          key={selectionResetKey}
          selectable={mode === 'select'}
          onTogglePhoto={handleTogglePhotoSelection}
        />
      </div>
      {mode === 'default' && (
        <NavBarAlbumDetail
          mode={mode}
          changeMode={(newMode) => setMode(newMode)}
        />
      )}
      {mode === 'select' && (
        <DownloadActionBar selectedCount={selectedPhotoIds.length} />
      )}
    </>
  );
}
