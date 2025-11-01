import WaitingAlbum from '@/feature/create-album/components/WaitingAlbum';

type PageProps = {
  params: {
    albumId: string;
  };
};

export default function page({ params }: PageProps) {
  return <WaitingAlbum albumId={params.albumId} />;
}
