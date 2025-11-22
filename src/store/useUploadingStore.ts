import { create } from 'zustand';

interface UploadingStore {
  isUploaded: boolean;
  setUploaded: (isUploaded: boolean) => void;
}

export const useUploadingStore = create<UploadingStore>((set) => ({
  isUploaded: false,
  setUploaded: (isUploaded) => set({ isUploaded }),
}));
