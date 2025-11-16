'use client';
import { DrawerClose } from '@/components/ui/drawer';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useGetAllProfiles } from '../hooks/useGetAllProfile';

interface ProfileImageProps {
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
}

export default function ProfileImage({
  selectedImage,
  onImageSelect,
}: ProfileImageProps) {
  const { data, isLoading, isError } = useGetAllProfiles();
  // 서버에서 받아온 이미지 리스트 (string[])
  const imageList = data?.opts ?? [];
  // imageCode에 따라 profileImageUrl을 보여줌
  const currentImage =
    (selectedImage
      ? imageList.find((img) => img.imageCode === selectedImage)
          ?.profileImageUrl
      : imageList[0]?.profileImageUrl) ||
    'https://say-cheese-profile.edge.naverncp.com/profile/signup_profile_1.jpg';
  console.log(currentImage);
  return (
    <div className='mt-4 mb-10 flex flex-col items-center'>
      {/* 프로필 이미지 */}
      <div className='relative'>
        <BottomSheetModal
          trigger={
            <div className='group relative cursor-pointer'>
              <Image
                src={currentImage}
                width={100}
                height={100}
                alt='프로필 이미지'
                className='rounded-full'
              />
              <button
                className='absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#94969E] transition-transform group-hover:scale-110'
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
          {isLoading ? null : isError ? (
            <div className='py-8 text-center text-red-500'>
              이미지 목록을 불러오지 못했습니다.
            </div>
          ) : (
            <div className='grid grid-cols-5 justify-items-center gap-4 pt-6 pb-6'>
              {imageList.map((img, index) => {
                const url = img.profileImageUrl;
                const key = img.imageCode || url;
                return (
                  <DrawerClose key={key} asChild>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => onImageSelect(img.imageCode || '')}
                      className={`box-content shrink-0 rounded-full p-1 transition-all ${
                        url === currentImage
                          ? 'ring-element-primary ring-3'
                          : ''
                      }`}
                    >
                      <Image
                        src={url || ''}
                        width={100}
                        height={100}
                        alt={img.imageCode || 'profile'}
                        className='rounded-full'
                      />
                    </motion.button>
                  </DrawerClose>
                );
              })}
            </div>
          )}
        </BottomSheetModal>
      </div>
    </div>
  );
}
