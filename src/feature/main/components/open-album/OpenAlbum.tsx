import PersonSvg from '@/global/svg/PersonSvg';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import Image from 'next/image';
import Link from 'next/link';
import { getOpenAlbumGridConfig } from '../../utils/getOpenAlbumGridConfig';

const defaultThumbnail = '/assets/album/bg-album-default.png';

interface OpenAlbumProps {
  code: string;
  expirationTime: string;
  title: string;
  date: string;
  author: string;
  totalMembers: number;
  joinedMembers: number;
  thumbnails?: string[];
  emoji: string;
}

export default function OpenAlbum({
  code,
  expirationTime,
  title,
  date,
  author,
  totalMembers,
  joinedMembers,
  thumbnails = [],
  emoji,
}: OpenAlbumProps) {
  const [main, side1, side2] = thumbnails;
  const count = thumbnails.length;
  const gridConfig = getOpenAlbumGridConfig(count);

  return (
    <Link href={`/album/detail/${code}`}>
      <article className='drop-shadow-25-5 w-full overflow-hidden rounded-[20px]'>
        <div className='relative'>
          <div>
            <div
              className='grid h-[162px] gap-0.5'
              style={{
                gridTemplateColumns: gridConfig.columns,
                gridTemplateRows: gridConfig.rows,
                gridTemplateAreas: gridConfig.areas,
              }}
            >
              {/* 메인 썸네일 */}
              <div
                style={{ gridArea: 'main' }}
                className='overflow-hidden bg-neutral-200'
              >
                {main ? (
                  <img
                    src={main}
                    alt='메인 사진'
                    className='h-full w-full object-cover'
                    fetchPriority='high'
                  />
                ) : (
                  <Image
                    src={defaultThumbnail}
                    alt='메인 사진'
                    width={361}
                    height={162}
                    className='h-full w-full object-cover'
                    fetchPriority='high'
                  />
                )}
              </div>

              {/* 썸네일 2개 이상일 때 side1 */}
              {count >= 2 && (
                <div
                  style={{
                    gridArea: 'side1',
                    gridRow: gridConfig.side1Row ?? 'auto',
                  }}
                  className='overflow-hidden bg-neutral-300'
                >
                  {side1 && (
                    <img
                      src={side1}
                      alt='주요 사진'
                      className='h-full w-full object-cover'
                      fetchPriority='high'
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
                      alt='주요 사진'
                      className='h-full w-full object-cover'
                      fetchPriority='high'
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
          <div className='bg-element-gray-light flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-2xl'>
            {emoji ? convertUnicodeToEmoji(emoji) : '😀'}
          </div>
          <div className='flex-1'>
            <h3 className='typo-heading-sm-semibold text-text-basic'>
              {title}
            </h3>
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
    </Link>
  );
}
