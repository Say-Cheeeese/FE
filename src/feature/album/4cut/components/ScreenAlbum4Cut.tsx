'use client';
import { useGetUserMe } from '@/feature/main/hooks/useGetUserMe';
import { useGetAlbumInform } from '@/feature/upload/hooks/useGetAlbumInform';
import { EP } from '@/global/api/ep';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import Toast from '@/global/components/toast/Toast';
import BubbleTooltip from '@/global/components/tooltip/BubbleTooltip';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import PersonSvg from '@/global/svg/PersonSvg';
import { downloadFile } from '@/global/utils/downloadFile';
import { getDeviceType } from '@/global/utils/getDeviceType';
import { extractHtmlToBlob } from '@/global/utils/image/extractHtmlToBlob';
import { shareImage } from '@/global/utils/image/shareImage';
import { shareViaNavigator } from '@/global/utils/shareNavigator';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Loader2, LucideIcon, Menu, Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useGetAlbumInfo } from '../../detail/hooks/useGetAlbumInfo';
import { use4CutAiSummary } from '../hooks/use4CutAiSummary';
import { use4CutFixed } from '../hooks/use4CutFixed';
import { use4CutPreviewQuery } from '../hooks/use4CutPreviewQuery';
import Container4Cut from './Container4Cut';
import Container4CutExplanation from './Container4CutExplanation';
import { getFourCutTemplateForAlbumId } from './fourCutAlbumTemplateMap';
const Capture4CutPortal = dynamic(() => import('./Capture4CutPortal'), {
  ssr: false,
});

interface ScreenAlbum4CutProps {
  albumId: string;
}

export default function ScreenAlbum4Cut({ albumId }: ScreenAlbum4CutProps) {
  const queryClient = useQueryClient();
  const [isCaptureVisible, setIsCaptureVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const { data } = useGetAlbumInfo(albumId);
  const { data: albumInformData } = useGetAlbumInform({ code: albumId });
  const { data: { name } = {} } = useGetUserMe();
  const { isCompleted } = use4CutAiSummary(albumId);

  // TODO : openapi type이 이상해서 임시 any처리. 백엔드랑 협의 필요
  const {
    data: {
      myRole,
      previewPhotos,
      isFinalized,
      uniqueLikesCount,
      participant,
    } = {},
    isPending: is4CutPreviewPending,
    isSuccess,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any = use4CutPreviewQuery(albumId);
  const { mutateAsync } = use4CutFixed();

  useEffect(() => {
    if (isSuccess) {
      if (isFinalized) {
        trackGaEvent(GA_EVENTS.view_4cut_confirmed, {
          album_id: albumId,
          access_type: myRole === 'MAKER' ? 'creator' : 'member',
        });
      } else {
        trackGaEvent(GA_EVENTS.view_4cut_unconfirmed, {
          album_id: albumId,
          access_type: myRole === 'MAKER' ? 'creator' : 'member',
        });
      }
    }
  }, [isSuccess]);

  const isMaker = myRole === 'MAKER';

  const showCaptureNode = async () =>
    new Promise<void>((resolve) => {
      setIsCaptureVisible(true);
      requestAnimationFrame(() => resolve());
    });

  const handleClickCreate4Cut = () => {
    trackGaEvent(GA_EVENTS.click_create_4cut);
  };

  const handleConfirm = async (): Promise<void> => {
    trackGaEvent(GA_EVENTS.click_create_4cut_complete, { album_id: albumId });
    try {
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
    } catch (e) {
      console.log(e);
      Toast.alert(`잠시후에 다시 시도해주세요.`);
    }
  };

  const handleFlipCard = () => {
    if (!isCompleted && !showExplanation) {
      return;
    }
    setShowExplanation(!showExplanation);
  };

  const handleDownload = async () => {
    trackGaEvent(GA_EVENTS.click_download_4cut, {
      album_id: albumId,
      access_type: albumInformData?.myRole === 'MAKER' ? 'creator' : 'member',
    });

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
      console.error(error);
      Toast.alert('이미지를 다운로드하지 못했습니다. 다시 시도해주세요.');
    } finally {
      setIsCaptureVisible(false);
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    trackGaEvent(GA_EVENTS.click_share_4cut, {
      album_id: albumId,
      access_type: albumInformData?.myRole === 'MAKER' ? 'creator' : 'member',
    });

    if (!captureRef.current) {
      Toast.alert('공유할 이미지를 찾지 못했어요. 잠시 후 다시 시도해주세요.');
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
      console.error('Failed to share 4cut preview:', error);
      Toast.alert('이미지를 생성하지 못했습니다. 다시 시도해주세요.');
    } finally {
      setIsCaptureVisible(false);
      setIsDownloading(false);
    }
  };

  return (
    <>
      <CustomHeader
        isShowBack
        title={data?.title ?? ''}
        rightContent={
          <div className='flex gap-4'>
            <Link href={`/album/detail/${albumId}/sidebar`} aria-label='메뉴'>
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </Link>
          </div>
        }
      />
      <main className='bg-button-secondary-fill min-h-[calc(100dvh-72px)]'>
        <section
          className={cn(
            'absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center',
            isFinalized ? 'top-[50%]' : 'top-[46%]',
          )}
        >
          {!is4CutPreviewPending && !isFinalized && (
            <div className='typo-body-lg-semibold mb-2'>현재 TOP 4 사진</div>
          )}
          <div
            className='relative cursor-pointer'
            style={{
              perspective: '1000px',
            }}
            onClick={isFinalized ? handleFlipCard : undefined}
          >
            <div
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                transform: showExplanation
                  ? 'rotateY(-180deg)'
                  : 'rotateY(0deg)',
              }}
            >
              {/* 앞면 - 4컷 사진 */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Container4Cut
                  albumId={albumId}
                  eventName={data?.title}
                  eventDate={
                    data?.eventDate ? data.eventDate.replace(/-/g, '.') : ''
                  }
                  scale={isFinalized ? 1.25 : 1}
                  isFinalized={isFinalized}
                  template={getFourCutTemplateForAlbumId(albumId)}
                />
              </div>
              {/* 뒷면 - 설명 */}
              {isFinalized && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(-180deg)',
                  }}
                >
                  <Container4CutExplanation
                    albumId={albumId}
                    eventName={data?.title}
                    eventDate={
                      data?.eventDate ? data.eventDate.replace(/-/g, '.') : ''
                    }
                    scale={1.25}
                    isFinalized={isFinalized}
                    onClose={handleFlipCard}
                  />
                </div>
              )}
            </div>
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
                          {`${uniqueLikesCount ?? 0} / ${participant ?? 0}`}명
                        </span>
                      </div>
                    </div>
                    <ConfirmModal
                      trigger={
                        <LongButton
                          text='이대로 네컷 확정하기'
                          noFixed
                          onClick={handleClickCreate4Cut}
                        />
                      }
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
                <BubbleTooltip
                  message='📸 사진 확정 권한은 메이커에게만 있어요'
                  className='absolute bottom-18 left-1/2 w-full -translate-x-1/2'
                />
                <LongButton
                  text='메이커에게 조르기'
                  onClick={async () => {
                    trackGaEvent(GA_EVENTS.click_request_4cut, {
                      album_id: albumId,
                    });

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
        )}{' '}
      </main>{' '}
      {isDownloading && (
        <div className='fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-[2px]'>
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
        eventDate={data?.eventDate ? data.eventDate.replace(/-/g, '.') : ''}
        isFinalized={isFinalized}
        template={getFourCutTemplateForAlbumId(albumId)}
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
    className='bg-white text-text-subtle flex flex-1 items-center justify-center gap-1 rounded-[8px] py-[15px]'
  >
    <Icon width={24} height={24} color='var(--color-icon-basic)' />
    <span className='typo-body-1xl-semibold'>{text}</span>
  </button>
);
