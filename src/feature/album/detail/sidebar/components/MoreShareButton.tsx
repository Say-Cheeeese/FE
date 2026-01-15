import { shareViaNavigator } from '@/global/utils/shareNavigator';
import { Ellipsis } from 'lucide-react';

const getAlbumEntryUrl = (albumId: string) =>
  `${process.env.NEXT_PUBLIC_CLIENT_URL}/album/entry/${albumId}`;

interface MoreShareButtonProps {
  albumId: string;
}

export default function MoreShareButton({ albumId }: MoreShareButtonProps) {
  const handleClick = (): void => {
    const shareData = {
      title: `우리 공유앨범에 초대합니다 - 치이이즈`,
      text: '일주일 뒤에는 앨범이 사라져요!',
      url: getAlbumEntryUrl(albumId),
    };

    shareViaNavigator({
      data: shareData,
      fallbackMessage: '이 기능을 지원하지 않는 브라우저입니다.',
    });
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex flex-col items-center justify-center'
    >
      <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-background-white'>
        <Ellipsis width={24} height={24} color='#E09900' />
      </div>
      <span className='typo-body-sm-medium text-text-subtle'>더보기</span>
    </button>
  );
}
