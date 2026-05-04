import { ApiReturns, EP } from '@/global/api/ep';
import { serverApi } from '@/global/utils/serverApi';

export async function getUserMeServer() {
  const data = await serverApi.get<ApiReturns['user.userMe']>({
    path: EP.user.userMe(),
  });
  return data.result;
}
