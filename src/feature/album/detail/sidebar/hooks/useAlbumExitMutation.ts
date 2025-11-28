import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

async function fetchData(albumId: string) {
  const res = await api.delete<ApiReturns['album.albumParticipantsMe']>({
    path: EP.album.albumParticipantsMe(albumId),
  });
  return res.result;
}

export function useAlbumExitMutation() {
  const mutation = useMutation({
    mutationFn: (albumId: string) => fetchData(albumId),
  });

  return mutation;
}
