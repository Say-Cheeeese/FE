import LongButton from '@/global/components/LongButton';
import PhotoBox from '../../../../global/components/photo/PhotoBox';

interface AlbumBestCutProps {}

export default function AlbumBestCut({}: AlbumBestCutProps) {
  return (
    <section className='rounded-xl bg-white'>
      <h2 className='typo-body-lg-semibold text-text-subtle mb-2'>
        앨범 베스트컷
      </h2>

      {/* 사진 리스트 */}
      <div className='scrollbar-hide -mx-5 mb-3 overflow-x-auto px-5'>
        <div className='flex justify-between'>
          <PhotoBox
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
            likeCount={1}
            liked
          />
          <PhotoBox
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
            likeCount={1}
          />
          <PhotoBox
            likeCount={0}
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
          />
          <PhotoBox
            likeCount={0}
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
          />
        </div>
      </div>

      {/* 버튼 */}
      <LongButton text='치즈 네컷 만들기' noFixed disabled />
    </section>
  );
}
