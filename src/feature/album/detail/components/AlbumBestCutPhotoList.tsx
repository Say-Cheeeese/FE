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
    // 좋아요 누른것 실시간으로 반영되게 매번 호출
    refetchOnMount: 'always',
  });

  // Layout Shifting 방지 위해 height 고정
  if (isPending) return <div style={{ height: '87.5px' }} />;
  if (isError) return <div style={{ height: '87.5px' }} />;

  return (
    <div className='grid w-full grid-cols-4'>
      {items.map(({ thumbnailUrl, photoId, likeCnt, isLiked }) => {
        if (!photoId) return null;

        return (
          <PhotoBox
            key={photoId}
            responsive
            onPress={() =>
              router.push(`/photo/detail/${albumId}${buildQuery({ photoId })}`)
            }
            imageSrc={thumbnailUrl}
            likeCount={likeCnt}
            liked={isLiked}
          />
        );
      })}
    </div>
  );
}
