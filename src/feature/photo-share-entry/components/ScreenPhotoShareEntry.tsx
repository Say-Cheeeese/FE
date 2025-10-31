import MarqueeCarousel from '@/global/components/carousel/MarqueeCarousel';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import AlbumPreviewCard from './AlbumPreviewCard';

const cards = [
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
].map((item, i) => (
  <div key={i}>
    <AlbumPreviewCard
      imageUrl={item.imageUrl}
      nickname={item.nickname}
      profileUrl={item.profileUrl}
    />
  </div>
));

interface ScreenPhotoShareEntryProps {}

export default function ScreenPhotoShareEntry({}: ScreenPhotoShareEntryProps) {
  return (
    <>
      <CustomHeader title='앨범 채우기' />

      <main className='flex flex-col items-center pt-8'>
        <div className='bg-element-gray-lighter flex h-20 w-20 items-center justify-center rounded-full'>
          <span className='text-4xl'>😀</span>
        </div>

        <div className='mt-3 flex flex-col items-center px-6'>
          <h2 className='text-heading-md-semibold text-text-basic'>
            큐시즘 MT
          </h2>
          <p className='text-body-md-medium text-text-subtle'>2025.08.23</p>
        </div>

        <div className='mt-8 w-full'>
          <MarqueeCarousel items={cards} itemWidth={180} />
        </div>

        <div className='relative mt-6 mb-6 px-6'>
          <div className='drop-shadow-25-5 relative mx-auto w-fit rounded-2xl bg-white px-4 py-2.5'>
            <div className='text-body-md-medium text-text-basic flex items-center space-x-2'>
              <span role='img'>📸</span>
              <span>지금 930장 더 올릴 수 있어요</span>
            </div>
            <div className='border-t-2.5 drop-shadow-25-5 absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-2 border-x-transparent border-t-white' />
          </div>
        </div>

        <div className='w-full px-6'>
          <LongButton text='내가 찍은 사진 공유하기' />
        </div>

        <button
          type='button'
          className='text-body-md-medium text-text-subtler mt-3 px-6 underline'
        >
          올릴 사진이 없어요
        </button>
      </main>
    </>
  );
}
