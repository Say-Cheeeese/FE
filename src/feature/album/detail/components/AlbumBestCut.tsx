import LongButton from '@/global/components/LongButton';
import PhotoItem from '../../../../global/components/photo/PhotoItem';

interface AlbumBestCutProps {}

export default function AlbumBestCut({}: AlbumBestCutProps) {
  return (
    <section className='rounded-xl bg-white'>
      {/* 타이틀 */}
      <h2 className='typo-body-lg-semibold text-text-subtle mb-2'>
        베스트 치즈 컷
      </h2>

      {/* 사진 리스트 */}
      <div className='scrollbar-hide -mx-5 mb-3 overflow-x-auto px-5'>
        <div className='flex min-w-max gap-2'>
          <PhotoItem
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
            downloaded
            likeCount={1}
            liked
            pressed
          />
          <PhotoItem
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
            disabled
          />
          <PhotoItem
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
            pressed
          />
          <PhotoItem
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
            downloaded
          />
          <PhotoItem imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d' />
          <PhotoItem imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d' />
        </div>
      </div>

      {/* 버튼 */}
      <LongButton text='치즈 네컷 만들기' noFixed disabled />
    </section>
  );
}
