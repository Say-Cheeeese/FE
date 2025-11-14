import { useAlbumPhotosInfiniteQuery } from '@/feature/photo-detail/hooks/useAlbumPhotosInfiniteQuery';
import PhotoBox from '@/global/components/photo/PhotoBox';
import { buildQuery } from '@/global/utils/buildQuery';
import { useRouter } from 'next/navigation';

interface AlbumBestCutPhotoListProps {
  albumId: string;
}

export default function AlbumBestCutPhotoList({
  albumId,
}: AlbumBestCutPhotoListProps) {
  const router = useRouter();
  const { isPending, isError, items } = useAlbumPhotosInfiniteQuery({
    code: albumId,
    size: 4,
    sorting: 'POPULAR',
  });

  // Layout Shifting 방지 위해 height 고정
  if (isPending) return <div style={{ height: '87.5px' }} />;
  if (isError) return <div style={{ height: '87.5px' }} />;

  return (
    <div className='grid w-full grid-cols-4'>
      {/* TODO : 백엔드에서 size params 미적용이슈 고쳐주기전까지 slice */}
      {items.slice(0, 4).map(({ thumbnailUrl, photoId }) => {
        if (!photoId) return null;

        return (
          <PhotoBox
            key={photoId}
            responsive
            onPress={() =>
              router.push(`/photo/detail/${albumId}${buildQuery({ photoId })}`)
            }
            imageSrc={thumbnailUrl}
          />
        );
      })}
    </div>
  );
}
