'use client';

import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import Toast from '@/global/components/toast/Toast';
import { useRouter } from 'next/navigation';
import { ReactNode, useRef } from 'react';

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
    fileInputRef.current?.click();
  };

  const handleConfirm = () => {
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
        trigger={trigger}
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
