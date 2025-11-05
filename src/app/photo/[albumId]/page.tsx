import ScreenAlbumDetail from '@/feature/photo-detail/components/ScreenAlbumDetail';

export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  return <ScreenAlbumDetail albumId={albumId} />;
}
