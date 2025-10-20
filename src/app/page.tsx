'use client';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData: any) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  return (
    <div className='w-full flex flex-col items-center justify-centerp-4 bg-button-primary-fill text-17-600'>
      <div className='text-body-lg-bold'>안녕하세요</div>
      <input
        className='border px-2 py-1 rounded w-full mb-2 text-black'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='이모지를 입력해보세요'
      />
      <button
        className='mb-2 px-2 py-1 border rounded bg-white text-black'
        onClick={() => setShowPicker((v) => !v)}
      >
        이모지 선택
      </button>
      {showPicker && (
        <>
          {/* 오버레이 배경 */}
          <div
            className='fixed inset-0  bg-opacity-60 z-40'
            onClick={() => setShowPicker(false)}
          />
          {/* 바텀시트 모달 */}
          <div
            className='fixed left-0 right-0 bottom-0 z-50 flex justify-center items-end'
            style={{ pointerEvents: 'none' }}
          >
            <div
              className='bg-white rounded-t-xl shadow-lg p-4 mb-0'
              style={{
                width: 320,
                maxWidth: '100vw',
                pointerEvents: 'auto',
                transform: 'translateY(100%)',
                animation: 'slideUp 0.3s forwards',
              }}
            >
              <button
                className='absolute right-4 top-4 text-lg text-gray-400 hover:text-gray-600'
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
