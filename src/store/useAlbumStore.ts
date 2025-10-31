import { create } from 'zustand';

interface AlbumInfo {
  emoji: string;
  eventName: string;
  eventDate: string;
  participantCount: number;
}

interface AlbumStore {
  album: AlbumInfo | null;
  setAlbum: (album: AlbumInfo) => void;
  resetAlbum: () => void;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
  album: null,
  setAlbum: (album) => set({ album }),
  resetAlbum: () => set({ album: null }),
}));
