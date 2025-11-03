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
import { useCallback, useEffect } from 'react';

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

  useEffect(() => {
    // data-scroll-locked 속성 제거
    const removeScrollLock = () => {
      const body = document.body;
      if (body.hasAttribute('data-scroll-locked')) {
        body.removeAttribute('data-scroll-locked');
      }
    };

    // 컴포넌트 마운트 시와 주기적으로 체크
    removeScrollLock();
    const interval = setInterval(removeScrollLock, 100);

    return () => {
      clearInterval(interval);
      removeScrollLock();
    };
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className='pb-6'>
          <AlertDialogTitle className='typo-heading-sm-semibold text-text-basic pt-6'>
            {title}
          </AlertDialogTitle>
          {description ? (
            <AlertDialogDescription
              className='typo-body-lg-regular text-text-subtle whitespace-pre-line'
              style={{ whiteSpace: 'pre-line' }}
            >
              {description}
            </AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>

        <AlertDialogFooter className='grid grid-cols-2'>
          <AlertDialogCancel
            onClick={handleCancel}
            className={cn(
              'flex h-12 items-center justify-center px-5 py-2.5',
              'bg-button-tertiary-fill hover:bg-neutral-200',
              'typo-body-lg-semibold! text-text-subtle!',
              cancelClassName,
            )}
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              'flex h-12 items-center justify-center px-5 py-2.5',
              'bg-button-primary-fill active:bg-button-primary-fill-pressed active:text-text-primary',
              'typo-body-lg-semibold! text-text-primary!',
              'transition-colors duration-100',
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
