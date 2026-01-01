import { checkAvailableCount } from '@/feature/create-album/api/checkAvailableCount';
import { validateImages } from '@/feature/create-album/utils/validateImages';

export type CheckImagesResult = {
  oversizedFiles: string[];
  availableCount: number;
};

/**
 * 업로드 전 이미지 상태 확인 유틸
 * - oversizedFiles: 6MB를 초과한 파일 이름 목록
 * - availableCount: 서버에서 조회한 남은 업로드 가능 개수
 * 선택/표시가 필요한 화면(예: SelectAlbum)에서 사용하세요.
 */
export async function checkImages(
  files: File[],
  albumId: string,
): Promise<CheckImagesResult> {
  const { oversizedFiles } = validateImages(files);
  const availableCount = await checkAvailableCount(albumId);

  return {
    oversizedFiles,
    availableCount,
  };
}
