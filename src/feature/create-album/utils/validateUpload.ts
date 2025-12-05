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
  const oversizedCount = validateImageCount(files);
  const sizeValid = oversizedCount === 0;

  const availableCount = await checkAvailableCount(albumId);
  const countValid = files.length <= availableCount;

  if (!sizeValid && !countValid) {
    return { ok: false, reason: 'both' };
  }

  if (!sizeValid) {
    return { ok: false, reason: 'size' };
  }

  if (!countValid) {
    return { ok: false, reason: 'count' };
  }

  return { ok: true };
}
