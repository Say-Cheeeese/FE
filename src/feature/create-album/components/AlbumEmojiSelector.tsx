'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

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
    <div className='relative mt-[113px] mb-10 flex flex-col items-center'>
      {/* 이모지 표시 */}
      <div className='relative'>
        <div className='bg-element-gray-lighter flex h-[100px] w-[100px] items-center justify-center rounded-full text-[50px]'>
          {selectedEmoji}
        </div>
        {/* 연필 아이콘 (수정 버튼) */}
        <button
          className='bg-element-gray-darker absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full shadow'
          onClick={() => setShowPicker(!showPicker)}
        >
          <Pencil width={18.6} height={18.6} color='#fff' />
        </button>
      </div>

      {/* 이모지 피커 (fixed로 고정) */}
      {showPicker && (
        <div
          ref={pickerRef}
          className='absolute bottom-[-450px] left-1/2 z-50 -translate-x-1/2 -translate-y-1/2'
          style={{
            filter: 'drop-shadow(0 0 25px rgba(0, 0, 0, 0.08))',
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={300}
            width={310}
            searchDisabled
            skinTonesDisabled
            previewConfig={{ showPreview: false }}
            lazyLoadEmojis={false}
          />
        </div>
      )}
    </div>
  );
}
