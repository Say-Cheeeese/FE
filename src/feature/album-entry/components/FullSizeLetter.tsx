interface FullSizeLetterProps {
  children: React.ReactNode;
}

export default function FullSizeLetter({ children }: FullSizeLetterProps) {
  return (
    <>
      {/* 편지지 */}
      <div className='border-border-primary-lighter relative z-10 mx-9 mt-20 rounded-[20px] border bg-white pb-150 shadow-[0_12px_40px_rgba(0,0,0,0.08)]'>
        {children}
      </div>

      {/* 뒷편지봉투 svg */}
      <svg
        className='fixed bottom-0 left-1/2 z-0 w-full max-w-[430px] -translate-x-1/2 transform'
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
        className='fixed bottom-[-10px] z-20 w-full max-w-[430px] object-cover'
      />
    </>
  );
}
