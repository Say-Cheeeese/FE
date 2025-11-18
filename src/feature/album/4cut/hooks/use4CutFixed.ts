import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

const fetchData = async (albumId: string) => {
  const res = await api.post<ApiReturns['cheese4cut.finalize']>({
    path: EP.cheese4cut.finalize(albumId),
  });
  return res.result;
};

export function use4CutFixed() {
  const mutation = useMutation({
    mutationFn: (albumId: string) => fetchData(albumId),
  });

  return mutation;
}
