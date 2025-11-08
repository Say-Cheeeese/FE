import {
  getPresignedUrl,
  PresignedUrlInfo,
  PresignedUrlRequest,
} from '@/global/api/getPresignedUrl';
import { useMutation } from '@tanstack/react-query';

export function usePresignedUrl() {
  return useMutation<PresignedUrlInfo[], unknown, PresignedUrlRequest>({
    mutationFn: getPresignedUrl,
  });
}
