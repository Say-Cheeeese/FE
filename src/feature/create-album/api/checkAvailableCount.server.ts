import { serverApi } from '@/global/utils/serverApi';

/**
 * 앨범에 업로드 가능한 남은 이미지 개수 조회 (Server Component용)
 * @param albumId 앨범 ID
 * @returns {Promise<number>} 남은 업로드 가능 개수
 */
export async function checkAvailableCountServer(
  albumId: string,
): Promise<number> {
  const response = await serverApi.get<{ availableCount: number }>({
    path: `/v1/album/${albumId}/available-count`,
  });
  return response.result.availableCount;
}
