import type { PhotoSortType } from '@/feature/album/detail/constants/photoSort';
import { create } from 'zustand';

interface AlbumSortState {
  sortType: PhotoSortType;
  setSortType: (sortType: PhotoSortType) => void;
}

export const useAlbumSortStore = create<AlbumSortState>((set) => ({
  sortType: 'uploaded',
  setSortType: (sortType) => set({ sortType }),
}));
