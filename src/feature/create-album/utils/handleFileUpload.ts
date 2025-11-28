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
    files = await sortImagesByDate(files);
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

      if (uploadResult.success > 0) {
        useUploadingStore.getState().setUploadedCount(uploadResult.success);
      }
    } else {
      saveFilesToStore(files);
      if (router) {
        router.push(`/album/${albumId}/waiting`);
      }
      return {};
    }
  } finally {
    if (e.target) e.target.value = '';
  }

  return uploadResult || {};
}
