'use client';
import { useGetAlbumInvitation } from '@/feature/album/detail/hooks/useGetAlbumInvitation';
import Toast from '@/global/components/toast/Toast';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { useCheckAuth } from '@/global/hooks/useCheckAuth';
import { buildQuery } from '@/global/utils/buildQuery';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { formatExpirationTime } from '@/global/utils/time/formatExpirationTime';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import LoginDrawer from './LoginDrawer';
import { useState } from 'react';

interface LetterContentProps {
  albumId: string;
}

export default function LetterContent({ albumId }: LetterContentProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetAlbumInvitation(albumId);
  const { isAuthed } = useCheckAuth();
  const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);

  useEffect(() => {
    trackGaEvent(GA_EVENTS.view_invited);
  }, []);

  if (isPending) return null;
  if (isError) return null;
  if (!data) return null;

  const handleInviteAccept = async () => {
    if (isAuthed) {
      trackGaEvent(GA_EVENTS.click_login, { entry_source: 'invitation' });
      router.push(`/photo/entry/${albumId}${buildQuery({ isInvite: true })}`);
    } else {
      setIsLoginDrawerOpen(true);
    }
  };

  return (
    <div className='flex flex-1 flex-col h-full'>
      <header className='flex h-[68px] items-center gap-2 border-b border-[#E5E5E7] px-[20px] pb-[16px] pt-[20px]'>
        <Image
          src={data.makerProfileImage}
          width={32}
          height={32}
          alt={data.makerName}
          className='rounded-full'
        />
        <span className='text-[16px] font-semibold leading-[24px] text-[#747681]'>
          {data.makerName}
        </span>
      </header>

      <section className='flex flex-1 flex-col items-center justify-center gap-[12px] px-[20px]'>
        <div className='bg-[#F1F2F3] flex h-20 w-20 items-center justify-center rounded-full'>
          <span className='text-[40px] leading-[52px]'>{convertUnicodeToEmoji(data.themeEmoji)}</span>
        </div>

        <div className='flex flex-col items-center gap-[4px]'>
          <h2 className='text-[18px] font-semibold leading-[28px] text-[#18191B] text-center'>
            {data.title}
          </h2>
          <p className='text-[14px] leading-[20px] text-[#747681]'>
            {data.eventDate}
          </p>
        </div>

        {!data.isExpired && (
          <span className='bg-[rgba(24,25,27,0.5)] text-[12px] font-medium leading-[18px] text-[#FFFFFF] inline-flex items-center rounded-full px-[10px] py-[4px]'>
            앨범 소멸까지 {formatExpirationTime(data.expiredAt)}
          </span>
        )}
      </section>

      <div className='flex h-[72px] flex-col items-center justify-center px-[20px] pb-[24px]'>
        <button
          onClick={handleInviteAccept}
          type='button'
          className='bg-[#FFCD14] text-[16px] font-semibold leading-[24px] text-[#332100] h-[48px] w-full rounded-[8px] px-5 py-[10px]'
        >
          초대 수락하고 앨범 보기
        </button>
      </div>
      <LoginDrawer
        open={isLoginDrawerOpen}
        onOpenChange={setIsLoginDrawerOpen}
        albumId={albumId}
      />
    </div>
  );
}
