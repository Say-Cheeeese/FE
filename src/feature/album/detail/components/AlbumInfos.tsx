'use client';

import { AlbumInvitationResponseSchema } from '@/global/api/ep';
import { useAlbumTypeStore } from '@/store/useAlbumTypeStore';
import { useShallow } from 'zustand/shallow';
import AlbumBestCut from './AlbumBestCut';
import { AlbumInfoSummary } from './AlbumInfoSummary';

interface AlbumInfosProps {
  ref?: React.Ref<HTMLElement>;
  albumId: string;
  albumInfo?: AlbumInvitationResponseSchema;
  isLoading: boolean;
  isError: boolean;
  photoCount?: number;
}

function AlbumInfos({ ref, albumId, photoCount, ...rest }: AlbumInfosProps) {
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
      <AlbumBestCut albumId={albumId} photoCount={photoCount} />
    </section>
  );
}

export default AlbumInfos;
