import { presignedAndUploadToNCP } from '@/global/api/presignedAndUploadToNCP';
import { useUploadingStore } from '@/store/useUploadingStore';
import { ChangeEvent } from 'react';
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
  // EXIF 촬영일 기준 최신순 정렬
  files = await sortImagesByDate(files);

  const result = await validateUpload(files, albumId);
  if (result.ok) {
    if (!options?.stay && router) {
      router.push(`/album/${albumId}`);
    }
    const setUploading = useUploadingStore.getState().setUploading;
    try {
      setUploading(true);
      const fileInfos = files.map((file) => ({
        fileName: file.name,
        fileSize: file.size,
        contentType: file.type,
      }));
      await presignedAndUploadToNCP({ albumCode: albumId, files, fileInfos });
    } finally {
      setUploading(false);
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
    router.push(`/album/${albumId}`);
  }
}
