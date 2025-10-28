import ConfirmModal from '@/global/components/modal/ConfirmModal';

interface ButtonLogoutProps {
  onConfirm?: () => Promise<void> | void;
}

export function ButtonLogout({ onConfirm }: ButtonLogoutProps) {
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
          로그아웃
        </button>
      }
      title='로그아웃 하시겠어요?'
      cancelText='다음에'
      confirmText='로그아웃'
      onConfirm={handleConfirm}
    />
  );
}
