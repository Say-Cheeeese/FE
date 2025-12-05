import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchData = async (albumId: string) => {
  const response = await api.get<ApiReturns['album.albumInfo']>({
    path: EP.album.albumInfo(albumId),
  });

  return response.result;
};

export function useGetAlbumInfo(
  albumId: string,
  options?: UseQueryOptions<ApiReturns['album.albumInfo'], Error>,
) {
  const query = useQuery({
    queryKey: [EP.album.albumInfo(albumId)],
    queryFn: () => fetchData(albumId),
    enabled: !!albumId,
    ...options,
  });

  return query;
}
