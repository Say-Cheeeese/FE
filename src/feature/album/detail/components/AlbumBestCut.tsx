import LongButton from '@/global/components/LongButton';
import { useRouter } from 'next/navigation';
import AlbumBestCutPhotoList from './AlbumBestCutPhotoList';

interface AlbumBestCutProps {
  albumId: string;
}

export default function AlbumBestCut({ albumId }: AlbumBestCutProps) {
  const router = useRouter();

  return (
    <section className='rounded-xl bg-white'>
      <h2 className='typo-body-lg-semibold text-text-subtle mb-2'>
        앨범 베스트컷
      </h2>

      {/* 사진 리스트 */}
      <div className='mb-3'>
        <AlbumBestCutPhotoList albumId={albumId} />
      </div>

      {/* 버튼 */}
      <LongButton
        text='치즈 네컷 만들기'
        onClick={() => router.push(`/album/4cut/${albumId}`)}
        noFixed
      />
    </section>
  );
}
