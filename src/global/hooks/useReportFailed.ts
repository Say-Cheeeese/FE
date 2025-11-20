import { EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

/**
 * 업로드 실패한 photoId들을 서버에 보고하는 API 함수
 */
export async function reportFailedPhotoIds(failurePhotoIds: number[]) {
  return api.post({
    path: EP.photo.reportUploadResult(),
    body: { failurePhotoIds },
  });
}

/**
 * 업로드 실패한 photoId들을 서버에 보고하는 훅
 * @returns useMutation 객체
 */
export function useReportFailed() {
  return useMutation({
    mutationFn: reportFailedPhotoIds,
  });
}
