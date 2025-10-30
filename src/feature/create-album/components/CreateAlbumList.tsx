'use client';
import LongButton from '@/global/components/LongButton';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { useState } from 'react';
import AlbumEmojiSelector from './AlbumEmojiSelector';
import CreateInputList from './CreateInputList';

export default function CreateAlbumList() {
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [participantCount, setParticipantCount] = useState('');
  const [hasFormError, setHasFormError] = useState(false);

  const handleSubmit = () => {
    console.log('앨범 생성:', {
      emoji: selectedEmoji,
      eventName,
      eventDate,
      participantCount,
    });
    // API 호출 등
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
        <LongButton text='확인' />
      </BottomSheetModal>
    </div>
  );
}
