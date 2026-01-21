'use client';
import { EP } from '@/global/api/ep';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import Toast from '@/global/components/toast/Toast';
import { downloadFile } from '@/global/utils/downloadFile';
import { getDeviceType } from '@/global/utils/getDeviceType';
import { shareImage } from '@/global/utils/image/shareImage';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Heart, Info, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDeleteAlbumPhotoMutation } from '../hooks/useDeleteAlbumPhotoMutation';
import { usePhotoDetailQuery } from '../hooks/usePhotoDetailQuery';
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

  const { data: photoDetail } = usePhotoDetailQuery({
    albumId,
    photoId,
  });

  console.log(
    '🗑️ FooterPhotoDetail - canDelete:',
    photoDetail?.canDelete,
    'photoId:',
    photoId,
  );

  const { mutateAsync: mutateAsyncLike, isPending: isLiking } =
    usePhotoLikedMutation();
  const { mutateAsync: mutateAsyncUnlike, isPending: isUnliking } =
    usePhotoUnlikedMutation();
  const { mutateAsync: mutateAsyncDownload } = usePhotoDownloadMutation();
  const { mutateAsync: mutateAsyncDelete } = useDeleteAlbumPhotoMutation();

  const handleDelete = async (): Promise<void> => {
    try {
      await mutateAsyncDelete({ albumId, photoId });
      queryClient.invalidateQueries({ queryKey: [EP.album.photos(albumId)] });
      setIsPhotoInfoOpen(false);
    } catch (e) {
      console.error(e);
      Toast.alert('사진 삭제에 실패했습니다.');
    }
  };

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
          name={photoDetail?.name}
          captureTime={photoDetail?.captureTime}
          createdAt={photoDetail?.createdAt}
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

      {photoDetail?.canDelete && (
        <ConfirmModal
          title='사진을 삭제할까요?'
          description='지운 사진은 다시 복구할 수 없어요.'
          cancelText='취소'
          confirmText='삭제하기'
          confirmClassName='text-text-basic-inverse bg-button-accent-fill active:bg-button-accent-pressed active:text-basic-inverse'
          onConfirm={handleDelete}
          trigger={
            <button className='flex w-12 justify-center'>
              <Trash2 width={24} height={24} color='white' />
            </button>
          }
        />
      )}
    </section>
  );
}
