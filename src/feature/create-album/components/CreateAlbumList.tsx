'use client';
import React, { useState } from 'react';
import AlbumEmojiSelector from './AlbumEmojiSelector';
import CreateInputList from './CreateInputList';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';

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

  const isFormComplete =
    eventName.trim() !== '' &&
    eventDate.trim() !== '' &&
    participantCount.trim() !== '' &&
    parseInt(participantCount, 10) >= 1 &&
    parseInt(participantCount, 10) <= 64 &&
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
          <button
            className={`fixed bottom-5 left-1/2 h-14 w-[calc(100%-32px)] max-w-[368px] -translate-x-1/2 rounded-lg ${
              isFormComplete
                ? 'bg-button-primary-fill cursor-pointer'
                : 'bg-button-disabled-fill cursor-not-allowed'
            }`}
            disabled={!isFormComplete}
          >
            <span
              className={`text-body-1xl-semibold ${
                isFormComplete ? 'text-text-primary' : 'text-text-disabled'
              }`}
            >
              앨범 만들기
            </span>
          </button>
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
          <ul className='flex flex-col gap-2'>
            <li>이 앨범은 7일 뒤 자동으로 사라져요.</li>
            <li>메이커는 규칙을 어긴 참여자를 내보낼 수 있어요.</li>
            <li>메이커는 모든 사진을 정리 • 삭제할 수 있어요</li>
          </ul>
        </div>
      </BottomSheetModal>
    </div>
  );
}
