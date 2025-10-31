import AutoCarousel from '@/global/components/carousel/AutoCarousel';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';

const cards = Array.from({ length: 5 }).map((_, i) => (
  <div
    key={i}
    className='flex h-[110px] w-[180px] items-center justify-center rounded-2xl bg-yellow-200 text-lg font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
  >
    카드 {i + 1}
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
          <AutoCarousel items={cards} itemWidth={180} />
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
