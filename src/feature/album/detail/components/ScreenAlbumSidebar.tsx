'use client';

import CustomHeader, {
  HEADER_HEIGHT,
} from '@/global/components/header/CustomHeader';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ScreenAlbumSidebarProps {
  albumId: string;
}

interface Participant {
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
      <CustomHeader
        title=''
        rightContent={
          <button
            type='button'
            aria-label='사이드바 닫기'
            onClick={() => router.back()}
          >
            <X width={24} height={24} color='var(--color-icon-basic)' />
          </button>
        }
        isShowBack={false}
      />
      <main
        className='mx-auto flex w-full max-w-[430px] flex-col px-5 pb-10'
        style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <section className='flex flex-col items-center pt-6 text-center'>
          <div className='bg-element-gray-light flex h-16 w-16 items-center justify-center rounded-full text-[36px]'>
            😄
          </div>
          <h1 className='typo-heading-md-bold text-text-basic mt-4 leading-8'>
            {albumMeta.title}
          </h1>
          <p className='typo-body-sm-medium text-text-subtle mt-1'>
            {albumMeta.date}
          </p>
          <div className='typo-body-sm-medium text-text-subtler bg-element-gray-subtle mt-3 rounded-full px-4 py-1.5'>
            {albumMeta.countdown}
          </div>
        </section>

        <section className='border-divider-gray-light mt-8 rounded-2xl border bg-white px-5 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'>
          <div className='mb-5 flex items-center justify-between gap-3'>
            <div>
              <p className='typo-body-lg-semibold text-text-basic'>
                앨범 참가자 {albumMeta.participantSummary}
              </p>
            </div>
            <button
              type='button'
              className='typo-body-sm-semibold text-text-primary bg-button-primary-fill rounded-lg px-4 py-2 shadow-[0_6px_18px_rgba(255,205,20,0.35)]'
            >
              친구 초대
            </button>
          </div>

          <div>
            {participants.map((participant, index) => (
              <ParticipantRow
                key={participant.id}
                participant={participant}
                showDivider={index !== participants.length - 1}
              />
            ))}
          </div>
        </section>

        <button
          type='button'
          className='typo-body-lg-semibold text-text-subtle border-divider-gray bg-element-gray-light mt-8 w-full rounded-xl border py-4 text-center'
        >
          앨범 나가기
        </button>
      </main>
    </>
  );
}

interface ParticipantRowProps {
  participant: Participant;
  showDivider?: boolean;
}

function ParticipantRow({ participant, showDivider }: ParticipantRowProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 py-3 ${showDivider ? 'border-divider-gray-light border-b' : ''}`}
    >
      <div className='flex items-center gap-3 overflow-hidden'>
        <div className='bg-element-gray-subtle flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl'>
          {participant.emoji}
        </div>
        <span className='typo-body-lg-medium text-text-basic truncate'>
          {participant.name}
        </span>
      </div>
      <div className='flex flex-shrink-0 gap-2'>
        {participant.role === 'maker' && (
          <span className='typo-caption-md-semibold text-element-primary border-border-primary-light bg-element-primary-lighter rounded-full border px-2 py-0.5'>
            메이커
          </span>
        )}
        {participant.isMe && (
          <span className='typo-caption-md-semibold text-text-subtle bg-element-gray rounded-full px-2 py-0.5'>
            나
          </span>
        )}
      </div>
    </div>
  );
}
