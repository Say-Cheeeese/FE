'use client';
import { DrawerClose } from '@/components/ui/drawer';
const BottomSheetModal = dynamic(
  () => import('@/global/components/modal/BottomSheetModal'),
  { ssr: false },
);
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { memo, useState } from 'react';
import { useGetAllProfiles } from '../hooks/useGetAllProfile';
import dynamic from 'next/dynamic';

interface ProfileImageProps {
  selectedImage: string | null;
  onImageSelect: (image: string) => void;
}

function ProfileImage({ selectedImage, onImageSelect }: ProfileImageProps) {
  const [shouldFetchProfiles, setShouldFetchProfiles] = useState(false);

  const { data, isLoading, isError } = useGetAllProfiles(shouldFetchProfiles);

  const PROFILE_IMAGES: Record<string, string> = {
    P1: 'https://say-cheese-profile.edge.naverncp.com/profile/sign_up_profile_1.jpg',
  };

  const imageList =
    data?.opts?.filter((img) => img.imageCode && img.profileImageUrl) ?? [];

  const getCurrentImageUrl = (): string => {
    if (imageList.length > 0 && selectedImage) {
      const foundImage = imageList.find(
        (img) => img.imageCode === selectedImage,
      );
      if (foundImage?.profileImageUrl) {
        return foundImage.profileImageUrl;
      }
    }

    if (selectedImage && PROFILE_IMAGES[selectedImage]) {
      return PROFILE_IMAGES[selectedImage];
    }

    return PROFILE_IMAGES['P1'];
  };

  const currentImage = getCurrentImageUrl();

  return (
    <div className='mt-4 mb-10 flex flex-col items-center'>
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
          onOpenChange={(isOpen) => {
            // 모달이 열리면 API fetch 활성화 (한번만)
            if (isOpen && !shouldFetchProfiles) {
              setShouldFetchProfiles(true);
            }
          }}
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
                    <button
                      onClick={() =>
                        img.imageCode && onImageSelect(img.imageCode)
                      }
                      className={`box-content shrink-0 rounded-full p-1 transition-all active:scale-90 ${
                        url === currentImage
                          ? 'ring-element-primary ring-3'
                          : ''
                      }`}
                      style={{
                        animation: `fadeInScale 0.2s ease-out ${index * 0.03}s both`,
                      }}
                    >
                      <Image
                        src={url || ''}
                        width={100}
                        height={100}
                        alt={img.imageCode || 'profile'}
                        className='rounded-full'
                      />
                    </button>
                  </DrawerClose>
                );
              })}
            </div>
          )}
        </BottomSheetModal>
      </div>

      {/* CSS 애니메이션 정의 */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default memo(ProfileImage);
