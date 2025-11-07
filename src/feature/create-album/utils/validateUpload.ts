import { checkAvailableCount } from '@/feature/create-album/api/checkAvailableCount';
import { validateImageCount } from '@/feature/create-album/utils/validateImages';

export type ValidateUploadResult =
  | { ok: true }
  | { ok: false; reason: 'size' | 'count' | 'both' };

/**
 * 이미지 업로드 전 검증 (용량, 업로드 가능 개수)
 * WaitingAlbum에서 사용 - 성공/실패 reason만 반환
 * 상세 정보가 필요하면 SelectAlbumBody에서 validateImages 직접 사용
 */
export async function validateUpload(
  files: File[],
  albumId: string,
): Promise<ValidateUploadResult> {
  // 1. 용량 검증 (개수만 체크)
  const oversizedCount = validateImageCount(files);
  const sizeValid = oversizedCount === 0;

  // 2. 업로드 가능 개수 검증
  const availableCount = await checkAvailableCount(albumId);
  const countValid = files.length <= availableCount;

  // 3. 둘 다 실패
  if (!sizeValid && !countValid) {
    return { ok: false, reason: 'both' };
  }

  // 4. 용량만 실패
  if (!sizeValid) {
    return { ok: false, reason: 'size' };
  }

  // 5. 개수만 실패
  if (!countValid) {
    return { ok: false, reason: 'count' };
  }

  // 모두 통과
  return { ok: true };
}
