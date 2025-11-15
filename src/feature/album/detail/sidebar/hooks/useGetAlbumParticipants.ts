import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchData = async (albumId: string) => {
  const response = await api.get<ApiReturns['album.participants']>({
    path: EP.album.participants(albumId),
  });

  return response.result;
};

export function useGetAlbumParticipants(
  albumId: string,
  options?: UseQueryOptions<ApiReturns['album.participants'], Error>,
) {
  const query = useQuery({
    queryKey: [EP.album.participants(albumId)],
    queryFn: () => fetchData(albumId),
    enabled: !!albumId,
    ...options,
  });

  return query;
}
