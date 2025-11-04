import AlbumPreviewCard from '@/feature/photo-share-entry/components/AlbumPreviewCard';
import CheckNoImgModal from '@/feature/upload/components/CheckNoImgModal';
import MarqueeCarousel from '@/global/components/carousel/MarqueeCarousel';
import CustomHeader from '@/global/components/header/CustomHeader';
import AlbumInfoHeader from './AlbumInfoHeader';
import AvailableCountBubble from './AvailableCountBubble';
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
      <CustomHeader title='앨범 채우기' />
      <main className='flex min-h-[calc(100vh-72px)] flex-col items-center justify-between pt-6 pb-[calc(20px+env(safe-area-inset-bottom))]'>
        <div className='flex w-full flex-col items-center'>
          <AlbumInfoHeader albumId={albumId} photoCount={cards.length} />

          {cards.length > 0 && (
            <div className='my-8 w-full'>
              <MarqueeCarousel
                items={cards.map((item, i) => (
                  <div key={i}>
                    <AlbumPreviewCard
                      imageUrl={item.imageUrl}
                      nickname={item.nickname}
                      profileUrl={item.profileUrl}
                    />
                  </div>
                ))}
                itemWidth={180}
              />
            </div>
          )}
        </div>

        <div className='flex w-full flex-col items-center'>
          <AvailableCountBubble albumId={albumId} />
          <UploadButton albumId={albumId} />
          <CheckNoImgModal
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
