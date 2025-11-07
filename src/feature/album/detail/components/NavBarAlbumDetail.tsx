'use client';
import ToggleAlbumType from '@/feature/main/components/open-album/ToggleAlbumType';
import { Download, Plus } from 'lucide-react';
import { useState } from 'react';
import { AlbumDetailMode } from './ScreenAlbumDetail';

interface NavBarAlbumDetailProps {
  changeMode: (newMode: AlbumDetailMode) => void;
  mode: AlbumDetailMode;
}

type AlbumType = 'all' | 'deep';

export default function NavBarAlbumDetail({
  changeMode,
  mode,
}: NavBarAlbumDetailProps) {
  const [albumType, setAlbumType] = useState<AlbumType>('all');

  const handlePhotoAdd = () => {};

  const handleToggleChange = (value: AlbumType) => {
    setAlbumType(value);
  };
  const handlePhotoDownload = () => {
    changeMode('select');
  };

  return (
    <section className='fixed bottom-0 flex w-full items-center justify-between gap-3 bg-[linear-gradient(180deg,rgba(24,25,27,0)_0%,rgba(24,25,27,0.8)_60.1%)] px-4 py-5'>
      <button
        type='button'
        onClick={handlePhotoAdd}
        className='bg-element-gray-light rounded-full p-2.5'
      >
        <Plus width={24} height={24} color={'var(--color-icon-basic)'} />
      </button>
      <ToggleAlbumType
        onChange={handleToggleChange}
        value={albumType}
        labels={{ all: '전체', deep: '띱한 사진' }}
      />
      <button
        type='button'
        onClick={handlePhotoDownload}
        className='bg-element-gray-light rounded-full p-2.5'
      >
        <Download width={24} height={24} color={'var(--color-icon-basic)'} />
      </button>
    </section>
  );
}
