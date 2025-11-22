import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchData = async (albumId: string) => {
  const response = await api.get<ApiReturns['album.availableCount']>({
    path: EP.album.availableCount(albumId),
  });

  return response.result;
};

export function useGetAlbumAvailableCount(
  albumId: string,
  options?: UseQueryOptions<ApiReturns['album.availableCount'], Error>,
) {
  const query = useQuery({
    queryKey: [EP.album.availableCount(albumId)],
    queryFn: () => fetchData(albumId),
    enabled: !!albumId,
    ...options,
  });

  return query;
}
