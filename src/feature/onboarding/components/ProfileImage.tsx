'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import ImageModal from './ImageModal';

const imageList = [
  'smile1.svg',
  'smile2.svg',
  'smile3.svg',
  'smile4.svg',
  'smile5.svg',
  'smile6.svg',
  'smile7.svg',
  'smile8.svg',
  'smile9.svg',
  'smile10.svg',
];

interface ProfileImageProps {
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
}

export default function ProfileImage({
  selectedImage,
  onImageSelect,
}: ProfileImageProps) {
  const [showModal, setShowModal] = useState(false);
  const currentImage = selectedImage || 'smile1.svg';

  return (
    <div className='mt-22 mb-10 flex flex-col items-center'>
      {/* 프로필 이미지 */}
      <div className='relative'>
        <Image
          src={`/assets/onboarding/${currentImage}`}
          width={100}
          height={100}
          alt='프로필 이미지'
          className='rounded-full'
        />
        {/* 연필 아이콘 (수정 버튼) */}
        <button
          className='bg-element-gray-dark absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full shadow'
          onClick={() => setShowModal(true)}
        >
          <Pencil width={18.6} height={18.6} color='#fff' />
        </button>
      </div>

      {/* 이미지 선택 모달 */}
      <ImageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        imageList={imageList}
        selectedImage={currentImage}
        onImageSelect={(image) => {
          onImageSelect(image);
          setShowModal(false);
        }}
      />
    </div>
  );
}
