import WaitingAlbum from '@/feature/create-album/components/WaitingAlbum';

type PageProps = {
  params: Promise<{
    albumId: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { albumId } = await params;
  return <WaitingAlbum albumId={albumId} />;
}
