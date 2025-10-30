import CloseButton from '@/global/components/header/CloseButton';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';

interface ScreenPhotoShareEntryProps {}

export default function ScreenPhotoShareEntry({}: ScreenPhotoShareEntryProps) {
  return (
    <>
      <CustomHeader title='앨범 채우기' />

      <main className='flex flex-col items-center px-6 pt-3'>
        <div className='bg-element-gray-lighter flex h-20 w-20 items-center justify-center rounded-full'>
          <span className='text-4xl'>😀</span>
        </div>

        <div className='mt-3 flex flex-col items-center'>
          <h2 className='text-heading-md-semibold text-text-basic'>
            큐시즘 MT
          </h2>
          <p className='text-body-md-medium text-text-subtle'>2025.08.23</p>
        </div>

        <div className='mt-8 grid w-full max-w-[340px] grid-cols-3 gap-3'>
          {/* TODO : 이미지 목록 슬라이드되게 */}
        </div>

        <div className='text-body-md-medium text-text-subtle mt-6 flex items-center justify-center space-x-2'>
          <span role='img'>📸</span>
          <span>지금 930장 더 올릴 수 있어요</span>
        </div>

        <LongButton text='내가 찍은 사진 공유하기' />

        <button
          type='button'
          className='text-body-md-medium text-text-subtler mt-3 underline'
        >
          올릴 사진이 없어요
        </button>
      </main>
    </>
  );
}
