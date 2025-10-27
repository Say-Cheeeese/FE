import React from 'react';
import EmojiPicker from 'emoji-picker-react';

interface EmojiClickData {
  activeSkinTone: string;
  emoji: string;
  imageUrl: string;
  isCustom: boolean;
  names: string[];
  unified: string;
  unifiedWithoutSkinTone: string;
}

interface EmojiModalProps {
  show: boolean;
  onClose: () => void;
  onEmojiClick: (emojiData: EmojiClickData) => void;
}

const EmojiModal: React.FC<EmojiModalProps> = ({
  show,
  onClose,
  onEmojiClick,
}) => {
  if (!show) return null;
  return (
    <>
      {/* 오버레이 배경 */}
      <div className='bg-opacity-60 fixed inset-0 z-40' onClick={onClose}></div>
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
            position: 'relative',
          }}
        >
          <button
            className='absolute top-4 right-4 text-lg text-gray-400 hover:text-gray-600'
            onClick={onClose}
            style={{ zIndex: 10 }}
            aria-label='닫기'
          >
            ×
          </button>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
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
  );
};

export default EmojiModal;
