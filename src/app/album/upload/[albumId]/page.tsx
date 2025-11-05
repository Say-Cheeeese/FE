import UploadAlbumPage from '@/feature/upload/components/UploadAlbumPage';

type PageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  return <UploadAlbumPage albumId={albumId} />;
}
