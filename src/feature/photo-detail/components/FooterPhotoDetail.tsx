'use client';
import { EP } from '@/global/api/ep';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import Toast from '@/global/components/toast/Toast';
import { downloadFile } from '@/global/utils/downloadFile';
import { getDeviceType } from '@/global/utils/getDeviceType';
import { shareImage } from '@/global/utils/image/shareImage';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Heart, Info } from 'lucide-react';
import { useState } from 'react';
import { usePhotoDownloadMutation } from '../hooks/usePhotoDownloadMutation';
import { usePhotoLikedMutation } from '../hooks/usePhotoLikedMutation';
import { usePhotoUnlikedMutation } from '../hooks/usePhotoUnlikedMutation';
import { updateCacheAlbumPhotosLike } from '../modules/updateCacheAlbumPhotosLike';
import ListPhotoLikers from './ListPhotoLikers';
import SectionPhotoData from './SectionPhotoData';

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
  const [isPhotoInfoOpen, setIsPhotoInfoOpen] = useState(false);
  const { mutateAsync: mutateAsyncLike, isPending: isLiking } =
    usePhotoLikedMutation();
  const { mutateAsync: mutateAsyncUnlike, isPending: isUnliking } =
    usePhotoUnlikedMutation();
  const { mutateAsync: mutateAsyncDownload } = usePhotoDownloadMutation();

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
      queryClient.invalidateQueries({
        queryKey: [EP.album.albumPhotosLikers(albumId, photoId)],
      });
      queryClient.invalidateQueries({
        queryKey: [EP.album.likedPhotos(albumId)],
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

    try {
      setIsDownloading(true);
      const deviceType = getDeviceType();
      const fileName = `IMG_${photoId}`;

      if (deviceType === 'ios') {
        shareImage({
          imageUrls: imageUrl,
          imageTitle: fileName,
          onSuccess: () => {
            mutateAsyncDownload({ albumId, photoIds: [photoId] });
          },
          onError: () => {
            downloadFile(imageUrl, fileName);
          },
        });
      } else {
        await downloadFile(imageUrl, fileName);
        mutateAsyncDownload({ albumId, photoIds: [photoId] });
      }
    } catch (e) {
      console.log(e);
      Toast.alert('사진을 준비하는 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className='mx-10 flex shrink-0 justify-around py-5'>
      <button
        type='button'
        onClick={handleDownload}
        disabled={isDownloading}
        aria-label='사진 다운로드'
        className={`flex w-12 justify-center`}
      >
        <Download
          width={24}
          height={24}
          color={`${isRecentlyDownloaded ? 'var(--color-neutral-400)' : 'white'}`}
        />
      </button>
      <BottomSheetModal
        title={'사진 정보'}
        open={isPhotoInfoOpen}
        onOpenChange={setIsPhotoInfoOpen}
        trigger={
          <button className='flex w-12 justify-center'>
            <Info width={24} height={24} color='white' />
          </button>
        }
      >
        <SectionPhotoData
          albumId={albumId}
          photoId={photoId}
          onAfterDelete={() => setIsPhotoInfoOpen(false)}
        />
      </BottomSheetModal>


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
          <ListPhotoLikers albumId={albumId} photoId={photoId} />
        </BottomSheetModal>
      </div>
    </section>
  );
}
