'use client';

import FooterPhotoDetail from './FooterPhotoDetail';
import HeaderPhotoDetail from './HeaderPhotoDetail';
import SwiperPhotoList from './SwiperPhotoList';

interface ScreenAlbumDetailProps {
  albumId: string;
}

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col justify-between'>
      <HeaderPhotoDetail />
      {/* <LargePhoto /> */}
      <SwiperPhotoList />
      <FooterPhotoDetail />
    </main>
  );
}
