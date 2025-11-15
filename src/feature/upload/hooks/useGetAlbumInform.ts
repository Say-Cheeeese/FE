import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery } from '@tanstack/react-query';

const getAlbumDataWithRole = async (code: string) => {
  const data = await api.get<ApiReturns['album.participants']>({
    path: EP.album.participants(code),
  });
  return data.result;
};

interface UseGetAlbumInformProps {
  code: string;
}

export function useGetAlbumInform({ code }: UseGetAlbumInformProps) {
  return useQuery({
    queryKey: [EP.album.participants(code)],
    queryFn: () => getAlbumDataWithRole(code),
    enabled: !!code,
  });
}
