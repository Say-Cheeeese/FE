import { ApiReturns, EP } from '@/global/api/ep';
import { serverApi } from '@/global/utils/serverApi';

export async function getAlbumDataWithRoleServer(code: string) {
  const data = await serverApi.get<ApiReturns['album.participants']>({
    path: EP.album.participants(code),
  });
  return data.result;
}
