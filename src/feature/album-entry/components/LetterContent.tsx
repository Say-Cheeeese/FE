'use client';
import { useGetAlbumInvitation } from '@/feature/album/detail/hooks/useGetAlbumInvitation';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { formatExpirationTime } from '@/global/utils/time/formatExpirationTime';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import Image from 'next/image';
import { useEffect } from 'react';

import LoginDrawer from './LoginDrawer';

interface LetterContentProps {
  albumId: string;
}

export default function LetterContent({ albumId }: LetterContentProps) {
  const { data, isPending, isError } = useGetAlbumInvitation(albumId);

  useEffect(() => {
    trackGaEvent(GA_EVENTS.view_invited);
  }, []);

  if (isPending) return null;
  if (isError) return null;
  if (!data) return null;

  return (
    <div className='flex h-full flex-1 flex-col'>
      <header className='border-divider-gray flex h-[68px] items-center gap-2 border-b px-[20px] pt-[20px] pb-[16px]'>
        <Image
          src='/assets/login/cheese-logo.svg'
          width={88}
          height={32}
          alt='Cheeeese Logo'
        />
      </header>

      <section className='flex flex-1 flex-col items-center justify-center gap-[12px] px-[20px]'>
        <div className='bg-element-gray-light flex h-20 w-20 items-center justify-center rounded-full'>
          <span className='text-[40px] leading-[52px]'>
            {convertUnicodeToEmoji(data.themeEmoji)}
          </span>
        </div>

        <div className='flex flex-col items-center gap-[4px]'>
          <h2 className='typo-heading-sm-semibold text-text-basic text-center'>
            {data.title}
          </h2>
          <p className='typo-body-sm-regular text-text-subtler text-center'>
            {data.eventDate}
          </p>
        </div>

        {!data.isExpired && (
          <span className='typo-caption-sm-medium bg-background-dim inline-flex items-center rounded-full px-[10px] py-[4px] text-white'>
            앨범 소멸까지 {formatExpirationTime(data.expiredAt)}
          </span>
        )}
      </section>

      <div className='flex h-[72px] flex-col items-center justify-center px-[20px] pb-[24px]'>
        <LoginDrawer
          albumId={albumId}
          trigger={
            <button
              type='button'
              className='typo-body-lg-semibold bg-element-primary text-text-primary h-[48px] w-full rounded-[8px] px-5 py-[10px]'
            >
              초대 수락하고 앨범 보기
            </button>
          }
        />
      </div>
    </div>
  );
}
