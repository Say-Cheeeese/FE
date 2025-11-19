'use client';

import { AlbumInvitationResponseSchema } from '@/global/api/ep';
import { forwardRef } from 'react';
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
  ({ albumId, photoCount, ...rest }, ref) => (
    <section
      ref={ref}
      className='border-divider-gray-light border-b-[6px] px-5 py-4'
    >
      <AlbumInfoSummary {...rest} />
      <AlbumBestCut albumId={albumId} photoCount={photoCount} />
    </section>
  ),
);

AlbumInfos.displayName = 'AlbumInfos';

export default AlbumInfos;
