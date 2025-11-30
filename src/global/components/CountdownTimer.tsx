'use client';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface AnimatedNumberProps {
  number: number;
  label: string;
}

interface CountdownTimerProps {
  albumId: string;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

function AnimatedNumber({ number, label }: AnimatedNumberProps) {
  const formattedNumber = String(number).padStart(2, '0');

  return (
    <div className='mx-2 flex flex-col items-center gap-2'>
      <div className='bg-element-gray-lighter flex h-[50px] w-[50px] flex-col items-center justify-center rounded-xl'>
        <div className='typo-heading-md-medium text-text-subtle relative h-[30px] w-[30px] overflow-hidden'>
          <AnimatePresence mode='wait'>
            <m.div
              key={formattedNumber}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='absolute top-0 right-0 left-0 text-center'
            >
              {formattedNumber}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <span className='typo-caption-sm-medium text-text-subtler uppercase'>
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({ albumId }: CountdownTimerProps) {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const storageKey = `album_${albumId}_created_date`;

    const storedDate = localStorage.getItem(storageKey);

    let calculatedDate: Date;

    if (storedDate) {
      calculatedDate = new Date(storedDate);
    } else {
      calculatedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      localStorage.setItem(storageKey, calculatedDate.toISOString());
    }

    setTargetDate(calculatedDate);
    setTimeLeft(calculateTimeLeft(calculatedDate));
  }, [albumId]);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // 레이아웃 시프트 방지를 위해 초기 렌더링 시에도 공간 확보
  if (!targetDate) {
    return (
      <div className='flex items-end justify-center opacity-0'>
        <div className='mx-2 flex flex-col items-center gap-2'>
          <div className='bg-element-gray-lighter flex h-[50px] w-[50px] flex-col items-center justify-center rounded-xl'></div>
          <span className='typo-caption-sm-medium text-text-subtler uppercase'>
            Days
          </span>
        </div>
        <span className='mb-9 text-2xl font-semibold text-[#D9D9D9]'>:</span>
        <div className='mx-2 flex flex-col items-center gap-2'>
          <div className='bg-element-gray-lighter flex h-[50px] w-[50px] flex-col items-center justify-center rounded-xl'></div>
          <span className='typo-caption-sm-medium text-text-subtler uppercase'>
            HOURS
          </span>
        </div>
        <span className='mb-9 text-2xl font-semibold text-[#D9D9D9]'>:</span>
        <div className='mx-2 flex flex-col items-center gap-2'>
          <div className='bg-element-gray-lighter flex h-[50px] w-[50px] flex-col items-center justify-center rounded-xl'></div>
          <span className='typo-caption-sm-medium text-text-subtler uppercase'>
            Mins
          </span>
        </div>
        <span className='mb-9 text-2xl font-semibold text-[#D9D9D9]'>:</span>
        <div className='mx-2 flex flex-col items-center gap-2'>
          <div className='bg-element-gray-lighter flex h-[50px] w-[50px] flex-col items-center justify-center rounded-xl'></div>
          <span className='typo-caption-sm-medium text-text-subtler uppercase'>
            Secs
          </span>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className='flex items-end justify-center'>
        <AnimatedNumber number={timeLeft.days} label='Days' />
        <span className='mb-9 text-2xl font-semibold text-[#D9D9D9]'>:</span>
        <AnimatedNumber number={timeLeft.hours} label='HOURS' />
        <span className='mb-9 text-2xl font-semibold text-[#D9D9D9]'>:</span>
        <AnimatedNumber number={timeLeft.minutes} label='Mins' />
        <span className='mb-9 text-2xl font-semibold text-[#D9D9D9]'>:</span>
        <AnimatedNumber number={timeLeft.seconds} label='Secs' />
      </div>
    </LazyMotion>
  );
}
