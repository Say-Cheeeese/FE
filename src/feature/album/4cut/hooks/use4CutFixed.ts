import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

interface Cheese4CutFixedProps {
  albumId: string;
  photoIds: number[];
}

const fetchData = async ({ albumId, photoIds }: Cheese4CutFixedProps) => {
  const res = await api.post<ApiReturns['cheese4cut.finalize']>({
    path: EP.cheese4cut.finalize(albumId),
    body: { photoIds },
  });
  return res.result;
};

export function use4CutFixed() {
  const mutation = useMutation({
    mutationFn: ({ albumId, photoIds }: Cheese4CutFixedProps) =>
      fetchData({ albumId, photoIds }),
  });

  return mutation;
}
