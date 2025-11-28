import ScreenAlbumSidebar from '@/feature/album/detail/sidebar/components/ScreenAlbumSidebar';

interface PageProps {
  params: Promise<{
    albumId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  return <ScreenAlbumSidebar albumId={albumId} />;
}
