'use client';
import LongButton from '@/global/components/LongButton';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { useState } from 'react';
import { createAlbumApi } from '../api/createAlbumApi';
import AlbumEmojiSelector from './AlbumEmojiSelector';
import CreateInputList from './CreateInputList';

// 이모지를 유니코드 코드포인트 형식으로 변환 (예: 😊 → U+1F60A)
const emojiToUnicode = (emoji: string): string => {
  const codePoint = emoji.codePointAt(0);
  if (!codePoint) return '';
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
};

export default function CreateAlbumList() {
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [participantCount, setParticipantCount] = useState('');
  const [hasFormError, setHasFormError] = useState(false);

  const handleSubmit = async () => {
    const emojiUnicode = emojiToUnicode(selectedEmoji);
    try {
      const result = await createAlbumApi({
        themeEmoji: emojiUnicode,
        title: eventName,
        participant: parseInt(participantCount, 10),
        eventDate,
      });
      console.log('앨범 생성 성공:', result);
      // TODO: 성공 후 페이지 이동 등 추가 작업
    } catch (err) {
      console.error('앨범 생성 실패:', err);
      // TODO: 에러 처리
    }
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
    <div className='mt-[113px]'>
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
          />
        }
        showCloseButton={false}
        className='px-6 pt-10 pb-5'
        dismissible={true}
        showHandle={false}
      >
        <div className='flex flex-col gap-4 px-2'>
          <span className='text-text-basic text-heading-md-bold'>
            치즈 앨범 메뉴얼
          </span>
          <ul className='text-text-subtle text-16-500 mb-[166px] flex list-disc flex-col gap-2 pl-5'>
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
