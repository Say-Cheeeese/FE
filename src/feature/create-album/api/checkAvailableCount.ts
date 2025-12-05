import { api } from '@/global/utils/api';

/**
 * 앨범에 업로드 가능한 남은 이미지 개수 조회 (Client Component용)
 * @param albumId 앨범 ID
 * @returns {Promise<number>} 남은 업로드 가능 개수
 */
export async function checkAvailableCount(albumId: string): Promise<number> {
  const response = await api.get<{ availableCount: number }>({
    path: `/v1/album/${albumId}/available-count`,
  });
  return response.result.availableCount;
}
