'use client';

import { useGetAlbumInform } from '@/feature/upload/hooks/useGetAlbumInform';
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
import { useEffect, useRef, useState } from 'react';
import { useAlbumExitMutation } from '../hooks/useAlbumExitMutation';
import AlbumParticipants from './AlbumParticipants';

interface ScreenAlbumSidebarProps {
  albumId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScreenAlbumSidebar({
  albumId,
  isOpen,
  onClose,
}: ScreenAlbumSidebarProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sidebarLayerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const {
    data: informData,
    isPending,
    isError,
  } = useGetAlbumInform({ code: albumId });
  const { mutateAsync } = useAlbumExitMutation();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      trackGaEvent(GA_EVENTS.view_albumsidebar, {
        album_id: albumId,
        access_type: informData?.myRole === 'MAKER' ? 'creator' : 'member',
      });
    }
  }, [isOpen, albumId, informData?.myRole]);

  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      left: body.style.left,
      right: body.style.right,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.left = '0';
    body.style.right = '0';

    return () => {
      body.style.overflow = originalStyle.overflow;
      body.style.position = originalStyle.position;
      body.style.top = originalStyle.top;
      body.style.width = originalStyle.width;
      body.style.left = originalStyle.left;
      body.style.right = originalStyle.right;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const sidebarLayer = sidebarLayerRef.current;
    if (!sidebarLayer) return;

    const handleTouchMove = (event: TouchEvent) => {
      if (
        scrollContainerRef.current &&
        event.target instanceof Node &&
        scrollContainerRef.current.contains(event.target)
      ) {
        return;
      }

      event.preventDefault();
    };

    sidebarLayer.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      sidebarLayer.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;
  if (isPending) return null;
  if (isError) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400); // Match animation duration
  };

  const handleExit = async (): Promise<void> => {
    try {
      await mutateAsync(albumId);
      setIsClosing(true);
      setTimeout(() => {
        router.replace('/main');
        Toast.check(
          `${informData?.title ? `${informData.title} ` : ''}앨범을 나갔어요.`,
        );
      }, 400);
    } catch (e) {
      console.error(e);
      Toast.alert(`앨범 나가기를 실패하였어요.\n다시한번 시도해주세요.`);
    }
  };
  const isExpired = getIsExpired(informData?.expiredAt);
  const isMaker = informData?.myRole === 'MAKER';

  return (
    <>
      <div
        ref={sidebarLayerRef}
        className={`bg-background-white fixed inset-0 z-60 ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}
      >
        <main
          className='mx-auto flex h-screen w-full max-w-[430px] touch-none flex-col bg-[#f7f7f8] px-5 pb-5'
          style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
        >
          <section className='flex flex-col items-center rounded-[12px] py-8 text-center'>
            <button
              onClick={handleClose}
              type='button'
              className='absolute right-5'
            >
              <X width={24} height={24} color='var(--color-icon-basic)' />
            </button>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-white text-[36px]'>
              {informData?.themeEmoji
                ? convertUnicodeToEmoji(informData?.themeEmoji)
                : '😀'}
            </div>
            <h1 className='typo-heading-md-semibold text-text-basic mt-3'>
              {informData?.title}
            </h1>
            <p className='typo-body-sm-regular text-text-subtler'>
              {informData?.eventDate}
            </p>
            {!isExpired && (
              <div className='typo-caption-sm-medium text-text-basic-inverse bg-element-alpha-dark mt-3 rounded-full px-2.5 py-1'>
                앨범 소멸까지 {formatExpirationTime(informData?.expiredAt)}
              </div>
            )}
          </section>

          <div
            ref={scrollContainerRef}
            className='min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]'
          >
            <AlbumParticipants albumId={albumId} />

            {(!isMaker || isExpired) && (
              <div className='mt-3 w-full'>
                <ConfirmModal
                  trigger={
                    <button
                      type='button'
                      className='text-text-error bg-background-white typo-body-lg-semibold w-full rounded-[8px] py-3'
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
            )}
          </div>
        </main>
      </div>
    </>
  );
}
