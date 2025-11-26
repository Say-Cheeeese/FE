'use client';

import { AlbumInvitationResponseSchema } from '@/global/api/ep';
import { useAlbumTypeStore } from '@/store/useAlbumTypeStore';
import { forwardRef } from 'react';
import { useShallow } from 'zustand/shallow';
import AlbumBestCut from './AlbumBestCut';
import { AlbumInfoSummary } from './AlbumInfoSummary';

interface AlbumInfosProps {
  albumId: string;
  albumInfo?: AlbumInvitationResponseSchema;
  isLoading: boolean;
  isError: boolean;
  photoCount?: number;
}

const AlbumInfos = forwardRef<HTMLElement, AlbumInfosProps>(
  ({ albumId, photoCount, ...rest }, ref) => {
    const { albumType, setAlbumType } = useAlbumTypeStore(
      useShallow((state) => ({
        albumType: state.albumType,
        setAlbumType: state.setAlbumType,
      })),
    );

    if (albumType === 'deep') return null;
    if (photoCount === 0 || photoCount === undefined) return null;

    return (
      <section
        ref={ref}
        className='border-divider-gray-light border-b-[6px] px-5 py-4'
      >
        <AlbumInfoSummary {...rest} />
        <AlbumBestCut albumId={albumId} photoCount={photoCount} />
      </section>
    );
  },
);

AlbumInfos.displayName = 'AlbumInfos';

export default AlbumInfos;
