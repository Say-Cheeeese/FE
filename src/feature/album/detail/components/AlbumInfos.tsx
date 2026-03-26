'use client';

import { AlbumInvitationResponseSchema } from '@/global/api/ep';
import { useAlbumTypeStore } from '@/store/useAlbumTypeStore';
import { useShallow } from 'zustand/shallow';
import AlbumBestCut from './AlbumBestCut';
import { AlbumInfoSummary } from './AlbumInfoSummary';

import { AlbumDetailMode } from './ScreenAlbumDetail';

interface AlbumInfosProps {
  ref?: React.Ref<HTMLElement>;
  albumId: string;
  albumInfo?: AlbumInvitationResponseSchema;
  isLoading: boolean;
  isError: boolean;
  photoCount?: number;
  mode: AlbumDetailMode;
}

function AlbumInfos({
  ref,
  albumId,
  photoCount,
  mode,
  ...rest
}: AlbumInfosProps) {
  const { albumType, setAlbumType } = useAlbumTypeStore(
    useShallow((state) => ({
      albumType: state.albumType,
      setAlbumType: state.setAlbumType,
    })),
  );

  if (albumType === 'deep') return null;

  return (
    <section
      ref={ref}
      className='border-divider-gray-light flex flex-col gap-6 border-b-[6px] px-5 py-4'
    >
      <AlbumInfoSummary {...rest} />
      <AlbumBestCut albumId={albumId} photoCount={photoCount} mode={mode} />
    </section>
  );
}

export default AlbumInfos;
