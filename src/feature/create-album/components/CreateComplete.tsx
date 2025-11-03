'use client';
import { CountdownTimer } from '@/global/components/CountdownTimer';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CreateComplete() {
  // targetDate는 Date 객체입니다 (예: new Date('2025-11-10T12:00:00'))
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    // 오늘로부터 7일 뒤 날짜 계산 (클라이언트에서만 실행)
    setTargetDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  }, []);

  return (
    <div className='mt-[210px] flex flex-col items-center gap-4'>
      <div className='bg-element-primary flex h-[74px] w-[74px] items-center justify-center rounded-full'>
        <Check width={50} height={34} stroke='#fff' strokeWidth={3} />
      </div>
      <div className='mb-8 flex flex-col'>
        <span className='typo-heading-md-medium text-center'>만들기 성공!</span>
        <span className='typo-heading-md-semibold'>앨범이 열렸어요</span>
      </div>
      {targetDate && <CountdownTimer targetDate={targetDate} />}
    </div>
  );
}
