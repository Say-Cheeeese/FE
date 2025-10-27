'use client';
import React, { useState } from 'react';
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

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className='mt-22 mb-10 flex flex-col items-center'>
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

      {/* 이모지 피커 (이미지 바로 아래 표시) */}
      {showPicker && (
        <div
          className='z-50 mt-4'
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
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
}
