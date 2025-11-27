import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery } from '@tanstack/react-query';
const getAllProfile = async () => {
  const data = await api.get<ApiReturns['user.userProfileImages']>({
    path: EP.user.userProfileImages(),
  });
  return data.result;
};

export function useGetAllProfiles(enabled: boolean = true) {
  return useQuery({
    queryKey: [EP.user.userProfileImages()],
    queryFn: getAllProfile,
    staleTime: 36000,
    enabled,
  });
}
