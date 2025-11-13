'use client';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import Toast from '@/global/components/toast/Toast';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Heart, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePhotoExifQuery } from '../hooks/usePhotoExifQuery';
import { usePhotoLikedMutation } from '../hooks/usePhotoLikedMutation';
import { usePhotoUnlikedMutation } from '../hooks/usePhotoUnlikedMutation';
import { updateCacheAlbumPhotosLike } from '../modules/updateCacheAlbumPhotosLike';
import { downloadImageFromUrl } from '../util/downloadImageFromUrl';
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
  photoUploader: string;
  isRecentlyDownloaded: boolean;
  imageUrl: string;
}

export default function FooterPhotoDetail({
  albumId,
  photoId,
  isLiked,
  likeCnt,
  photoUploader,
  isRecentlyDownloaded,
  imageUrl,
}: FooterPhotoDetailProps) {
  const queryClient = useQueryClient();
  const [isDeep, setIsDeep] = useState(isLiked);
  const [deepCount, setDeepCount] = useState(likeCnt);
  const [isDownloading, setIsDownloading] = useState(false);
  const { mutateAsync: mutateAsyncLike, isPending: isLiking } =
    usePhotoLikedMutation();
  const { mutateAsync: mutateAsyncUnlike, isPending: isUnliking } =
    usePhotoUnlikedMutation();
  const { data } = usePhotoExifQuery(imageUrl);

  useEffect(() => {
    setDeepCount(likeCnt);
    setIsDeep(isLiked);
  }, [likeCnt, isLiked, photoId]);

  const handleDeepToggle = async (): Promise<void> => {
    try {
      if (isDeep) {
        if (!isLiking) await mutateAsyncLike(photoId);
      } else {
        if (!isUnliking) await mutateAsyncUnlike(photoId);
      }

      updateCacheAlbumPhotosLike({
        albumId,
        isCurrentlyLiked: isDeep,
        photoId,
        queryClient,
      });

      setIsDeep((prev) => !prev);
      setDeepCount((prev) => (isDeep ? prev - 1 : prev + 1));
    } catch (e) {
      console.error(e);
      Toast.alert(`좋에요에 실패하였습니다.`);
    }
  };

  const handleDownload = async () => {
    if (isRecentlyDownloaded) {
      Toast.alert(`금방 다운받은 사진이에요.\n1시간 뒤에 다시 시도하세요.`);
      return;
    }
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      await downloadImageFromUrl(imageUrl, `cheese-${photoId}`);
      // 필요하면 성공 토스트
      // Toast.alert('다운로드를 시작했어요.');
    } catch (e: unknown) {
      console.error(e);

      // 타입 안전하게 에러 메시지 추출
      const message =
        e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';

      Toast.alert(`다운로드에 실패했어요.\n(${message})`);
    } finally {
      setIsDownloading(false);
    }
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
        <SectionPhotoData
          photoInfo={{
            uploaderName: photoUploader,
            takenAt: data?.takenAt ?? '',
            uploadedAt: data?.createdAt ?? '',
          }}
          isShowDeleteButton
          onDeleteClick={() => console.log('삭제 버튼 클릭!')}
        />
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
            fill={isDeep ? 'var(--color-icon-primary)' : 'transparent'}
            color={
              isDeep ? 'var(--color-icon-primary)' : 'var(--color-icon-inverse)'
            }
          />
        </button>

        <BottomSheetModal
          title={`띱 ${deepCount}개`}
          trigger={
            <button>
              <span
                className={`${isDeep ? 'text-text-brand' : 'text-text-basic-inverse'}`}
              >
                {deepCount}
              </span>
            </button>
          }
        >
          <div className='flex flex-col'>
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
