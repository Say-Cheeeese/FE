import { QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QrcodeShareButtonProps {
  albumId: string;
}

export default function QrcodeShareButton({ albumId }: QrcodeShareButtonProps) {
  const router = useRouter();

  const handleClick = (): void => {
    router.push(`/album/qrcode/${albumId}`);
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex flex-col items-center justify-center'
    >
      <div className='bg-background-white flex h-[58px] w-[58px] items-center justify-center rounded-full'>
        <QrCode width={24} height={24} color='#E09900' />
      </div>
      <span className='typo-body-sm-medium text-text-subtle'>QR코드</span>
    </button>
  );
}
