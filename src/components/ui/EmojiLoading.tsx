'use client';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

import BubbleTooltip from '@/global/components/tooltip/BubbleTooltip';

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
  const displayEmoji = convertUnicodeToEmoji(emoji);

  useEffect(() => {
    // 5초 타이머 로직 모두 제거
    // 모달 컴포넌트는 오직 '보여주는 뷰' 역할만 하고,
    // 진짜 업로드가 끝나면 handleFileUpload 쪽에서 isUploaded=false 처리하여 스스로 사라집니다.
  }, []);

  return (
    <div className='bg-background-dim-darkest fixed inset-0 z-99 flex items-center justify-center'>
      <div className='relative flex h-40 w-40 items-center justify-center rounded-full'>
        <BubbleTooltip
          message='📸 이미지를 채우고 있어요'
          className='absolute -top-18'
        />
        <motion.div
          className='absolute rounded-full w-full h-full'
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `conic-gradient(#FFCD14 0% 30%, transparent 35% 100%)`,
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
