import {
  getPresignedUrl,
  PresignedUrlRequest,
} from '@/global/api/getPresignedUrl';
import { uploadFilesToNCP } from '@/global/api/uploadToNCP';
import { reportFailedPhotoIds } from '@/global/hooks/useReportFailed';

/**
 * Presigned URL을 발급받고, 해당 URL로 파일을 NCP에 업로드까지 처리하는 통합 API
 * @param params PresignedUrlRequest & { files: File[] }
 * @returns 업로드 결과 (성공 개수, 실패 개수, 실패 photoId)
 */
export async function presignedAndUploadToNCP(
  params: PresignedUrlRequest & { files: File[] },
): Promise<{ success: number; failed: number; failedPhotoIds: number[] }> {
  const presignedUrlInfos = await getPresignedUrl(params);

  const uploadResult = await uploadFilesToNCP(params.files, presignedUrlInfos);

  if (uploadResult.failedPhotoIds.length > 0) {
    try {
      await reportFailedPhotoIds(uploadResult.failedPhotoIds);
    } catch (e) {
      console.error('실패 보고 API 호출 실패:', e);
    }
  }

  return uploadResult;
}
