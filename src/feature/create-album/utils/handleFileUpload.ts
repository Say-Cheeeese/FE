import { EP } from '@/global/api/ep';
import { presignedAndUploadToNCP } from '@/global/api/presignedAndUploadToNCP';
import Toast from '@/global/components/toast/Toast';
import { useUploadingStore } from '@/store/useUploadingStore';
import { QueryClient } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import { getFilesWithCaptureTime } from './getFilesWithCaptureTime';
import { convertHeicFilesToJpeg } from './heicToJpeg';
import { saveFilesToStore } from './saveFilesToStore';
import { sortImagesByDate } from './sortImagesByDate';
import { validateUpload } from './validateUpload';

const MIN_WAIT_TIME_MS = 3000;
const PER_PHOTO_PROCESSING_TIME_MS = 1000;

export async function handleFileUpload(
  e: ChangeEvent<HTMLInputElement>,
  albumId: string,
  router?: { push: (path: string) => void; replace: (path: string) => void },
  options?: { stay?: boolean; queryClient?: QueryClient },
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
    let files = Array.from(fl).filter(
      (f) =>
        f.type.startsWith('image/') ||
        /heic|heif/i.test(f.type) ||
        /\.heic$|\.heif$/i.test(f.name),
    );

    const hasHeic = files.some(
      (f) => /heic|heif/i.test(f.type) || /\.heic$|\.heif$/i.test(f.name),
    );
    if (hasHeic) {
      Toast.alert('아이폰(HEIC) 사진을 변환 중입니다. 잠시만 기다려주세요!');
    }

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

      // 백엔드 이미지 처리를 위한 추가 대기 시간
      // 기본 로딩 애니메이션을 위해 최소 대기 시간을 유지합니다.
      const backendProcessingTime = files.length * PER_PHOTO_PROCESSING_TIME_MS;
      const waitTime = Math.max(MIN_WAIT_TIME_MS, backendProcessingTime);
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      if (options?.queryClient) {
        const retryInvalidate = () => {
          options.queryClient!.refetchQueries({
            queryKey: [EP.album.photos(albumId)],
          });
          options.queryClient!.refetchQueries({
            queryKey: [EP.album.availableCount(albumId)],
          });
        };
        retryInvalidate();
        setTimeout(retryInvalidate, 3000);
        setTimeout(retryInvalidate, 6000);
      }

      // 원래 WaitingAlbum에서 하던 상세 화면 이동을 리팩토링하여 여기서 수행
      if (!options?.stay && router) {
        router.replace(`/album/detail/${albumId}`);
      }

      if (uploadResult.success > 0) {
        if (!options?.stay && router) {
          setTimeout(
            () =>
              Toast.check(`총 ${uploadResult?.success}장을 앨범에 채웠어요.`),
            500,
          );
        } else {
          Toast.check(`총 ${uploadResult.success}장을 앨범에 채웠어요.`);
        }
      }
    } else {
      saveFilesToStore(files);
      if (router) {
        // 무조건 waiting 화면으로 진입시킵니다 (사용자 체감상 '처리 중' 임을 알리기 위함)
        router.push(`/album/${albumId}/waiting`);
      }

      // waiting 화면에서 최소 대기 보장
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_WAIT_TIME_MS - elapsed);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      if (router) {
        // 그 후 에러난 사진을 고칠 수 있는 select 화면으로 강제 이동
        router.replace(`/album/${albumId}/select`);
      }
      return {};
    }
  } finally {
    useUploadingStore.getState().setUploaded(false);
    if (e.target) e.target.value = '';
  }

  return uploadResult || {};
}
