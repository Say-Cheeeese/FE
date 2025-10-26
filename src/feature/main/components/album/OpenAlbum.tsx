import PersonSvg from './PersonSvg';

interface OpenAlbumProps {
  expirationTime: string;
  title: string;
  date: string;
  author: string;
  totalMembers: number;
  joinedMembers: number;
  thumbnails: string[];
}

export default function OpenAlbum({
  expirationTime,
  title,
  date,
  author,
  totalMembers,
  joinedMembers,
}: OpenAlbumProps) {
  return (
    <article className='drop-shadow-25-5 w-full overflow-hidden rounded-[20px]'>
      <div className='relative'>
        <div>
          <div
            className='grid h-[162px] gap-[2px]'
            style={{
              gridTemplateColumns: '2fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gridTemplateAreas: `
        "main side1"
        "main side2"
      `,
            }}
          >
            <div
              className='bg-neutral-200'
              style={{
                gridArea: 'main',
              }}
            />

            <div
              className='bg-neutral-300'
              style={{
                gridArea: 'side1',
              }}
            />

            <div
              className='bg-neutral-400'
              style={{
                gridArea: 'side2',
              }}
            />
          </div>
        </div>

        <div className='absolute top-3 left-3'>
          <span className='text-caption-sm-medium bg-element-alpha-dark inline-block rounded-full px-[10px] py-1 font-semibold text-white'>
            소멸까지 {expirationTime}
          </span>
        </div>
      </div>

      <div className='flex h-full items-end gap-3 px-4 py-6'>
        {/* TODO : 프로필이미지 삽입 */}
        <div className='h-14 w-14 shrink-0 rounded-full bg-neutral-200' />
        <div className='flex-1'>
          <h3 className='text-heading-sm-semibold text-text-basic'>{title}</h3>
          <p className='text-body-sm-medium mt-[2px] text-neutral-600'>
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
