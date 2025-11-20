import { create } from 'zustand';

interface UploadingStore {
  isUploading: boolean;
  isUploaded: boolean;
  setUploading: (isUploading: boolean) => void;
  setUploaded: (isUploaded: boolean) => void;
}

export const useUploadingStore = create<UploadingStore>((set) => ({
  isUploading: false,
  isUploaded: false,
  setUploading: (isUploading) => set({ isUploading }),
  setUploaded: (isUploaded) => set({ isUploaded }),
}));
