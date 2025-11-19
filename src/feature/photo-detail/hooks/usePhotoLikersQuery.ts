import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery } from '@tanstack/react-query';

interface FetchDataProps {
  albumId: string;
  photoId: number;
}

const fetchData = async ({ albumId, photoId }: FetchDataProps) => {
  const response = await api.get<ApiReturns['album.albumPhotosLikers']>({
    path: EP.album.albumPhotosLikers(albumId, photoId),
  });

  return response.result;
};

interface UsePhotoLikersQueryProps {
  albumId: string;
  photoId: number;
}

export function usePhotoLikersQuery({
  albumId,
  photoId,
}: UsePhotoLikersQueryProps) {
  const query = useQuery({
    queryKey: [EP.album.albumPhotosLikers(albumId, photoId)],
    queryFn: () => fetchData({ albumId, photoId }),
  });

  return query;
}
