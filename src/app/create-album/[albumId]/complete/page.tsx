import CreateComplete from '@/feature/create-album/components/CreateComplete';

export default async function page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  return <CreateComplete albumId={albumId} />;
}
