'use client';

import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import Toast from '@/global/components/toast/Toast';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { useRouter } from 'next/navigation';
import {
  cloneElement,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useRef,
} from 'react';

function mergeTriggerClick(
  trigger: ReactNode,
  onTriggerClick: () => void,
): ReactNode {
  if (!isValidElement(trigger)) return trigger;
  const el = trigger as ReactElement<{ onClick?: (e: MouseEvent) => void }>;
  const prev = el.props.onClick;
  return cloneElement(el, {
    onClick: (e: MouseEvent) => {
      onTriggerClick();
      prev?.(e);
    },
  });
}

interface CheckNoImgModalProps {
  trigger: ReactNode;
  albumId: string;
  onConfirm?: () => void;
}

export default function CheckNoImgModal({
  trigger,
  albumId,
  onConfirm,
}: CheckNoImgModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    trackGaEvent(GA_EVENTS.upload_reactivated, { album_id: albumId });
    fileInputRef.current?.click();
  };

  const handleConfirm = () => {
    trackGaEvent(GA_EVENTS.upload_declined_final, { album_id: albumId });
    if (onConfirm) {
      onConfirm();
      return;
    }
    // 기본 동작: 현재 앨범 경로로 이동 (WaitingAlbum에서 분기 처리)
    router.push(`/album/detail/${albumId}`);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await handleFileUpload(e, albumId, router);
    } catch (e) {
      console.error(e);
      Toast.alert('사진 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
        className='hidden'
      />
      <ConfirmModal
        trigger={mergeTriggerClick(trigger, () =>
          trackGaEvent(GA_EVENTS.first_upload_decline, { album_id: albumId }),
        )}
        title='올릴 사진이 없나요?'
        description={`나만 포착한 순간,
작은 돌멩이 사진이라도 좋아요.`}
        cancelText='앨범 채우기'
        confirmText='정말 없어요'
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
