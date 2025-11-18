import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface FetchDataProps {
  albumId: string;
  photoId: number;
}

const fetchData = async ({ albumId, photoId }: FetchDataProps) => {
  const response = await api.get<ApiReturns['album.photoDetail']>({
    path: EP.album.photoDetail(albumId, photoId),
  });

  return response.result;
};

interface UsePhotoDetailQueryProps {
  albumId: string;
  photoId: number;
  options?: Omit<
    UseQueryOptions<ApiReturns['album.photoDetail'], Error>,
    'queryKey' | 'queryFn'
  >;
}

export function usePhotoDetailQuery({
  albumId,
  photoId,
  options,
}: UsePhotoDetailQueryProps) {
  const query = useQuery({
    queryKey: [EP.album.photoDetail(albumId, photoId)],
    queryFn: () => fetchData({ albumId, photoId }),
    ...options,
  });

  return query;
}
