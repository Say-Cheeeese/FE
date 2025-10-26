'use client';
import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { api } from '@/global/utils/api';

interface EmojiClickData {
  activeSkinTone: string;
  emoji: string;
  imageUrl: string;
  isCustom: boolean;
  names: string[];
  unified: string;
  unifiedWithoutSkinTone: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    console.log('emojiData:', emojiData);
    console.log('Type:', typeof emojiData);
    console.log('Keys:', Object.keys(emojiData));
    setInput((prev) => prev + emojiData.emoji);
  };

  return (
    <div className='justify-centerp-4 bg-button-primary-fill text-17-600 flex w-full flex-col items-center'>
      <div className='text-body-lg-bold'>안녕하세요</div>
      <input
        className='mb-2 w-full rounded border px-2 py-1 text-black'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='이모지를 입력해보세요'
      />
      <button
        className='mb-2 rounded border bg-white px-2 py-1 text-black'
        onClick={() => setShowPicker((v) => !v)}
      >
        이모지 선택
      </button>
      {showPicker && (
        <>
          {/* 오버레이 배경 */}
          <div
            className='bg-opacity-60 fixed inset-0 z-40'
            onClick={() => setShowPicker(false)}
          />
          {/* 바텀시트 모달 */}
          <div
            className='fixed right-0 bottom-0 left-0 z-50 flex items-end justify-center'
            style={{ pointerEvents: 'none' }}
          >
            <div
              className='mb-0 rounded-t-xl bg-white p-4 shadow-lg'
              style={{
                width: 320,
                maxWidth: '100vw',
                pointerEvents: 'auto',
                transform: 'translateY(100%)',
                animation: 'slideUp 0.3s forwards',
              }}
            >
              <button
                className='absolute top-4 right-4 text-lg text-gray-400 hover:text-gray-600'
                onClick={() => setShowPicker(false)}
                style={{ zIndex: 10 }}
                aria-label='닫기'
              >
                ×
              </button>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                height={350}
                width={300}
                searchDisabled
                skinTonesDisabled
                previewConfig={{ showPreview: false }}
                lazyLoadEmojis={true}
              />
            </div>
          </div>
          {/* 슬라이드 업 애니메이션 CSS */}
          <style jsx>{`
            @keyframes slideUp {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
