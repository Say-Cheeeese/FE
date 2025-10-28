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

interface ButtonDeleteAccountProps {
  onConfirm?: () => Promise<void> | void;
}

export default function ButtonDeleteAccount({
  onConfirm,
}: ButtonDeleteAccountProps) {
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
          탈퇴하기
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-heading-sm-semibold text-text-basic pt-6'>
            정말 탈퇴하시겠어요?
          </AlertDialogTitle>
          <AlertDialogDescription className='pb-6'>
            계정은 삭제되며, 복구되지 않아요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='grid grid-cols-2'>
          <AlertDialogCancel className='text-body-lg-semibold text-text-subtle bg-button-tertiary-fill hover:bg-neutral-200'>
            다음에
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            className='text-body-lg-semibold text-text-primary bg-button-primary-fill hover:bg-yellow-400/90'
          >
            탈퇴하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
