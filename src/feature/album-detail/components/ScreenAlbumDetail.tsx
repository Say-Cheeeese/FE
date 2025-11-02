'use client';
import DrawerPhotoList from './DrawerPhotoList';
import FooterPhotoDetail from './FooterPhotoDetail';
import HeaderPhotoDetail from './HeaderPhotoDetail';
import LargePhoto from './LargePhoto';

interface ScreenAlbumDetailProps {
  albumId: string;
}

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col'>
      <HeaderPhotoDetail />
      <LargePhoto />
      <DrawerPhotoList />
      <FooterPhotoDetail />
    </main>
  );
}
