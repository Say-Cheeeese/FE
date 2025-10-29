import Image from 'next/image';

interface FullSizeLetterProps {}

export default function FullSizeLetter({}: FullSizeLetterProps) {
  return (
    <>
      {/* 편지지 */}
      <div className='border-border-primary-lighter relative z-10 mx-9 mt-12 rounded-[20px] border bg-white pb-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)]'>
        <header className='border-border-gray-lighter flex items-center gap-2 border-b px-5 py-5'>
          <Image
            src={`/assets/onboarding/smile1.svg`}
            width={32}
            height={32}
            alt='프로필 사진'
            className='rounded-full'
          />
          <span className='text-body-lg-semibold text-text-subtler'>맹쏘</span>
        </header>

        <section className='flex flex-col items-center px-6 py-8'>
          <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl'>
            🍔
          </div>

          <h2 className='text-heading-sm-semibold text-text-basic text-center'>
            김수한무거북이와두루미삼천갑자
          </h2>

          <p className='text-body-sm-regular text-text-subtler pt-1'>
            2025.08.23
          </p>

          <span className='text-caption-sm-medium text-text-basic-inverse bg-element-primary mt-3 inline-flex items-center rounded-full px-2.5 py-1'>
            앨범 소멸까지 2시간 5분
          </span>

          <button
            type='button'
            className='bg-button-primary-fill text-body-lg-semibold text-text-inverse mt-8 w-[230px] rounded-[14px] px-6 py-3'
          >
            초대 수락하고 앨범 보기
          </button>
        </section>
      </div>

      {/* 뒷편지봉투 svg */}
      <svg
        className='fixed bottom-0 left-0 z-0 w-full'
        viewBox='0 0 393 400'
        preserveAspectRatio='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 164.5L196.5 0L393 164.5L393 399.5H0.000184298L0 164.5Z'
          fill='var(--color-element-letter)'
        />
      </svg>
      {/* 앞편지봉투 svg */}
      <img
        src='/assets/album/letter-full-size.svg'
        alt='편지 배경'
        className='fixed bottom-[-10px] z-20 w-full object-cover'
      />
    </>
  );
}
