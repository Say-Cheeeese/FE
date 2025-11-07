'use client';
import { DrawerClose } from '@/components/ui/drawer';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { Pencil } from 'lucide-react';
import Image from 'next/image';

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
    <div className='mt-4 mb-10 flex flex-col items-center'>
      {/* 프로필 이미지 */}
      <div className='relative'>
        <BottomSheetModal
          trigger={
            <div className='group relative cursor-pointer'>
              <Image
                src={`/assets/onboarding/${currentImage}`}
                width={100}
                height={100}
                alt='프로필 이미지'
                className='rounded-full'
              />
              <button
                className='bg-element-gray-dark absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full shadow transition-transform group-hover:scale-110'
                tabIndex={-1}
                type='button'
                aria-label='프로필 이미지 선택'
              >
                <Pencil width={18.6} height={18.6} color='#fff' />
              </button>
            </div>
          }
          showCloseButton={false}
          className='h-90 px-5'
          showHandle={true}
          dismissible={true}
        >
          <div className='grid grid-cols-5 justify-items-center gap-4 pt-6 pb-6'>
            {imageList.map((img) => (
              <DrawerClose key={img} asChild>
                <button
                  onClick={() => onImageSelect(img)}
                  className={`box-content shrink-0 rounded-full p-1 transition-all ${
                    img === currentImage ? 'ring-element-primary ring-3' : ''
                  }`}
                >
                  <Image
                    src={`/assets/onboarding/${img}`}
                    width={100}
                    height={100}
                    alt={img}
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
