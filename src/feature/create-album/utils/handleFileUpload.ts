import { presignedAndUploadToNCP } from '@/global/api/presignedAndUploadToNCP';
import { useUploadingStore } from '@/store/useUploadingStore';
import { ChangeEvent } from 'react';
import { getFilesWithCaptureTime } from './getFilesWithCaptureTime';
import { convertHeicFilesToJpeg } from './heicToJpeg';
import { saveFilesToStore } from './saveFilesToStore';
import { sortImagesByDate } from './sortImagesByDate';
import { validateUpload } from './validateUpload';

export async function handleFileUpload(
  e: ChangeEvent<HTMLInputElement>,
  albumId: string,
  router?: { push: (path: string) => void; replace: (path: string) => void },
  options?: { stay?: boolean },
): Promise<{
  success?: number;
  failed?: number;
  failedPhotoIds?: number[];
}> {
  const fl = e.target.files;
  if (!fl) return {};

  const startTime = Date.now();
  let uploadResult: { success: number; failed: number } | null = null;

  try {
    let files = Array.from(fl).filter((f) => f.type.startsWith('image/'));
    // EXIF 촬영일 기준 최신순 정렬
    files = await sortImagesByDate(files);
    // heic/heif 이미지는 jpeg로 변환
    files = await convertHeicFilesToJpeg(files);

    const validationResult = await validateUpload(files, albumId);
    if (validationResult.ok) {
      useUploadingStore.getState().setUploaded(true);
      if (!options?.stay && router) {
        router.push(`/album/${albumId}/waiting`);
      }
      const filesWithCapture = await getFilesWithCaptureTime(files);
      const fileInfos = filesWithCapture.map(({ file, captureTime }) => ({
        fileName: file.name,
        fileSize: file.size,
        contentType: file.type,
        captureTime,
      }));
      uploadResult = await presignedAndUploadToNCP({
        albumCode: albumId,
        files,
        fileInfos,
      });

      // 업로드 성공 개수 저장
      if (uploadResult.success > 0) {
        useUploadingStore.getState().setUploadedCount(uploadResult.success);
      }
    } else {
      // 검증 실패 시 Zustand 스토어에 저장
      saveFilesToStore(files);
      // 검증 실패 시 페이지로 이동 (WaitingAlbum에서 분기 처리)
      if (router) {
        router.push(`/album/${albumId}/waiting`);
      }
      return {};
    }
  } finally {
    // input value 초기화(업로드 성공/실패 관계없이)
    if (e.target) e.target.value = '';
  }

  // 업로드 결과 반환
  return uploadResult || {};
}
