'use client';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import Toast from '@/global/components/toast/Toast';
import { shareImage } from '@/global/utils/image/shareImage';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Heart, Info } from 'lucide-react';
import { useState } from 'react';
import { usePhotoLikedMutation } from '../hooks/usePhotoLikedMutation';
import { usePhotoUnlikedMutation } from '../hooks/usePhotoUnlikedMutation';
import { updateCacheAlbumPhotosLike } from '../modules/updateCacheAlbumPhotosLike';
import ItemMemberData from './ItemMemberData';
import SectionPhotoData from './SectionPhotoData';

const mockMembers = [
  {
    id: 'member-1',
    profileImageUrl: '/assets/onboarding/smile1.svg',
    nickname: '테스트',
    isMe: true,
    isMaker: true,
  },
  {
    id: 'member-2',
    profileImageUrl: '/assets/onboarding/smile2.svg',
    nickname: '코코',
    isMe: true,
    isMaker: false,
  },
  {
    id: 'member-3',
    profileImageUrl: '/assets/onboarding/smile3.svg',
    nickname: '멜로',
    isMe: false,
    isMaker: false,
  },
  {
    id: 'member-4',
    profileImageUrl: '/assets/onboarding/smile4.svg',
    nickname: '차차',
    isMe: false,
    isMaker: false,
  },
  {
    id: 'member-5',
    profileImageUrl: '/assets/onboarding/smile1.svg',
    nickname: '도도',
    isMe: false,
    isMaker: false,
  },
  {
    id: 'member-6',
    profileImageUrl: '/assets/onboarding/smile2.svg',
    nickname: '라라',
    isMe: false,
    isMaker: false,
  },
];

interface FooterPhotoDetailProps {
  albumId: string;
  photoId: number;
  isLiked: boolean;
  likeCnt: number;
  isRecentlyDownloaded: boolean;
  imageUrl: string | undefined;
}

export default function FooterPhotoDetail({
  albumId,
  photoId,
  isLiked,
  likeCnt,
  isRecentlyDownloaded,
  imageUrl,
}: FooterPhotoDetailProps) {
  const queryClient = useQueryClient();
  const [isDownloading, setIsDownloading] = useState(false);
  const { mutateAsync: mutateAsyncLike, isPending: isLiking } =
    usePhotoLikedMutation();
  const { mutateAsync: mutateAsyncUnlike, isPending: isUnliking } =
    usePhotoUnlikedMutation();

  const handleDeepToggle = async (): Promise<void> => {
    try {
      if (isLiked) {
        if (!isUnliking) await mutateAsyncUnlike(photoId);
      } else {
        if (!isLiking) await mutateAsyncLike(photoId);
      }

      updateCacheAlbumPhotosLike({
        albumId,
        isCurrentlyLiked: isLiked,
        photoId,
        queryClient,
      });
    } catch (e) {
      console.error(e);
      Toast.alert(`좋에요에 실패하였습니다.`);
    }
  };

  const handleDownload = async (): Promise<void> => {
    if (!imageUrl) return;
    if (isRecentlyDownloaded) {
      Toast.alert(`금방 다운받은 사진이에요.\n1시간 뒤에 다시 시도하세요.`);
      return;
    }
    if (isDownloading) return;

    setIsDownloading(true);
    await shareImage({
      imageUrls: imageUrl,
      onSuccess: () => {},
      onError: () => {
        Toast.alert('사진을 준비하는 중 오류가 발생했습니다.');
      },
    });
    setIsDownloading(false);
  };

  return (
    <section className='mx-10 flex shrink-0 justify-around py-5'>
      <BottomSheetModal
        title={'사진 정보'}
        trigger={
          <button className='flex w-12 justify-center'>
            <Info width={24} height={24} color='white' />
          </button>
        }
      >
        <SectionPhotoData albumId={albumId} photoId={photoId} />
      </BottomSheetModal>

      <button
        type='button'
        onClick={handleDownload}
        disabled={isDownloading}
        aria-label='사진 다운로드'
        className='flex w-12 justify-center'
      >
        <Download width={24} height={24} color='white' />
      </button>

      <div className='typo-body-lg-semibold flex w-12 justify-center gap-1'>
        <button type='button' onClick={handleDeepToggle}>
          <Heart
            width={24}
            height={24}
            fill={isLiked ? 'var(--color-icon-primary)' : 'transparent'}
            color={
              isLiked
                ? 'var(--color-icon-primary)'
                : 'var(--color-icon-inverse)'
            }
          />
        </button>

        <BottomSheetModal
          title={`띱 ${likeCnt}개`}
          trigger={
            <button>
              <span
                className={`${isLiked ? 'text-text-brand' : 'text-text-basic-inverse'}`}
              >
                {likeCnt}
              </span>
            </button>
          }
        >
          <div className='flex flex-col'>
            {/* TODO : API 연동 */}
            {mockMembers.map((member) => (
              <ItemMemberData
                key={member.id}
                profileImageUrl={member.profileImageUrl}
                nickname={member.nickname}
                isMe={member.isMe}
                isMaker={member.isMaker}
              />
            ))}
          </div>
        </BottomSheetModal>
      </div>
    </section>
  );
}
