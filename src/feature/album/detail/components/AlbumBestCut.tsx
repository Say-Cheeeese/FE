import LongButton from '@/global/components/LongButton';
import { useRouter } from 'next/navigation';
import PhotoBox from '../../../../global/components/photo/PhotoBox';

interface AlbumBestCutProps {}

export default function AlbumBestCut({}: AlbumBestCutProps) {
  const router = useRouter();

  return (
    <section className='rounded-xl bg-white'>
      <h2 className='typo-body-lg-semibold text-text-subtle mb-2'>
        앨범 베스트컷
      </h2>

      {/* 사진 리스트 */}
      <div className='mb-3'>
        <div className='flex justify-between'>
          {/* TODO Router주소 바꿔야함 */}
          <PhotoBox
            onPress={() => router.push('/photo/ID바꿔야함')}
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
          />
          <PhotoBox
            onPress={() => router.push('/photo/ID바꿔야함')}
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
          />
          <PhotoBox
            onPress={() => router.push('/photo/ID바꿔야함')}
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
          />
          <PhotoBox
            onPress={() => router.push('/photo/ID바꿔야함')}
            imageSrc='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
          />
        </div>
      </div>

      {/* 버튼 */}
      <LongButton text='치즈 네컷 만들기' noFixed />
    </section>
  );
}
