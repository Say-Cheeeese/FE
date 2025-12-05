import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchData = async (albumId: string) => {
  const response = await api.get<ApiReturns['cheese4cut.preview']>({
    path: EP.cheese4cut.preview(albumId),
  });

  return response.result;
};

export function use4CutPreviewQuery(
  albumId: string,
  options?: UseQueryOptions<ApiReturns['cheese4cut.preview'], Error>,
) {
  const query = useQuery({
    queryKey: [EP.cheese4cut.preview(albumId)],
    queryFn: () => fetchData(albumId),
    ...options,
  });

  return query;
}
