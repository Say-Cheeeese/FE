import Toast from '@/global/components/toast/Toast';
import { Ellipsis } from 'lucide-react';

interface MoreShareButtonProps {
  albumId: string;
}

export default function MoreShareButton({ albumId }: MoreShareButtonProps) {
  const handleClick = (): void => {
    const albumEntryUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/album/entry/${albumId}`;
    const shareData = {
      title: `우리 공유앨범에 초대합니다 - 치이이즈`,
      text: '일주일 뒤에는 앨범이 사라져요!',
      url: albumEntryUrl,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      Toast.alert('이 기능을 지원하지 않는 브라우저입니다.');
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex flex-col items-center justify-center'
    >
      <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#fff2c2]'>
        <Ellipsis width={24} height={24} color='var(--color-icon-basic)' />
      </div>
      <span>더보기</span>
    </button>
  );
}
