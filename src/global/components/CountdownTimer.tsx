'use client';
// 1. 필요한 라이브러리 import
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// 2. 남은 시간을 계산하는 헬퍼 함수
function calculateTimeLeft(targetDate) {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = {
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

// 3. 숫자가 바뀔 때 애니메이션을 적용할 컴포넌트
function AnimatedNumber({ number, label }) {
  // 숫자가 10보다 작을 때 (e.g., 9초) "09"로 보이도록 포맷팅
  const formattedNumber = String(number).padStart(2, '0');

  return (
    <div className='mx-2 flex flex-col items-center gap-2'>
      <div className='bg-element-gray-lighter flex h-[50px] w-[50px] flex-col items-center justify-center rounded-xl'>
        <div className='typo-heading-md-medium text-text-subtle relative h-[30px] w-[30px] overflow-hidden'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={formattedNumber}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='absolute top-0 right-0 left-0 text-center'
            >
              {formattedNumber}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <span className='typo-caption-sm-medium text-text-subtler uppercase'>
        {label}
      </span>
    </div>
  );
}

// 4. 메인 카운트다운 타이머 컴포넌트
export function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  // 1초마다 시간을 다시 계산
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      // 시간이 다 되면 타이머 중지
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className='flex items-end justify-center'>
      <AnimatedNumber number={timeLeft.days} label='Days' />
      <span className='mb-7 text-2xl font-semibold text-[#D9D9D9]'>:</span>
      <AnimatedNumber number={timeLeft.hours} label='Hrs' />
      <span className='mb-7 text-2xl font-semibold text-[#D9D9D9]'>:</span>
      <AnimatedNumber number={timeLeft.minutes} label='Mins' />
      <span className='mb-7 text-2xl font-semibold text-[#D9D9D9]'>:</span>
      <AnimatedNumber number={timeLeft.seconds} label='Secs' />
    </div>
  );
}
