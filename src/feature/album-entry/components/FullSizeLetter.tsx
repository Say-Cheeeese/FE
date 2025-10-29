interface FullSizeLetterProps {}

export default function FullSizeLetter({}: FullSizeLetterProps) {
  return (
    <>
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
      {/* SVG 편지 전체 배경 */}
      <img
        src='/assets/album/letter-full-size.svg'
        alt='편지 배경'
        className='fixed bottom-[-10px] z-20 w-full object-cover'
      />
    </>
  );
}
