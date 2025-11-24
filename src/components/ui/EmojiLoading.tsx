'use client';
import { EP } from '@/global/api/ep';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { useUploadingStore } from '@/store/useUploadingStore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import BubbleHint from '@/global/components/tooltip/BubbleTooltip';
import { useQueryClient } from '@tanstack/react-query';

interface EmojiLoadingProps {
  duration?: number;
  emoji?: string;
  albumId?: string;
}
export default function EmojiLoading({
  duration = 3000,
  emoji = 'U+1F60A',
  albumId,
}: EmojiLoadingProps) {
  const queryClient = useQueryClient();
  const [percent, setPercent] = useState(0);

  const displayEmoji = convertUnicodeToEmoji(emoji);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let frame: number;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setPercent(progress * 100);

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          // albumId를 props로 받아 invalidate
          if (albumId) {
            queryClient.invalidateQueries({
              queryKey: [EP.album.photos(albumId)],
            });
            queryClient.invalidateQueries({
              queryKey: [EP.album.availableCount(albumId)],
            });
          }
          useUploadingStore.getState().setUploaded(false);
        }
      };
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }, 100);

    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <div
      className='fixed inset-0 z-99 flex items-center justify-center'
      style={{ backgroundColor: 'rgba(24, 25, 27, 0.50)' }}
    >
      <div className='relative flex h-40 w-40 items-center justify-center rounded-full'>
        <BubbleHint message='📸 이미지를 채우고 있어요' className='-top-18' />
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
            className='absolute flex items-center justify-center rounded-full bg-white text-5xl'
            style={{ inset: '6px' }}
          >
            {displayEmoji}
          </div>
        </div>
      </div>
    </div>
  );
}
