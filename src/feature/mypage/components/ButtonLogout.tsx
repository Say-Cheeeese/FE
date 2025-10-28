'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

interface ButtonLogoutProps {
  onConfirm?: () => Promise<void> | void;
}

export function ButtonLogout({ onConfirm }: ButtonLogoutProps) {
  async function handleConfirm() {
    try {
      if (onConfirm) await onConfirm();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='cursor-pointer py-4 text-left' type='button'>
          로그아웃
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-heading-sm-semibold text-text-basic pt-10 pb-6'>
            로그아웃 하시겠어요?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter className='grid grid-cols-2'>
          <AlertDialogCancel className='text-body-lg-semibold text-text-subtle bg-button-tertiary-fill hover:bg-neutral-200'>
            다음에
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            className='text-body-lg-semibold text-text-primary bg-button-primary-fill hover:bg-yellow-400/90'
          >
            로그아웃
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
