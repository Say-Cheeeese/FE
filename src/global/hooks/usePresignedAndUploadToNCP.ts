import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { PresignedUrlRequest } from '../api/getPresignedUrl';
import { presignedAndUploadToNCP } from '../api/presignedAndUploadToNCP';

/**
 * 파일 업로드(프리사인 발급 + 업로드)용 react-query mutation hook
 * @returns useMutation 객체
 */
export function usePresignedAndUploadToNCP(
  options?: UseMutationOptions<
    { success: number; failed: number; failedPhotoIds: number[] },
    unknown,
    PresignedUrlRequest & { files: File[] }
  >,
) {
  return useMutation<
    { success: number; failed: number; failedPhotoIds: number[] },
    unknown,
    PresignedUrlRequest & { files: File[] }
  >({
    mutationFn: presignedAndUploadToNCP,
    ...options,
  });
}
