'use client';

import { HEADER_HEIGHT } from '@/global/components/header/CustomHeader';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ItemParticipant from './ItemParticipant';

interface ScreenAlbumSidebarProps {
  albumId: string;
}

export interface Participant {
  id: string;
  name: string;
  emoji: string;
  role?: 'maker';
  isMe?: boolean;
}

const albumMeta = {
  title: '김수한무거북이와두루미삼천',
  date: '2025.08.23',
  countdown: '앨범 소멸까지 2시간 5분',
  participantSummary: '54/64',
};

const participants: Participant[] = [
  {
    id: 'owner',
    name: '김수한무거북이와두루미삼천',
    emoji: '😄',
    isMe: true,
  },
  { id: 'maker', name: '맹소', emoji: '😄', role: 'maker' },
  { id: 'member-1', name: '맹소', emoji: '😄' },
  { id: 'member-2', name: '맹소', emoji: '😄' },
];

export default function ScreenAlbumSidebar({
  albumId: _albumId,
}: ScreenAlbumSidebarProps) {
  const router = useRouter();

  return (
    <>
      <main
        className='mx-auto flex h-screen w-full max-w-[430px] flex-col px-5 pb-5'
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <section className='border-divider-gray-light flex flex-col items-center border-b-[6px] py-8 text-center'>
          <button type='button' className='absolute right-5'>
            <X width={24} height={24} color='var(--color-icon-basic)' />
          </button>
          <div className='bg-element-gray-light flex h-16 w-16 items-center justify-center rounded-full text-[36px]'>
            😄
          </div>
          <h1 className='typo-heading-md-semibold text-text-basic mt-3'>
            {albumMeta.title}
          </h1>
          <p className='typo-body-sm-regular text-text-subtler'>
            {albumMeta.date}
          </p>
          <div className='typo-caption-sm-medium text-text-basic-inverse bg-element-alpha-dark mt-3 rounded-full px-2.5 py-1'>
            {albumMeta.countdown}
          </div>
        </section>

        <section className='rounded-2xl bg-white py-8'>
          <div className='mb-3.5 flex items-center justify-between gap-3'>
            <div>
              <p className='typo-heading-sm-semibold text-text-subtle'>
                앨범 참가자 {albumMeta.participantSummary}
              </p>
            </div>
            <BottomSheetModal
              trigger={
                <button
                  type='button'
                  className='typo-body-sm-medium text-text-primary bg-button-primary-fill rounded-[4px] px-3 py-1.5'
                >
                  친구 초대
                </button>
              }
            >
              <div>
                <div className='pb-8'>
                  <h3 className='typo-heading-md-bold text-text-basic mb-1'>
                    친구 초대하기
                  </h3>
                  <span className='typo-body-lg-medium text-text-subtle'>
                    사진이 채워지는 동안 친구에게 앨범을 공유해보세요.
                  </span>
                </div>
                <div className='typo-body-sm-semibold flex justify-between'>
                  <button className='flex flex-col items-center justify-center'>
                    <div className='h-[58px] w-[58px] rounded-full bg-[#d9d9d9]' />
                    <span>카카오톡</span>
                  </button>
                  <button className='flex flex-col items-center justify-center'>
                    <div className='h-[58px] w-[58px] rounded-full bg-[#d9d9d9]' />
                    <span>QR코드</span>
                  </button>
                  <button className='flex flex-col items-center justify-center'>
                    <div className='h-[58px] w-[58px] rounded-full bg-[#d9d9d9]' />
                    <span>링크복사</span>
                  </button>
                  <button className='flex flex-col items-center justify-center'>
                    <div className='h-[58px] w-[58px] rounded-full bg-[#d9d9d9]' />
                    <span>더보기</span>
                  </button>
                </div>
              </div>
            </BottomSheetModal>
          </div>

          <div>
            {participants.map((participant, index) => (
              <ItemParticipant key={participant.id} participant={participant} />
            ))}
          </div>
        </section>
        <div className='mt-auto w-full'>
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
            confirmClassName='bg-button-accent-fill text-white'
          />
        </div>
      </main>
    </>
  );
}
