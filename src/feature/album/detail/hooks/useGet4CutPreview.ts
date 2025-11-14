import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchData = async (albumId: string) => {
  const response = await api.get<ApiReturns['cheese4cut.preview']>({
    path: EP.cheese4cut.preview(albumId),
  });

  return response.result;
};

export function useGet4CutPreview(
  albumId: string,
  options?: UseQueryOptions<ApiReturns['cheese4cut.preview'], Error>,
) {
  const query = useQuery({
    queryKey: [EP.cheese4cut.preview(albumId)],
    queryFn: () => fetchData(albumId),
    enabled: !!albumId,
    ...options,
  });

  return query;
}
