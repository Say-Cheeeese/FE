'use client';

import type { AlbumInvitationResponse } from '@/feature/upload/api/getAlbumInvitation';
import { forwardRef } from 'react';
import AlbumBestCut from './AlbumBestCut';
import { AlbumInfoSummary } from './AlbumInfoSummary';

interface AlbumInfosProps {
  albumId: string;
  albumInfo?: AlbumInvitationResponse;
  isLoading: boolean;
  isError: boolean;
}

const AlbumInfos = forwardRef<HTMLElement, AlbumInfosProps>(
  ({ albumId, ...rest }, ref) => (
    <section
      ref={ref}
      className='border-divider-gray-light border-b-[6px] px-5 py-4'
    >
      <AlbumInfoSummary {...rest} />
      <AlbumBestCut albumId={albumId} />
    </section>
  ),
);

AlbumInfos.displayName = 'AlbumInfos';

export default AlbumInfos;
