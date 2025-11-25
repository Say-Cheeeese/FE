'use client';
import { Pencil } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// TBT 개선: emoji-picker-react를 dynamic import (약 200KB 절약)
const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => (
    <div className='h-[300px] w-[310px] animate-pulse rounded-lg bg-gray-200' />
  ),
});

interface EmojiClickData {
  emoji: string;
  unified: string;
}

interface AlbumEmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

export default function AlbumEmojiSelector({
  selectedEmoji,
  onEmojiSelect,
}: AlbumEmojiSelectorProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    if (!showPicker) return;
    const handleClick = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showPicker]);

  return (
    <div className='relative mt-10 mb-10 flex flex-col items-center'>
      {/* 이모지 표시 */}
      <div className='relative'>
        <div
          className='bg-element-gray-lighter flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full text-[50px]'
          onClick={() => setShowPicker(true)}
        >
          {selectedEmoji}
        </div>
        {/* 연필 아이콘 (수정 버튼) */}
        <button
          className='bg-element-gray-darker absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full'
          onClick={() => setShowPicker(!showPicker)}
        >
          <Pencil width={18.6} height={18.6} color='#fff' />
        </button>
      </div>

      {/* 이모지 피커 (fixed로 고정) */}
      {showPicker && (
        <div
          ref={pickerRef}
          className='absolute bottom-[-470px] left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-[8px]'
          style={{
            boxShadow: '0 0 25px 5px rgba(0, 0, 0, 0.08)',
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={300}
            width={310}
            searchDisabled
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
}
