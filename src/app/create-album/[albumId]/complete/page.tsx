import CreateComplete from '@/feature/create-album/components/CreateComplete';

export default function page({ params }: { params: { albumId: string } }) {
  return <CreateComplete albumId={params.albumId} />;
}
