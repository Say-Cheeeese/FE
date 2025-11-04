import { useImageStore } from '@/store/useImageStore';

/**
 * 이미지 파일 배열을 zustand 이미지 스토어에 저장
 * @param files File[]
 */
export function saveFilesToStore(files: File[]) {
  const setImages = useImageStore.getState().setImages;
  setImages(
    files.map((file) => ({
      id: `${file.name}-${crypto.randomUUID()}`,
      file,
    })),
  );
}
