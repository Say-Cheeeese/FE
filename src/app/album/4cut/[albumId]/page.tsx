import ScreenAlbum4Cut from '@/feature/album/4cut/components/ScreenAlbum4Cut';

interface PageProps {
  params: Promise<{
    albumId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  return <ScreenAlbum4Cut albumId={albumId} />;
}
