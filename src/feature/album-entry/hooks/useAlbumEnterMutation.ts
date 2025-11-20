import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

const fetchData = async (albumId: string) => {
  const res = await api.post<ApiReturns['album.enter']>({
    path: EP.album.enter(albumId),
  });
  return res.result;
};

export function useAlbumEnterMutation() {
  const mutation = useMutation({
    mutationFn: (albumId: string) => fetchData(albumId),
  });

  return mutation;
}
