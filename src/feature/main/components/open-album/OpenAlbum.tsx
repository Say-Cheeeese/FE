import Image from 'next/image';
import PersonSvg from './PersonSvg';

const defaultThumbnail = '/assets/album/bg-album-default.png';

interface OpenAlbumProps {
  expirationTime: string;
  title: string;
  date: string;
  author: string;
  totalMembers: number;
  joinedMembers: number;
  thumbnails?: string[];
}

export default function OpenAlbum({
  expirationTime,
  title,
  date,
  author,
  totalMembers,
  joinedMembers,
  thumbnails = [],
}: OpenAlbumProps) {
  const [main, side1, side2] = thumbnails;
  const count = thumbnails.length;

  // 썸네일 개수에 따라 grid 동적 설정
  let gridTemplateColumns = '2fr 1fr';
  let gridTemplateRows = '1fr 1fr';
  let gridTemplateAreas = `
    "main side1"
    "main side2"
  `;

  if (count <= 1) {
    gridTemplateColumns = '1fr';
    gridTemplateRows = '1fr';
    gridTemplateAreas = `"main"`;
  } else if (count === 2) {
    gridTemplateColumns = '2fr 1fr';
    gridTemplateRows = '1fr';
    gridTemplateAreas = `"main side1"`;
  }

  return (
    <article className='drop-shadow-25-5 w-full overflow-hidden rounded-[20px]'>
      <div className='relative'>
        <div>
          <div
            className='grid h-[162px] gap-0.5'
            style={{
              gridTemplateColumns,
              gridTemplateRows,
              gridTemplateAreas,
            }}
          >
            {/* 메인 썸네일 */}
            <div
              style={{ gridArea: 'main' }}
              className='overflow-hidden bg-neutral-200'
            >
              <img
                src={main || defaultThumbnail}
                alt='main-thumbnail'
                className='h-full w-full object-cover'
              />
            </div>

            {/* 썸네일 2개 이상일 때 side1 */}
            {count >= 2 && (
              <div
                style={{
                  gridArea: 'side1',
                  gridRow: count === 2 ? '1 / span 2' : 'auto',
                }}
                className='overflow-hidden bg-neutral-300'
              >
                {side1 && (
                  <img
                    src={side1}
                    alt='side-thumbnail-1'
                    className='h-full w-full object-cover'
                  />
                )}
              </div>
            )}

            {/* 썸네일 3개일 때만 side2 */}
            {count >= 3 && (
              <div
                style={{ gridArea: 'side2' }}
                className='overflow-hidden bg-neutral-400'
              >
                {side2 && (
                  <img
                    src={side2}
                    alt='side-thumbnail-2'
                    className='h-full w-full object-cover'
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* 소멸까지 */}
        <div className='absolute top-3 left-3'>
          <span className='typo-caption-sm-medium bg-element-alpha-dark inline-block rounded-full px-[10px] py-1 font-semibold text-white'>
            소멸까지 {expirationTime}
          </span>
        </div>
      </div>

      {/* 아래 정보 */}
      <div className='flex h-full items-end gap-3 px-4 py-6'>
        <div className='h-14 w-14 shrink-0 overflow-hidden rounded-full bg-neutral-200'>
          <Image
            src='/assets/onboarding/smile1.svg'
            alt='프로필사진'
            width={80}
            height={80}
            priority
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex-1'>
          <h3 className='typo-heading-sm-semibold text-text-basic'>{title}</h3>
          <p className='typo-body-sm-medium mt-[2px] text-neutral-600'>
            {`${date}  ·   ${author}`}
          </p>
        </div>

        <div className='flex h-full flex-col'>
          <div className='text-text-subtle flex items-center gap-2'>
            <PersonSvg />
            <span className='text-[15px] font-semibold'>
              {joinedMembers} / {totalMembers} 명
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
