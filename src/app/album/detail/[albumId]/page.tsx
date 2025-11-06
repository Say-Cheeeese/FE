import ScreenAlbumDetail from '@/feature/album/detail/components/ScreenAlbumDetail';

interface PageProps {
  params: Promise<{
    albumId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  return <ScreenAlbumDetail albumId={albumId} />;
}
