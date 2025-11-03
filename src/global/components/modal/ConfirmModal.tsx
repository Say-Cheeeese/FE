'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

type ConfirmModalProps = {
  /** 트리거 버튼/노드 (예: <button>탈퇴하기</button>) */
  trigger: React.ReactNode;
  /** 모달 제목 */
  title: string | React.ReactNode;
  /** 모달 본문 */
  description?: string | React.ReactNode;
  /** 취소 버튼 라벨 */
  cancelText?: string;
  /** 확인 버튼 라벨 */
  confirmText?: string;
  /** 취소 클릭 핸들러 */
  onCancel?: () => void;
  /** 확인 클릭 핸들러 (Promise 허용) */
  onConfirm?: () => Promise<void> | void;
  /** 버튼 스타일을 커스터마이즈하고 싶다면 className 전달(선택) */
  cancelClassName?: string;
  confirmClassName?: string;
};

export default function ConfirmModal({
  trigger,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
  cancelClassName = '',
  confirmClassName = '',
}: ConfirmModalProps) {
  const handleConfirm = useCallback(async () => {
    try {
      await onConfirm?.();
      // AlertDialogAction 사용 시 기본적으로 닫히므로 별도 close 처리 불필요
    } catch (e) {
      console.error(e);
      // 실패 시 닫히는 걸 막고 싶다면 AlertDialog를 controlled로 전환 필요
    }
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className='pb-6'>
          <AlertDialogTitle className='typo-heading-sm-semibold text-text-basic pt-4'>
            {title}
          </AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>

        <AlertDialogFooter className='grid grid-cols-2'>
          <AlertDialogCancel
            onClick={handleCancel}
            className={cn(
              'typo-body-lg-semibold text-text-subtle bg-button-tertiary-fill h-auto border-none py-3 hover:bg-neutral-200',
              cancelClassName,
            )}
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              'typo-body-lg-semibold text-text-primary bg-button-primary-fill h-auto py-3 hover:bg-yellow-400/90',
              confirmClassName,
            )}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
