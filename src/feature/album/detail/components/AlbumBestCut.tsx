import LongButton from '@/global/components/LongButton';
import { useRouter } from 'next/navigation';
import AlbumBestCutPhotoList from './AlbumBestCutPhotoList';

interface AlbumBestCutProps {
  albumId: string;
  photoCount?: number;
}

export default function AlbumBestCut({
  albumId,
  photoCount,
}: AlbumBestCutProps) {
  const router = useRouter();

  if (photoCount === undefined || photoCount === 0) return null;

  return (
    <section className='rounded-xl bg-white'>
      <h2 className='typo-body-lg-semibold text-text-subtle mb-2'>
        앨범 베스트컷
      </h2>

      <div className='mb-3'>
        <AlbumBestCutPhotoList albumId={albumId} />
      </div>

      <LongButton
        text='치즈 네컷 만들기'
        onClick={() => router.push(`/album/4cut/${albumId}`)}
        noFixed
        disabled={photoCount < 4}
      />
    </section>
  );
}
