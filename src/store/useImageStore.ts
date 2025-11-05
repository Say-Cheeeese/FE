import { create } from 'zustand';

type ImageItem = {
  id: string;
  file: File; // 원본 파일 객체
};

interface ImageStore {
  images: ImageItem[];
  setImages: (images: ImageItem[]) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],

  // 이미지 배열 설정
  setImages: (images) => set({ images }),
}));
