import MarqueeCarousel from '@/global/components/carousel/MarqueeCarousel';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import AlbumPreviewCard from './AlbumPreviewCard';

interface AlbumCard {
  imageUrl: string;
  nickname: string;
  profileUrl: string;
}

// ✅ API 연동 전까지는 상수로 유지
const MOCK_CARDS: AlbumCard[] = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
    nickname: '1김수한무거북이와두루미',
    profileUrl: '/assets/onboarding/smile1.svg',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    nickname: '2박치기대왕펭귄',
    profileUrl: '/assets/onboarding/smile2.svg',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    nickname: '3최강얼음요정',
    profileUrl: '/assets/onboarding/smile3.svg',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    nickname: '4이불밖은위험해',
    profileUrl: '/assets/onboarding/smile4.svg',
  },
];

interface ScreenPhotoShareEntryProps {
  albumId: string;
}

export default function ScreenPhotoShareEntry({
  albumId,
}: ScreenPhotoShareEntryProps) {
  const cards = MOCK_CARDS; // ✅ 나중에 API 결과로 교체 예정

  return (
    <>
      <CustomHeader title='앨범 채우기' />

      <main className='flex min-h-[calc(100dvh-72px)] flex-col items-center pt-8'>
        <div className='bg-element-gray-lighter flex h-20 w-20 items-center justify-center rounded-full'>
          <span className='text-4xl'>😀</span>
        </div>

        <div className='mt-3 flex flex-col items-center px-6'>
          <h2 className='typo-heading-md-semibold text-text-basic'>
            큐시즘 MT
          </h2>
          <p className='typo-body-md-medium text-text-subtle'>2025.08.23</p>
        </div>

        <div className='my-8 w-full'>
          {cards.length === 0 ? (
            // TODO : 디자인팀 로띠전달되면 연동
            <div>로띠</div>
          ) : (
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
          )}
        </div>

        <div className='mb-5 flex w-full flex-1 flex-col items-center justify-end'>
          {/* 말풍선 */}
          <div className='relative mt-6 mb-6 px-6'>
            <div className='relative mx-auto w-fit rounded-2xl bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]'>
              <div className='typo-body-md-medium text-text-basic flex items-center space-x-2'>
                <span role='img' aria-label='카메라'>
                  📸
                </span>
                <span>지금 930장 더 올릴 수 있어요</span>
              </div>
              {/* 말풍선 꼬리 */}
              <div className='absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2'>
                <div className='absolute inset-0 rotate-45 bg-white shadow-[2px_3px_4px_rgba(0,0,0,0.1)]' />
              </div>
            </div>
          </div>

          <div className='w-full px-6'>
            <LongButton text='내가 찍은 사진 공유하기' noFixed />
          </div>

          <button
            type='button'
            className='typo-body-md-medium text-text-subtler mt-3 px-6 underline'
          >
            올릴 사진이 없어요
          </button>
        </div>
      </main>
    </>
  );
}
