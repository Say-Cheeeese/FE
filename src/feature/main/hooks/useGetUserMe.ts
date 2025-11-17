import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await api.get<ApiReturns['user.userMe']>({
    path: EP.user.userMe(),
  });

  return response.result;
};

export function useGetUserMe(
  options?: Partial<UseQueryOptions<ApiReturns['user.userMe'], Error>>,
) {
  const query = useQuery({
    queryKey: [EP.user.userMe()],
    queryFn: () => fetchData(),
    ...options,
  });

  return query;
}
