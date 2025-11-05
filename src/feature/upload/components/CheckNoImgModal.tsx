import ConfirmModal from '@/global/components/modal/ConfirmModal';
import { ReactNode } from 'react';

interface CheckNoImgModalProps {
  trigger: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function CheckNoImgModal({
  trigger,
  onConfirm,
  onCancel,
}: CheckNoImgModalProps) {
  return (
    <ConfirmModal
      trigger={trigger}
      title='올릴 사진이 없나요?'
      description={`나만 포착한 순간,
작은 돌멩이 사진이라도 좋아요.`}
      cancelText='앨범 채우기'
      confirmText='정말 없어요'
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
