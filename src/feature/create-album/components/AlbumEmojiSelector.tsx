'use client';
import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import EmojiModal from '../../login/components/EmoJiModal';

interface EmojiClickData {
  activeSkinTone: string;
  emoji: string;
  imageUrl: string;
  isCustom: boolean;
  names: string[];
  unified: string;
  unifiedWithoutSkinTone: string;
}

interface AlbumEmojiSelectorProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

export default function AlbumEmojiSelector({
  selectedEmoji,
  onEmojiSelect,
}: AlbumEmojiSelectorProps) {
  const [showModal, setShowModal] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setShowModal(false);
  };

  return (
    <div className='mt-22 mb-10 flex flex-col items-center'>
      {/* 이모지 표시 */}
      <div className='relative'>
        <div className='bg-element-gray-lighter flex h-[100px] w-[100px] items-center justify-center rounded-full text-[60px]'>
          {selectedEmoji}
        </div>
        {/* 연필 아이콘 (수정 버튼) */}
        <button
          className='bg-element-gray-dark absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full shadow'
          onClick={() => setShowModal(true)}
        >
          <Pencil width={18.6} height={18.6} color='#fff' />
        </button>
      </div>

      {/* 이모지 선택 모달 */}
      <EmojiModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
}
