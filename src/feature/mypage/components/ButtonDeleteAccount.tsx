import ConfirmModal from '@/global/components/modal/ConfirmModal';

interface ButtonDeleteAccountProps {
  onConfirm?: () => Promise<void> | void;
}

export default function ButtonDeleteAccount({
  onConfirm,
}: ButtonDeleteAccountProps) {
  const handleConfirm = async () => {
    try {
      if (onConfirm) await onConfirm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ConfirmModal
      trigger={
        <button className='cursor-pointer py-4 text-left' type='button'>
          탈퇴하기
        </button>
      }
      title='정말 탈퇴하시겠어요?'
      description='계정은 삭제되며, 복구되지 않아요.'
      cancelText='다음에'
      confirmText='탈퇴하기'
      onConfirm={handleConfirm}
    />
  );
}
