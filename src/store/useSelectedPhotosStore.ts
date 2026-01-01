import { create } from 'zustand';

export interface StorePhotoItem {
  id: number;
  url: string;
}

interface SelectedPhotosState {
  selectedPhotos: StorePhotoItem[];
  addSelectedPhoto: ({ id, url }: StorePhotoItem) => void;
  deleteSelectedPhoto: (photoId: number) => void;
  clearSelectedPhotos: () => void;
  isSelected: (photoId: number) => boolean;
}

export const useSelectedPhotosStore = create<SelectedPhotosState>(
  (set, get) => ({
    selectedPhotos: [],

    addSelectedPhoto: ({ id, url }) =>
      set((state) => {
        const exists = state.selectedPhotos.some((p) => p.id === id);
        if (exists) return state;

        return {
          selectedPhotos: [...state.selectedPhotos, { id: id, url: url }],
        };
      }),

    deleteSelectedPhoto: (photoId) =>
      set((state) => ({
        selectedPhotos: state.selectedPhotos.filter((p) => p.id !== photoId),
      })),

    clearSelectedPhotos: () => set({ selectedPhotos: [] }),

    isSelected: (photoId) => {
      const { selectedPhotos } = get();
      return selectedPhotos.some((p) => p.id === photoId);
    },
  }),
);
