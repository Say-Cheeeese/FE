import UploadAlbumPage from '@/feature/upload/components/UploadAlbumPage';
import { getAlbumDataWithRoleServer } from '@/feature/upload/hooks/useGetAlbumInform.server';
import { EP } from '@/global/api/ep';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type PageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [EP.album.participants(albumId)],
    queryFn: () => getAlbumDataWithRoleServer(albumId),
    staleTime: 60 * 1000 * 10,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <UploadAlbumPage albumId={albumId} />
    </HydrationBoundary>
  );
}
