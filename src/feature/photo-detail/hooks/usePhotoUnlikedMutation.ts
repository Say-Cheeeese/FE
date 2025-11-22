import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

async function fetchData(photoId: number) {
  const res = await api.delete<ApiReturns['photo.unlike']>({
    path: EP.photo.unlike(photoId),
  });
  return res.result;
}

export function usePhotoUnlikedMutation() {
  const mutation = useMutation({
    mutationFn: (photoId: number) => fetchData(photoId),
  });

  return mutation;
}
