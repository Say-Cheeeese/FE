import { ApiReturns, EP } from '@/global/api/ep';
import { serverApi } from '@/global/utils/serverApi';

export async function getUserMeServer() {
  console.log('[SSR API] Requesting user/me...');
  const data = await serverApi.get<ApiReturns['user.userMe']>({
    path: EP.user.userMe(),
  });
  console.log('[SSR API] Response user/me:', data.result);
  return data.result;
}
