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
      <svg
        className='fixed bottom-[-10px] z-20 w-full max-w-[430px] object-cover'
        width='393'
        height='178'
        viewBox='0 0 393 178'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_d_2178_54517)'>
          <path
            d='M261.069 168.418H0V18.0072C0 14.174 4.13577 11.7665 7.46898 13.6593L263.538 159.07C268.003 161.605 266.204 168.418 261.069 168.418Z'
            fill='#FFE894'
          />
          <path
            d='M261.069 168.418H0V18.0072C0 14.174 4.13577 11.7665 7.46898 13.6593L263.538 159.07C268.003 161.605 266.204 168.418 261.069 168.418Z'
            stroke='#FFF2C2'
            strokeWidth='2'
          />
        </g>
        <g filter='url(#filter1_d_2178_54517)'>
          <path
            d='M113 168.418H393V18.0072C393 14.174 388.864 11.7665 385.531 13.6593L113 168.418Z'
            fill='#FFE894'
          />
          <path
            d='M113 168.418H393V18.0072C393 14.174 388.864 11.7665 385.531 13.6593L113 168.418Z'
            stroke='#FFF2C2'
            strokeWidth='2'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_2178_54517'
            x='-11'
            y='0'
            width='288.08'
            height='177.418'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='-2' />
            <feGaussianBlur stdDeviation='5' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.509744 0 0 0 0 0.405139 0 0 0 0 0.0269517 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_2178_54517'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_2178_54517'
              result='shape'
            />
          </filter>
          <filter
            id='filter1_d_2178_54517'
            x='99.2148'
            y='0'
            width='304.785'
            height='177.418'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='-2' />
            <feGaussianBlur stdDeviation='5' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0.509744 0 0 0 0 0.405139 0 0 0 0 0.0269517 0 0 0 0.1 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_2178_54517'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_2178_54517'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
