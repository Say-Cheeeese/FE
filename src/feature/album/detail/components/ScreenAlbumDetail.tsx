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
        <PhotoList />
      </div>
      {mode === 'default' && (
        <NavBarAlbumDetail
          mode={mode}
          changeMode={(newMode) => setMode(newMode)}
        />
      )}
      {mode === 'select' && <DownloadActionBar />}
    </>
  );
}
