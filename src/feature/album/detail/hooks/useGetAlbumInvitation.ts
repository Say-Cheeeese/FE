import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const getAlbumInvitation = async (code: string) => {
  const response = await api.get<ApiReturns['album.invitation']>({
    path: EP.album.invitation(code),
  });
  return response.result;
};

export function useGetAlbumInvitation(
  albumId: string,
  options?: UseQueryOptions<ApiReturns['album.invitation'], Error>,
) {
  return useQuery<ApiReturns['album.invitation'], Error>({
    queryKey: [EP.album.invitation(albumId)],
    queryFn: () => getAlbumInvitation(albumId),
    enabled: !!albumId,
    ...options,
  });
}
