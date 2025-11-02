import ScreenAlbumEntry from '@/feature/album-entry/components/ScreenAlbumEntry';

export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  return <ScreenAlbumEntry albumId={albumId} />;
}
