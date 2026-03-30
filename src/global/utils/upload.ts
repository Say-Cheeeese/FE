import {
    MIN_WAIT_TIME_MS,
    PER_PHOTO_PROCESSING_TIME_MS,
} from '../constants/upload';

/**
 * 전송 완료 후 백엔드 이미지 처리를 위해 필요한 대기 시간을 계산합니다.
 * @param fileCount 업로드된 파일 개수
 * @returns 대기 시간 (ms)
 */
export const calculateUploadWaitTime = (fileCount: number): number => {
  return MIN_WAIT_TIME_MS + fileCount * PER_PHOTO_PROCESSING_TIME_MS;
};
