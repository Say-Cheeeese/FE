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
      <header className='flex h-[68px] items-center gap-2 border-b border-[#E5E5E7] px-[20px] pt-[20px] pb-[16px]'>
        <Image
          src={data.makerProfileImage}
          width={32}
          height={32}
          alt={data.makerName}
          className='rounded-full'
        />
        <span className='text-[16px] leading-[24px] font-semibold text-[#747681]'>
          {data.makerName}
        </span>
      </header>

      <section className='flex flex-1 flex-col items-center justify-center gap-[12px] px-[20px]'>
        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-[#F1F2F3]'>
          <span className='text-[40px] leading-[52px]'>
            {convertUnicodeToEmoji(data.themeEmoji)}
          </span>
        </div>

        <div className='flex flex-col items-center gap-[4px]'>
          <h2 className='text-center text-[18px] leading-[28px] font-semibold text-[#18191B]'>
            {data.title}
          </h2>
          <p className='text-[14px] leading-[20px] text-[#747681]'>
            {data.eventDate}
          </p>
        </div>

        {!data.isExpired && (
          <span className='inline-flex items-center rounded-full bg-[rgba(24,25,27,0.5)] px-[10px] py-[4px] text-[12px] leading-[18px] font-medium text-[#FFFFFF]'>
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
              className='h-[48px] w-full rounded-[8px] bg-[#FFCD14] px-5 py-[10px] text-[16px] leading-[24px] font-semibold text-[#332100]'
            >
              초대 수락하고 앨범 보기
            </button>
          }
        />
      </div>
    </div>
  );
}
