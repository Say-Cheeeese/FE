'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageList: string[];
  selectedImage: string;
  onImageSelect: (image: string) => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageList,
  selectedImage,
  onImageSelect,
}: ImageModalProps) {
  const handleImageClick = (img: string) => {
    onImageSelect(img);
    onClose();
  };

  // 모달이 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 닫힘 애니메이션 끝나면 onClose 호출 (불필요하므로 삭제)

  if (!isOpen) return null;

  return (
    <>
      {/* 백드롭 (배경 어둡게) */}
      <div
        className='fixed inset-0 z-50 bg-[rgba(24,25,27,0.2)] transition-opacity duration-300'
        onClick={onClose}
      />

      {/* 모달 컨테이너 */}
      <div className='fixed inset-x-0 bottom-0 z-51 flex justify-center'>
        <div className='animate-slide-up mx-auto w-full max-w-[430px] rounded-t-[20px] bg-white p-6 pt-0 shadow-xl'>
          {/* 헤더
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-body-lg-semibold text-text-basic">프로필 이미지 선택</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-text-subtle" />
            </button>
          </div> */}
          <div className='bg-element-gray absolute top-[10px] left-1/2 h-[6px] w-12 -translate-x-1/2 rounded-full'></div>
          {/* 이미지 그리드 */}
          <div className='grid grid-cols-5 justify-items-center gap-4 pt-10'>
            {imageList.map((img) => (
              <button
                key={img}
                onClick={() => handleImageClick(img)}
                className={
                  'rounded-full p-1 transition-all' +
                  (img === selectedImage ? ' ring-element-primary ring-3' : '')
                }
              >
                <Image
                  src={`/assets/onboarding/${img}`}
                  width={60}
                  height={60}
                  alt={img}
                  className='rounded-full'
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
