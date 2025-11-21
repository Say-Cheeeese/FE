import { shareKakao } from '@/global/utils/shareKakao';
import Image from 'next/image';

interface KakaoShareButtonProps {
  albumId: string;
}

export default function KakaoShareButton({ albumId }: KakaoShareButtonProps) {
  const handleClick = (): void => {
    shareKakao({
      title: '앨범에 초대해요',
      description: '치이이즈: 추억은 따끈할 때 제맛',
      imageUrl: `https://say-cheese.me/assets/og/og_kakao.png`,
      imageWidth: 1200,
      imageHeight: 630,
      link: `https://say-cheese.me/album/entry/${albumId}`,
    });
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='flex flex-col items-center justify-center'
    >
      <Image
        src='/icon/icon_kakao.png'
        alt='카카오톡'
        width={58}
        height={58}
        className='rounded-full'
      />
      <span>카카오톡</span>
    </button>
  );
}
