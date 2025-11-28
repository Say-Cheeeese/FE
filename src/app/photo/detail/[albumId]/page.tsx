import ScreenPhotoDetail from '@/feature/photo-detail/components/ScreenPhotoDetail';

export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  return <ScreenPhotoDetail albumId={albumId} />;
}
