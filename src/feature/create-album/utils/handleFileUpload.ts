import { presignedAndUploadToNCP } from '@/global/api/presignedAndUploadToNCP';
import { useUploadingStore } from '@/store/useUploadingStore';
import { ChangeEvent } from 'react';
import { convertHeicFilesToJpeg } from './heicToJpeg';
import { saveFilesToStore } from './saveFilesToStore';
import { sortImagesByDate } from './sortImagesByDate';
import { validateUpload } from './validateUpload';

export async function handleFileUpload(
  e: ChangeEvent<HTMLInputElement>,
  albumId: string,
  router?: { push: (path: string) => void; replace: (path: string) => void },
  options?: { stay?: boolean },
) {
  const fl = e.target.files;
  if (!fl) return;

  let files = Array.from(fl).filter((f) => f.type.startsWith('image/'));
  // heic/heif 이미지는 jpeg로 변환
  files = await sortImagesByDate(files);
  files = await convertHeicFilesToJpeg(files);
  // EXIF 촬영일 기준 최신순 정렬

  const result = await validateUpload(files, albumId);
  if (result.ok) {
    if (!options?.stay && router) {
      router.push(`/album/${albumId}/waiting`);
    }
    const setUploading = useUploadingStore.getState().setUploading;
    const startTime = Date.now();
    try {
      setUploading(true);
      const fileInfos = files.map((file) => ({
        fileName: file.name,
        fileSize: file.size,
        contentType: file.type,
      }));
      await presignedAndUploadToNCP({ albumCode: albumId, files, fileInfos });
    } finally {
      // 최소 2초 보장
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsed);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      setUploading(false);
      if (options?.stay && router) {
        window.location.reload();
      }
    }
    return;
  }

  // 검증 실패 시 Zustand 스토어에 저장
  saveFilesToStore(files);
  // if (result.reason === 'size') {
  //   alert('6MB를 초과한 파일이 있습니다.');
  // } else if (result.reason === 'count') {
  //   alert('업로드 가능한 이미지 개수를 초과했습니다.');
  // } else if (result.reason === 'both') {
  //   alert('6MB 초과 이미지가 있고, 업로드 가능한 개수도 초과했습니다.');
  // }

  // 검증 실패/성공 모두 같은 페이지로 이동 (WaitingAlbum에서 분기 처리)
  if (router) {
    router.push(`/album/${albumId}/waiting`);
  }
}
