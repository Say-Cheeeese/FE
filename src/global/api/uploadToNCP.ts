import { PresignedUrlInfo } from '@/global/api/getPresignedUrl';

/**
 * Presigned URL을 사용하여 NCP에 파일 업로드
 * @param file 업로드할 파일
 * @param uploadUrl NCP presigned URL
 * @param photoId 사진 ID
 * @returns 업로드 성공 여부
 */
export async function uploadFileToNCP(
  file: File,
  uploadUrl: string,
  photoId: number,
): Promise<boolean> {
  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
    });

    if (!response.ok) {
      console.error(
        `파일 업로드 실패 (photoId: ${photoId}):`,
        response.statusText,
      );
      return false;
    }

    console.log(`파일 업로드 성공 (photoId: ${photoId})`);
    return true;
  } catch (error) {
    console.error(`파일 업로드 중 오류 발생 (photoId: ${photoId}):`, error);
    return false;
  }
}

/**
 * 여러 파일을 NCP에 병렬 업로드
 * @param files 업로드할 파일 배열
 * @param presignedUrlInfos presigned URL 정보 배열
 * @returns 업로드 결과 (성공 개수, 실패 개수)
 */
export async function uploadFilesToNCP(
  files: File[],
  presignedUrlInfos: PresignedUrlInfo[],
): Promise<{ success: number; failed: number; failedPhotoIds: number[] }> {
  if (files.length !== presignedUrlInfos.length) {
    console.error('파일 개수와 presigned URL 개수가 일치하지 않습니다.');
    return {
      success: 0,
      failed: files.length,
      failedPhotoIds: presignedUrlInfos.map((i) => i.photoId),
    };
  }

  const uploadResults = await Promise.all(
    files.map((file, index) => {
      const { uploadUrl, photoId } = presignedUrlInfos[index];
      return uploadFileToNCP(file, uploadUrl, photoId).then((ok) => ({
        ok,
        photoId,
      }));
    }),
  );

  const success = uploadResults.filter((r) => r.ok).length;
  const failed = uploadResults.length - success;
  const failedPhotoIds = uploadResults
    .filter((r) => !r.ok)
    .map((r) => r.photoId);

  console.log(
    `업로드 완료: 성공 ${success}개, 실패 ${failed}개`,
    failedPhotoIds.length ? `실패 photoId: ${failedPhotoIds.join(',')}` : '',
  );

  return { success, failed, failedPhotoIds };
}
