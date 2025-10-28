'use client';
import React from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { DrawerClose } from '@/components/ui/drawer';

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
        <BottomSheetModal
          trigger={
            <button className='bg-element-gray-dark absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full shadow'>
              <Pencil width={18.6} height={18.6} color='#fff' />
            </button>
          }
          showCloseButton={false}
          className='px-6'
          dismissible={true}
        >
          <div className='grid grid-cols-5 justify-items-center gap-4 pt-6 pb-6'>
            {imageList.map((img) => (
              <DrawerClose key={img} asChild>
                <button
                  onClick={() => onImageSelect(img)}
                  className={`rounded-full p-1 transition-all ${
                    img === currentImage ? 'ring-element-primary ring-3' : ''
                  }`}
                >
                  <Image
                    src={`/assets/onboarding/${img}`}
                    width={60}
                    height={60}
                    alt={img}
                    className='rounded-full'
                  />
                </button>
              </DrawerClose>
            ))}
          </div>
        </BottomSheetModal>
      </div>
    </div>
  );
}
