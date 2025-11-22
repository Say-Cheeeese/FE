import ScreenPhotoShareEntry from '@/feature/photo-share-entry/components/ScreenPhotoShareEntry';

export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;

  return <ScreenPhotoShareEntry albumId={albumId} />;
}
