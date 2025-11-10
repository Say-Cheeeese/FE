'use client';

import { forwardRef } from 'react';
import AlbumBestCut from './AlbumBestCut';

import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { Photo } from '../api/getPhotoListByAlbumId.server';

interface AlbumInfosProps {
  albumId: string;
  albumInfo?: {
    title: string;
    themeEmoji: string;
    eventDate: string;
    expiredAt: string;
    makerName: string;
    makerProfileImage: string;
    isExpired: boolean;
  };
  isLoading: boolean;
  isError: boolean;
  photos: Photo[]; // 실제 사진 데이터
}

const AlbumInfos = forwardRef<HTMLDivElement, AlbumInfosProps>(
  ({ albumInfo, isLoading, isError, photos }, ref) => {
    let emoji = '';
    let title = '';
    let eventDate = '';
    if (!isLoading && albumInfo) {
      emoji = convertUnicodeToEmoji(albumInfo.themeEmoji);
      title = albumInfo.title;
      eventDate = albumInfo.eventDate;
    }

    const hasPhotos = Array.isArray(photos) && photos.length > 0;
    return (
      <section className='border-divider-gray-light border-b-[6px] px-5 py-4'>
        <div className={`${hasPhotos ? 'mb-6' : ''} flex items-center gap-5`}>
          <div className='bg-element-gray-lighter flex h-[74px] w-[74px] items-center justify-center rounded-full text-[28px]'>
            {isError ? '!' : emoji}
          </div>
          <div className='flex flex-col'>
            <h1 className='typo-heading-md-bold text-text-basic truncate'>
              {isError ? '에러 발생' : title}
            </h1>
            <span className='typo-body-sm-regular text-text-subtler'>
              {isError ? '-' : eventDate}
            </span>
          </div>
          <div ref={ref} />
        </div>
        {hasPhotos && <AlbumBestCut />}
      </section>
    );
  },
);

AlbumInfos.displayName = 'AlbumInfos';

export default AlbumInfos;
