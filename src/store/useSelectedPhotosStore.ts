import { create } from 'zustand';

interface SelectedPhotosState {
  selectedPhotoIds: number[];
  togglePhotoSelection: (photoId: number) => void;
  clearSelectedPhotos: () => void;
}

export const useSelectedPhotosStore = create<SelectedPhotosState>((set) => ({
  selectedPhotoIds: [],
  togglePhotoSelection: (photoId) =>
    set((state) => {
      const exists = state.selectedPhotoIds.includes(photoId);

      return {
        selectedPhotoIds: exists
          ? state.selectedPhotoIds.filter((id) => id !== photoId)
          : [...state.selectedPhotoIds, photoId],
      };
    }),
  clearSelectedPhotos: () => set({ selectedPhotoIds: [] }),
}));
