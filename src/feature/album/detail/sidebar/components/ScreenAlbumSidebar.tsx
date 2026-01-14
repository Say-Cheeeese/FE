'use client';

import { HEADER_HEIGHT } from '@/global/components/header/CustomHeader';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import Toast from '@/global/components/toast/Toast';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import {
  formatExpirationTime,
  getIsExpired,
} from '@/global/utils/time/formatExpirationTime';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGetAlbumInfo } from '../../hooks/useGetAlbumInfo';
import { useAlbumExitMutation } from '../hooks/useAlbumExitMutation';
import AlbumParticipants from './AlbumParticipants';

interface ScreenAlbumSidebarProps {
  albumId: string;
}

export default function ScreenAlbumSidebar({
  albumId,
}: ScreenAlbumSidebarProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetAlbumInfo(albumId);
  const { mutateAsync } = useAlbumExitMutation();

  useEffect(() => {
    trackGaEvent(GA_EVENTS.view_albumsidebar);
  }, []);

  if (isPending) return null;
  if (isError) return null;

  const handleExit = async (): Promise<void> => {
    try {
      await mutateAsync(albumId);
      router.replace('/main');
      Toast.check(`${data?.title ? `${data.title} ` : ''}앨범이 삭제됐어요.`);
    } catch (e) {
      console.log(e);
      Toast.alert(`앨범 삭제를 실패하였어요.\n다시한번 시도해주세요.`);
    }
  };
  const isExpired = getIsExpired(data?.expiredAt);

  return (
    <>
      <main
        className='mx-auto flex h-screen w-full max-w-[430px] flex-col pb-5'
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <section className='border-divider-gray-light flex flex-col items-center border-b-[6px] py-8 text-center'>
          <button
            onClick={() => router.back()}
            type='button'
            className='absolute right-5'
          >
            <X width={24} height={24} color='var(--color-icon-basic)' />
          </button>
          <div className='bg-element-gray-light flex h-16 w-16 items-center justify-center rounded-full text-[36px]'>
            {data?.themeEmoji ? convertUnicodeToEmoji(data?.themeEmoji) : '😀'}
          </div>
          <h1 className='typo-heading-md-semibold text-text-basic mt-3'>
            {data?.title}
          </h1>
          <p className='typo-body-sm-regular text-text-subtler'>
            {data?.eventDate}
          </p>
          {!isExpired && (
            <div className='typo-caption-sm-medium text-text-basic-inverse bg-element-alpha-dark mt-3 rounded-full px-2.5 py-1'>
              앨범 소멸까지 {formatExpirationTime(data?.expiredAt)}
            </div>
          )}
        </section>

        <AlbumParticipants albumId={albumId} />

        <div className='mt-auto w-full px-5'>
          <ConfirmModal
            trigger={
              <button
                type='button'
                className='text-text-error bg-button-tertiary-fill typo-body-lg-semibold w-full rounded-[8px] py-3'
              >
                앨범 나가기
              </button>
            }
            title='앨범에서 나갈까요?'
            description='나가더라도 내가 올린 사진은 앨범에 남아요.'
            cancelText='다음에'
            confirmText='앨범 나가기'
            confirmClassName='bg-button-accent-fill text-white active:bg-button-accent-pressed active:text-basic-inverse'
            onConfirm={handleExit}
          />
        </div>
      </main>
    </>
  );
}
