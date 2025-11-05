import { checkAvailableCount } from '@/feature/create-album/api/checkAvailableCount';
import { validateImages } from '@/feature/create-album/utils/validateImages';

export type ValidateUploadResult =
  | { ok: true }
  | { ok: false; reason: 'size'; oversizedFiles: string[] }
  | { ok: false; reason: 'count' };

/**
 * 이미지 업로드 전 검증 (용량, 업로드 가능 개수)
 */
export async function validateUpload(
  files: File[],
  albumId: string,
): Promise<ValidateUploadResult> {
  // 1. 용량 검증
  const { valid, oversizedFiles } = validateImages(files);
  if (!valid) {
    return {
      ok: false,
      reason: 'size',
      oversizedFiles,
    };
  }

  // 2. 업로드 가능 개수 검증
  const canUpload = await checkAvailableCount(albumId, files.length);
  if (!canUpload) {
    return {
      ok: false,
      reason: 'count',
    };
  }

  // 모두 통과
  return { ok: true };
}
