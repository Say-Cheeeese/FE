import LongButton from '@/global/components/LongButton';
import { useABTestGroup } from '@/global/hooks/useABTestGroup';
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
  const abGroup = useABTestGroup();

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
        text={
          abGroup === 'A'
            ? '네컷사진 미리보기'
            : abGroup === 'B'
              ? '네컷사진 만들기'
              : '이대로 네컷 확정하기'
        }
        onClick={() => router.push(`/album/4cut/${albumId}`)}
        noFixed
        disabled={photoCount < 4}
        height={48}
      />
    </section>
  );
}
