'use client';
import { useGetUserMe } from '@/feature/main/hooks/useGetUserMe';
import { EP } from '@/global/api/ep';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import Toast from '@/global/components/toast/Toast';
import BubbleHint from '@/global/components/tooltip/BubbleTooltip';
import PersonSvg from '@/global/svg/PersonSvg';
import { downloadFile } from '@/global/utils/downloadFile';
import { getDeviceType } from '@/global/utils/getDeviceType';
import { extractHtmlToBlob } from '@/global/utils/image/extractHtmlToBlob';
import { shareImage } from '@/global/utils/image/shareImage';
import { shareViaNavigator } from '@/global/utils/shareNavigator';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Loader2, LucideIcon, Menu, Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useGetAlbumInfo } from '../../detail/hooks/useGetAlbumInfo';
import { use4CutFixed } from '../hooks/use4CutFixed';
import { use4CutPreviewQuery } from '../hooks/use4CutPreviewQuery';
import Container4Cut from './Container4Cut';
const Capture4CutPortal = dynamic(() => import('./Capture4CutPortal'), {
  ssr: false,
});

interface ScreenAlbum4CutProps {
  albumId: string;
}

export default function ScreenAlbum4Cut({ albumId }: ScreenAlbum4CutProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCaptureVisible, setIsCaptureVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const { data } = useGetAlbumInfo(albumId);
  const { data: { name } = {} } = useGetUserMe();

  // TODO : openapi type이 이상해서 임시 any처리. 백엔드랑 협의 필요

  const {
    data: { myRole, previewPhotos, isFinalized } = {},
    isPending: is4CutPreviewPending,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any = use4CutPreviewQuery(albumId);
  const { mutateAsync } = use4CutFixed();

  const isMaker = myRole === 'MAKER';

  const showCaptureNode = async () =>
    new Promise<void>((resolve) => {
      setIsCaptureVisible(true);
      requestAnimationFrame(() => resolve());
    });

  const handleConfirm = async (): Promise<void> => {
    await mutateAsync({
      albumId,
      photoIds: previewPhotos.map(
        (photo: { photoId: number; imageUrl: string; photoRank: number }) =>
          photo.photoId,
      ),
    });
    queryClient.invalidateQueries({
      queryKey: [EP.cheese4cut.preview(albumId)],
    });
    setIsConfirmed(true);
  };

  const handleDownload = async () => {
    const deviceType = getDeviceType();

    if (!captureRef.current) {
      Toast.alert(
        '다운로드할 이미지를 찾지 못했어요. 잠시 후 다시 시도해주세요.',
      );
      return;
    }

    try {
      setIsDownloading(true);
      await showCaptureNode();

      const fileName = data?.title
        ? `${data.title}-cheese-4cut.png`
        : 'cheese-4cut.png';
      const blob = await extractHtmlToBlob(captureRef.current);

      await shareImage({
        imageBlobs: blob,
        imageTitle: fileName,
        onError: () => {
          downloadFile(blob, fileName);
        },
      });
    } catch (error) {
      console.error(error);
      Toast.alert('이미지를 다운로드하지 못했습니다. 다시 시도해주세요.');
    } finally {
      setIsCaptureVisible(false);
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const deviceType = getDeviceType();

    if (!captureRef.current) {
      Toast.alert('공유할 이미지를 찾지 못했어요. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      await showCaptureNode();

      const fileName = data?.title
        ? `${data.title}-cheese-4cut.png`
        : 'cheese-4cut.png';
      const blob = await extractHtmlToBlob(captureRef.current);

      if (deviceType === 'ios') {
        await shareImage({
          imageBlobs: blob,
          imageTitle: fileName,
          onError: () => {
            downloadFile(blob, fileName);
          },
        });
      } else {
        downloadFile(blob, fileName);
      }
    } catch (error) {
      console.error('Failed to share 4cut preview:', error);
      Toast.alert('이미지를 생성하지 못했습니다. 다시 시도해주세요.');
    } finally {
      setIsCaptureVisible(false);
    }
  };

  return (
    <>
      <CustomHeader
        isShowBack
        title={data?.title ?? ''}
        rightContent={
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => router.push(`/album/detail/${albumId}/sidebar`)}
            >
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </button>
          </div>
        }
      />
      <section className='absolute top-[46%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center'>
        {!isFinalized && (
          <div className='typo-body-lg-semibold mb-2'>현재 TOP 4 사진</div>
        )}
        <div>
          <Container4Cut
            albumId={albumId}
            eventName={data?.title}
            eventDate={data?.eventDate}
            scale={1}
          />
        </div>
      </section>

      {!is4CutPreviewPending && (
        <div className='fixed bottom-5 flex w-full max-w-[430px] flex-col items-center px-4'>
          {isMaker || isFinalized ? (
            <>
              {isFinalized ? (
                <div className='flex w-full justify-center gap-3'>
                  <ActionButton
                    icon={Download}
                    text='다운로드'
                    onClick={handleDownload}
                  />
                  <ActionButton
                    icon={Send}
                    text='공유하기'
                    onClick={handleShare}
                  />
                </div>
              ) : (
                <>
                  <div className='typo-body-sm-semibold flex items-center gap-2 pb-3'>
                    <span>띱 진행상황</span>
                    <div className='flex items-center'>
                      <span className='p-[5px]'>
                        <PersonSvg />
                      </span>
                      <span>
                        {`${data?.currentParticipant} / ${data?.participant}`}{' '}
                        명
                      </span>
                    </div>
                  </div>
                  <ConfirmModal
                    trigger={<LongButton text='사진 확정하기' noFixed />}
                    title='이대로 확정하시겠어요?'
                    description='예쁜 치즈네컷을 만들어드릴게요'
                    confirmText='확정하기'
                    onConfirm={handleConfirm}
                  />
                </>
              )}
            </>
          ) : (
            <div className=''>
              <BubbleHint
                message='📸 사진 확정 권한은 메이커에게만 있어요'
                className='absolute bottom-18 left-1/2 w-full -translate-x-1/2'
              />
              <LongButton
                text='메이커에게 조르기'
                onClick={async () => {
                  if (!data) return;

                  await shareViaNavigator({
                    data: {
                      title: `'${data.title}'앨범에 대한 치즈네컷을 선정해주세요`,
                      text: `${name}님이 메이커님에게 조르기를 요청했어요!`,
                      url: `https://say-cheese.me/album/4cut/${albumId}`,
                    },
                    errorMessage:
                      '공유에 실패하였습니다. 다시한번 시도해주세요.',
                  });
                }}
              />
            </div>
          )}
        </div>
      )}
      {isDownloading && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px]'>
          <div className='flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg'>
            <Loader2 className='text-primary h-5 w-5 animate-spin' />
            <span className='typo-body-lg-semibold text-text-basic'>
              다운로드 중...
            </span>
          </div>
        </div>
      )}
      <Capture4CutPortal
        captureRef={captureRef}
        visible={isCaptureVisible}
        albumId={albumId}
        eventName={data?.title}
        eventDate={data?.eventDate}
      />
    </>
  );
}

interface ActionButtonProps {
  icon: LucideIcon;
  text: string;
  onClick: () => void;
}

export const ActionButton = ({
  icon: Icon,
  text,
  onClick,
}: ActionButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className='bg-button-tertiary-fill text-text-subtle flex flex-1 items-center justify-center gap-1 rounded-[8px] py-[15px]'
  >
    <Icon width={24} height={24} color='var(--color-icon-basic)' />
    <span className='typo-body-1xl-semibold'>{text}</span>
  </button>
);
