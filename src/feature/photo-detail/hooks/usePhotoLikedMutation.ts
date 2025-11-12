import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

const fetchData = async (photoId: number) => {
  const res = await api.post<ApiReturns['photo.like']>({
    path: EP.photo.like(photoId),
  });
  return res.result;
};

export const usePhotoLikedMutation = () => {
  const mutation = useMutation({
    mutationFn: (photoId: number) => fetchData(photoId),
  });

  return mutation;
};
