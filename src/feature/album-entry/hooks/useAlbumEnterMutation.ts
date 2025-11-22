import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

const fetchData = async (albumId: string, redirectUrlOnAuthError?: string) => {
  const res = await api.post<ApiReturns['album.enter']>({
    path: EP.album.enter(albumId),
    ...(redirectUrlOnAuthError && { redirectUrlOnAuthError }),
  });
  return res.result;
};

interface AlbumEnterProps {
  albumId: string;
  redirectUrlOnAuthError: string;
}

export function useAlbumEnterMutation() {
  const mutation = useMutation({
    mutationFn: ({ albumId, redirectUrlOnAuthError }: AlbumEnterProps) =>
      fetchData(albumId, redirectUrlOnAuthError),
  });

  return mutation;
}
