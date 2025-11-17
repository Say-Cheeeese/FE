// SpinningRing.tsx
'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function EmojiLoading() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // 시작 시 약간의 딜레이를 준 후 애니메이션 시작
    const timeout = setTimeout(() => {
      let frame: number;
      const startTime = performance.now();
      const duration = 3000; // 3초 동안 애니메이션

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setPercent(progress * 100);

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        }
      };
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }, 100); // 100ms 딜레이

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className='z-99 h-screen w-full'
      style={{ backgroundColor: 'rgba(24, 25, 27, 0.50)' }}
    >
      <div className='relative h-40 w-40 rounded-full'>
        <motion.div
          className='absolute rounded-full'
          style={{
            width: '100%',
            height: '100%',
            background:
              percent > 0
                ? `conic-gradient(#FFCD14 0% ${percent}%, #FFE480 ${percent}%, white ${percent}% 100%)`
                : 'white',
          }}
        />
        <div
          className='absolute rounded-full'
          style={{
            inset: '6px',
            backgroundColor: '#8b8c8d',
          }}
        >
          <div
            className='absolute rounded-full bg-white'
            style={{ inset: '6px' }}
          />
        </div>
        {/* 중앙에 이모지 등 원하는 내용 */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-[50px]'>😀</span>
        </div>
      </div>
    </div>
  );
}
