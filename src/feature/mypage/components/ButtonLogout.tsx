import ConfirmModal from '@/global/components/modal/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '../hooks/useLogoutMutation';

interface ButtonLogoutProps {}

export default function ButtonLogout({}: ButtonLogoutProps) {
  const router = useRouter();
  const { mutateAsync } = useLogoutMutation();

  const handleConfirm = async () => {
    try {
      await mutateAsync();
      router.push('/');
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
