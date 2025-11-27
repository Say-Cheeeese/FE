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

  // P1 이미지 URL 하드코딩 (selectedImage 초기값이 'P1'이므로)
  // 이렇게 하면 API 응답 전후로 이미지 URL이 동일하여 재로드 방지
  const PROFILE_IMAGES: Record<string, string> = {
    'P1': 'https://say-cheese-profile.edge.naverncp.com/profile/sign_up_profile_1.jpg',
  };

  // 서버에서 받아온 이미지 리스트 (string[])
  const imageList =
    data?.opts?.filter((img) => img.imageCode && img.profileImageUrl) ?? [];

  // 현재 이미지 URL 결정 로직 (가독성 개선)
  const getCurrentImageUrl = (): string => {
    // 1. API에서 선택한 이미지 찾기
    if (imageList.length > 0 && selectedImage) {
      const foundImage = imageList.find((img) => img.imageCode === selectedImage);
      if (foundImage?.profileImageUrl) {
        return foundImage.profileImageUrl;
      }
    }

    // 2. 하드코딩된 프로필 이미지 사용
    if (selectedImage && PROFILE_IMAGES[selectedImage]) {
      return PROFILE_IMAGES[selectedImage];
    }

    // 3. 기본값: P1 이미지
    return PROFILE_IMAGES['P1'];
  };

  const currentImage = getCurrentImageUrl();

  return (
    <div className='mt-4 mb-10 flex flex-col items-center'>
      {/* 프로필 이미지 */}
      <div className='relative'>
        <BottomSheetModal
          trigger={
            <button
              className='group relative'
              type='button'
              aria-label='프로필 이미지 수정'
            >
              <Image
                src={currentImage}
                width={100}
                height={100}
                alt='프로필 이미지'
                className='rounded-full'
                priority
                fetchPriority='high'
              />
              <div className='absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#94969E] transition-transform group-hover:scale-110'>
                <Pencil width={18.6} height={18.6} color='#fff' />
              </div>
            </button>
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
                      onClick={() =>
                        img.imageCode && onImageSelect(img.imageCode)
                      }
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
