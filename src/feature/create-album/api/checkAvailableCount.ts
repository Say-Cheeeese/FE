import { api } from '@/global/utils/api';

/**
 * 앨범에 업로드 가능한 남은 이미지 개수 조회 및 비교
 * @param albumId 앨범 ID
 * @param uploadCount 업로드 시도할 이미지 개수
 * @returns {Promise<boolean>} 업로드 가능하면 true, 초과면 false
 */
export async function checkAvailableCount(
  albumId: string,
  uploadCount: number,
): Promise<boolean> {
  // 백엔드에서 남은 업로드 가능 개수 조회
  const response = await api.get<{ availableCount: number }>({
    path: `/v1/album/${albumId}/available-count`,
  });
  console.log('Available Count Response:', response);
  const availableCount = response.result.availableCount;
  // 업로드 시도 개수가 남은 개수보다 많으면 false
  return uploadCount <= availableCount;
}
