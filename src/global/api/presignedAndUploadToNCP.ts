import {
  getPresignedUrl,
  PresignedUrlRequest,
} from '@/global/api/getPresignedUrl';
import { uploadFilesToNCP } from '@/global/utils/uploadToNCP';

/**
 * Presigned URL을 발급받고, 해당 URL로 파일을 NCP에 업로드까지 처리하는 통합 API
 * @param params PresignedUrlRequest & { files: File[] }
 * @returns 업로드 결과 (성공 개수, 실패 개수)
 */
export async function presignedAndUploadToNCP(
  params: PresignedUrlRequest & { files: File[] },
): Promise<{ success: number; failed: number }> {
  // 1. Presigned URL 발급
  const presignedUrlInfos = await getPresignedUrl(params);

  // 2. 파일 업로드
  return uploadFilesToNCP(params.files, presignedUrlInfos);
}
