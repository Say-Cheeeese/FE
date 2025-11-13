import { ApiReturns, EP } from '@/global/api/ep';
import { serverApi } from '@/global/utils/serverApi';

export function getAlbumDataWithRoleServer(code: string) {
  const data = serverApi.get<ApiReturns['album.participants']>({
    path: EP.album.participants(code),
  });
  return data;
}
