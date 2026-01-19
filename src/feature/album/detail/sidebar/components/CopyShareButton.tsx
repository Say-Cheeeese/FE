import { AlbumParticipantResponseSchema } from '@/global/api/ep';
import Toast from '@/global/components/toast/Toast';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { copyToClipboard } from '@/global/utils/copyToClipboard';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { Copy } from 'lucide-react';

interface CopyShareButtonProps {
  albumId: string;
  accessType: AlbumParticipantResponseSchema['myRole'];
}

export default function CopyShareButton({
  albumId,
  accessType,
}: CopyShareButtonProps) {
  const handleClick = (): void => {
    trackGaEvent(GA_EVENTS.click_invite_complete, {
      album_id: albumId,
      access_type: accessType === 'MAKER' ? 'creator' : 'member',
      button_type: 'link',
    });

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
      <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-background-white'>
        <Copy width={24} height={24} color='#E09900' />
      </div>
      <span className='typo-body-sm-medium text-text-subtle'>링크복사</span>
    </button>
  );
}
