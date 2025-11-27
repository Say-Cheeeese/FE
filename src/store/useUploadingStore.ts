import { create } from 'zustand';

interface UploadingStore {
  isUploaded: boolean;
  uploadedCount: number;
  setUploaded: (isUploaded: boolean) => void;
  setUploadedCount: (count: number) => void;
  reset: () => void; // 한 번에 초기화
}

export const useUploadingStore = create<UploadingStore>((set) => ({
  isUploaded: false,
  uploadedCount: 0,
  setUploaded: (isUploaded) => set({ isUploaded }),
  setUploadedCount: (count) => set({ uploadedCount: count }),
  reset: () => {
    set({ isUploaded: false, uploadedCount: 0 });
  }, // 한 번에 초기화
}));
