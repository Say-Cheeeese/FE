'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 백드롭 (배경 어둡게) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-[rgba(24,25,27,0.2)] z-50'
            onClick={onClose}
          />

          {/* 모달 컨테이너 */}
          <div className='fixed inset-x-0 bottom-0 z-51 flex justify-center'>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className='bg-white rounded-t-[20px] p-6 pt-0 shadow-xl w-full max-w-[430px] mx-auto'
            >
              <div className='absolute left-1/2 -translate-x-1/2 top-[10px] w-12 h-[6px] bg-element-gray rounded-full'></div>
              {/* 이미지 그리드 */}
              <div className='grid grid-cols-5 gap-4 justify-items-center pt-10'>
                {imageList.map((img, index) => (
                  <motion.button
                    key={img}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    onClick={() => handleImageClick(img)}
                    className={
                      'p-1 rounded-full transition-all' +
                      (img === selectedImage
                        ? ' ring-3 ring-element-primary'
                        : '')
                    }
                    whileTap={{ scale: 0.8 }}
                  >
                    <Image
                      src={`/assets/onboarding/${img}`}
                      width={60}
                      height={60}
                      alt={img}
                      className='rounded-full'
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
