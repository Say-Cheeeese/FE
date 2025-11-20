import type { AlbumType } from '@/feature/album/detail/components/NavBarAlbumDetail';
import { create } from 'zustand';

interface AlbumTypeState {
  albumType: AlbumType;
  setAlbumType: (albumType: AlbumType) => void;
}

export const useAlbumTypeStore = create<AlbumTypeState>((set) => ({
  albumType: 'all',
  setAlbumType: (albumType) => set({ albumType }),
}));
