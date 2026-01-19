import { AlbumParticipantResponseSchema } from '@/global/api/ep';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QrcodeShareButtonProps {
  albumId: string;
  accessType: AlbumParticipantResponseSchema['myRole'];
}

export default function QrcodeShareButton({
  albumId,
  accessType,
}: QrcodeShareButtonProps) {
  const router = useRouter();

  const handleClick = (): void => {
    trackGaEvent(GA_EVENTS.click_invite_complete, {
      album_id: albumId,
      access_type: accessType === 'MAKER' ? 'creator' : 'member',
      button_type: 'qr',
    });

    router.push(`/album/qrcode/${albumId}`);
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex flex-col items-center justify-center'
    >
      <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-background-white'>
        <QrCode width={24} height={24} color='#E09900' />
      </div>
      <span className='typo-body-sm-medium text-text-subtle'>QR코드</span>
    </button>
  );
}
