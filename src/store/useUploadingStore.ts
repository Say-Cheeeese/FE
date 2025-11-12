import { create } from 'zustand';

interface UploadingStore {
  isUploading: boolean;
  setUploading: (isUploading: boolean) => void;
}

export const useUploadingStore = create<UploadingStore>((set) => ({
  isUploading: false,
  setUploading: (isUploading) => set({ isUploading }),
}));
