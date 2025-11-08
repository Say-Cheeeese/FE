import CheckNoImgModal from '@/feature/upload/components/CheckNoImgModal';
import CustomHeader from '@/global/components/header/CustomHeader';
import Image from 'next/image';
import AlbumInfoHeader from './AlbumInfoHeader';
import UploadButton from './UploadButton';

interface AlbumCard {
  imageUrl: string;
  nickname: string;
  profileUrl: string;
}

// ✅ API 연동 전까지는 상수로 유지
const MOCK_CARDS: AlbumCard[] = [];

type UploadAlbumPageProps = {
  albumId: string;
};

export default function UploadAlbumPage({ albumId }: UploadAlbumPageProps) {
  const cards = MOCK_CARDS; // ✅ 나중에 API 결과로 교체 예정

  return (
    <div className='flex flex-col'>
      <CustomHeader title='앨범 채우기' border={false} />
      <main className='flex min-h-[calc(100dvh-72px)] flex-col items-center justify-between pt-6 pb-[calc(20px+env(safe-area-inset-bottom))]'>
        <div className='flex w-full flex-col items-center'>
          <AlbumInfoHeader albumId={albumId} photoCount={cards.length} />

          <Image
            src='/assets/album/test-lottie.svg'
            alt='사진'
            width={300}
            height={136}
            className='mt-[52px]'
          />
        </div>

        <div className='flex w-full flex-col items-center'>
          {/* <AvailableCountBubble albumId={albumId} /> */}
          <span className='typo-body-sm-medium text-text-secondary mb-3'>
            Tip. 첫 업로드가 참여도를 두 배 넘게 끌려올려요
          </span>
          <UploadButton albumId={albumId} />
          <CheckNoImgModal
            albumId={albumId}
            trigger={
              <button
                type='button'
                className='typo-body-sm-medium text-text-subtler mt-3'
              >
                올릴 사진이 없어요
              </button>
            }
          />
        </div>
      </main>
    </div>
  );
}
