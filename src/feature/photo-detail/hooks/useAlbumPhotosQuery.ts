import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery } from '@tanstack/react-query';

async function getData(code: string) {
  const data = api.get<ApiReturns['album.photos']>({
    path: EP.album.photos(code),
  });

  return data;
}

interface UseAlbumPhotosQueryProps {
  code: string;
}

export function useAlbumPhotosQuery({ code }: UseAlbumPhotosQueryProps) {
  const query = useQuery({
    queryKey: [EP.album.photos(code)],
    queryFn: () => getData(code),
  });

  return query;
}
