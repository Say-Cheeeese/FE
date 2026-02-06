import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchAiSummary = async (albumId: string) => {
  const response = await api.get<ApiReturns['cheese4cut.cheese4cutAiSummary']>({
    path: EP.cheese4cut.cheese4cutAiSummary(albumId),
  });

  return response.result;
};

export function use4CutAiSummary(albumId: string) {
  const query = useQuery({
    queryKey: [EP.cheese4cut.cheese4cutAiSummary(albumId)],
    queryFn: () => fetchAiSummary(albumId),
    refetchInterval: (query) => {
      // COMPLETED 상태면 polling 중단
      if (query.state.data?.status === 'COMPLETED') {
        return false;
      }
      // 아니면 30초마다 polling
      return 30000;
    },
    refetchIntervalInBackground: false,
  });

  return {
    ...query,
    aiSummary: query.data?.content || '',
    isCompleted: query.data?.status === 'COMPLETED',
    title: query.data?.title || '',
  };
}
