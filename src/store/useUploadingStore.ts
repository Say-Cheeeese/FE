import { create } from 'zustand';

interface UploadingStore {
  isUploaded: boolean;
  uploadedCount: number;
  setUploaded: (isUploaded: boolean) => void;
  setUploadedCount: (count: number) => void;
}

export const useUploadingStore = create<UploadingStore>((set) => ({
  isUploaded: false,
  uploadedCount: 0,
  setUploaded: (isUploaded) => set({ isUploaded }),
  setUploadedCount: (count) => set({ uploadedCount: count }),
}));
