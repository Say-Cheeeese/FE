import ScreenAlbumDetail from '@/feature/album-detail/components/ScreenAlbumDetail';

export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  return <ScreenAlbumDetail albumId={albumId} />;
}
