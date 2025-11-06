'use client';

import AlbumBestCut from './AlbumBestCut';

interface AlbumInfosProps {}

export default function AlbumInfos({}: AlbumInfosProps) {
  return (
    <section className='border-divider-gray-light border-b-[6px] px-5 py-4'>
      <div className='mb-6 flex items-center gap-5'>
        {/* 이모지 */}
        <div className='bg-element-gray-lighter flex h-[74px] w-[74px] items-center justify-center rounded-full text-[28px]'>
          😀
        </div>

        {/* 텍스트 블록 */}
        <div className='flex flex-col'>
          <h1 className='typo-heading-md-bold text-text-basic truncate'>
            큐시즘 MT
          </h1>
          <span className='typo-body-sm-regular text-text-subtler'>
            2025.08.23
          </span>
        </div>
      </div>

      <AlbumBestCut />
    </section>
  );
}
