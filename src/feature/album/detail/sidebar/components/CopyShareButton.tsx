import Toast from '@/global/components/toast/Toast';
import { copyToClipboard } from '@/global/utils/copyToClipboard';
import { Copy } from 'lucide-react';

interface CopyShareButtonProps {
  albumId: string;
}

export default function CopyShareButton({ albumId }: CopyShareButtonProps) {
  const handleClick = (): void => {
    copyToClipboard(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/album/entry/${albumId}`,
    );
    Toast.check('링크를 복사했어요');
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex flex-col items-center justify-center'
    >
      <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#fff2c2]'>
        <Copy width={24} height={24} color='#E09900' />
      </div>
      <span>링크복사</span>
    </button>
  );
}
