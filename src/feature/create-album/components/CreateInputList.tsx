'use client';

import DateXInput from '@/global/components/DateXInput';
import XInput from '@/global/components/XInput';
import { format } from 'date-fns';
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

  const handleParticipantCountChange = (value: string) => {
    if (value === '') {
      setParticipantCountError('');
      onErrorChange?.(eventNameError !== '');
      onParticipantCountChange(value);
      return;
    }

    const sanitizedValue = value.replace(/\D/g, '');
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

  const today = format(new Date(), 'yyyy-MM-dd');

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
      <DateXInput
        label='이벤트 날짜'
        value={eventDate}
        onChange={onEventDateChange}
        placeholder='YYYY-MM-DD'
        max={today}
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
