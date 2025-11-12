import { getPhotoListByAlbumId } from '@/feature/album/detail/api/getPhotoListByAlbumId.server';
import ScreenAlbumDetail from '@/feature/album/detail/components/ScreenAlbumDetail';

interface PageProps {
  params: Promise<{
    albumId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  const photoListResult = await getPhotoListByAlbumId(albumId, {
    page: 0,
    size: 20,
  });
  return <ScreenAlbumDetail albumId={albumId} initialData={photoListResult} />;
}
