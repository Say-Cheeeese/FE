import ScreenProfileEdit from '@/feature/main/components/profile/ScreenProfileEdit';
import { getUserMeServer } from '@/feature/main/hooks/useGetUserMe.server';
import { EP } from '@/global/api/ep';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function ProfileEditPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [EP.user.userMe()],
    queryFn: () => getUserMeServer(),
    staleTime: 60 * 1000 * 10, // 10 minutes
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ScreenProfileEdit />
    </HydrationBoundary>
  );
}
