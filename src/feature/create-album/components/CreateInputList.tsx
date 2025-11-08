'use client';

import XInput from '@/global/components/XInput';
import { useState } from 'react';

interface CreateInputListProps {
  eventName: string;
  eventDate: string;
  participantCount: string;
  onEventNameChange: (value: string) => void;
  onEventDateChange: (value: string) => void;
  onParticipantCountChange: (value: string) => void;
  onErrorChange?: (hasError: boolean) => void;
}

export default function CreateInputList({
  eventName,
  eventDate,
  participantCount,
  onEventNameChange,
  onEventDateChange,
  onParticipantCountChange,
  onErrorChange,
}: CreateInputListProps) {
  const [eventNameError, setEventNameError] = useState('');
  const [participantCountError, setParticipantCountError] = useState('');

  // 이벤트 이름 검증: 13글자 이내의 한글, 영문, 숫자, _, .만 허용
  const handleEventNameChange = (value: string) => {
    const validPattern = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_. ]*$/;
    let error = '';

    if (!validPattern.test(value)) {
      error =
        '13글자 이내의 한글, 영문, 숫자, 특수기호(_), (.)만 쓸 수 있어요.';
    }

    setEventNameError(error);
    onErrorChange?.(error !== '' || participantCountError !== '');
    onEventNameChange(value);
  };

  // 참여 인원 검증: 1~64명
  const handleParticipantCountChange = (value: string) => {
    // 빈 문자열이면 허용
    if (value === '') {
      setParticipantCountError('');
      onErrorChange?.(eventNameError !== '');
      onParticipantCountChange(value);
      return;
    }

    // 숫자만 허용 (앞의 0 제거)
    const sanitizedValue = value.replace(/\D/g, ''); // 숫자가 아닌 것 제거
    const numberValue =
      sanitizedValue === '' ? '' : String(parseInt(sanitizedValue, 10));

    const number = parseInt(numberValue, 10);

    let error = '';

    if (numberValue === '' || isNaN(number)) {
      error = '';
      onParticipantCountChange('');
    } else if (number === 0) {
      error = '최소 1명 이상 가능해요';
      onParticipantCountChange(numberValue);
    } else if (number > 64) {
      error = '최대 64명까지 가능해요';
      onParticipantCountChange(numberValue);
    } else {
      error = '';
      onParticipantCountChange(numberValue);
    }

    setParticipantCountError(error);
    onErrorChange?.(error !== '' || eventNameError !== '');
  };

  // 로컬 시간대 기준으로 어제 날짜를 YYYY-MM-DD로 계산
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yyyy = yesterdayDate.getFullYear();
  const mm = String(yesterdayDate.getMonth() + 1).padStart(2, '0'); // 0-11이므로 +1
  const dd = String(yesterdayDate.getDate()).padStart(2, '0');
  const yesterday = `${yyyy}-${mm}-${dd}`;

  return (
    <div className='flex flex-col gap-6 px-4'>
      <XInput
        label='이벤트 이름'
        value={eventName}
        onChange={handleEventNameChange}
        placeholder='이벤트 이름을 입력하세요'
        error={eventNameError}
        maxLength={13}
      />
      <XInput
        label='이벤트 날짜'
        value={eventDate}
        onChange={onEventDateChange}
        placeholder='YYYY-MM-DD'
        type='date'
        max={yesterday}
      />
      <XInput
        label='참여 인원'
        value={participantCount}
        onChange={handleParticipantCountChange}
        placeholder='최대 64명까지 가능해요'
        error={participantCountError}
        type='number'
        inputMode='numeric'
      />
    </div>
  );
}
