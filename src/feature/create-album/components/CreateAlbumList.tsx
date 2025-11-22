'use client';
import LongButton from '@/global/components/LongButton';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  useCreateAlbum,
  type CreateAlbumApiResponse,
  type CreateAlbumError,
} from '../hook/useCreateAlbum';

import Toast from '@/global/components/toast/Toast';
import AlbumEmojiSelector from './AlbumEmojiSelector';
import CreateInputList from './CreateInputList';

// 이모지를 유니코드 코드포인트 형식으로 변환 (예: 😊 → U+1F60A)
const emojiToUnicode = (emoji: string): string => {
  const codePoint = emoji.codePointAt(0);
  if (!codePoint) return '';
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
};

export default function CreateAlbumList() {
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [participantCount, setParticipantCount] = useState('');
  const [hasFormError, setHasFormError] = useState(false);

  const { mutate: createAlbum } = useCreateAlbum();

  const handleSubmit = () => {
    const emojiUnicode = emojiToUnicode(selectedEmoji);
    createAlbum(
      {
        themeEmoji: emojiUnicode,
        title: eventName,
        participant: parseInt(participantCount, 10),
        eventDate,
      },
      {
        onSuccess: (result: CreateAlbumApiResponse) => {
          if (result.result.code) {
            router.push(`/create-album/${result.result.code}/complete`);
          }
        },
        onError: (err: CreateAlbumError) => {
          Toast.alert(err.message || '앨범 생성에 실패했습니다.');
          // router.push('/login');
          console.error('앨범 생성 실패:', err);
        },
      },
    );
  };

  const participantCountNumber = parseInt(participantCount, 10);
  const isFormComplete =
    eventName.trim() !== '' &&
    eventDate.trim() !== '' &&
    participantCount.trim() !== '' &&
    participantCountNumber >= 1 &&
    participantCountNumber <= 64 &&
    !hasFormError;

  return (
    <div>
      <AlbumEmojiSelector
        selectedEmoji={selectedEmoji}
        onEmojiSelect={setSelectedEmoji}
      />
      <CreateInputList
        eventName={eventName}
        eventDate={eventDate}
        participantCount={participantCount}
        onEventNameChange={setEventName}
        onEventDateChange={setEventDate}
        onParticipantCountChange={setParticipantCount}
        onErrorChange={setHasFormError}
      />
      <BottomSheetModal
        trigger={
          <LongButton
            text='앨범 만들기'
            disabled={!isFormComplete}
            sideGap={16}
            noFixed={false}
            bottomGap={20}
            safeArea={false}
          />
        }
        showCloseButton={false}
        className='pt-10 pb-5 pl-6'
        dismissible={true}
        showHandle={false}
      >
        <div className='flex flex-col gap-4'>
          <span className='text-text-basic typo-heading-md-bold'>
            치즈 앨범 메뉴얼
          </span>
          <ul className='text-text-subtle text-16-500 mb-[166px] flex list-disc flex-col gap-2 pl-4'>
            <li>이 앨범은 7일 뒤 자동으로 사라져요.</li>
            <li>메이커는 규칙을 어긴 참여자를 내보낼 수 있어요.</li>
            <li>메이커는 모든 사진을 정리 • 삭제할 수 있어요</li>
          </ul>
        </div>
        <LongButton text='확인' onClick={handleSubmit} />
      </BottomSheetModal>
    </div>
  );
}
