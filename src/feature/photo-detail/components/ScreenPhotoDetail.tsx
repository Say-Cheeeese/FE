'use client';

import dynamic from 'next/dynamic';
import FooterPhotoDetail from './FooterPhotoDetail';
import HeaderPhotoDetail from './HeaderPhotoDetail';
const SwiperPhotoList = dynamic(() => import('./SwiperPhotoList'), {
  ssr: false,
  loading: () => (
    <div className='flex h-full flex-1 items-center justify-center'>
      <div className='h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent' />
    </div>
  ),
});

interface ScreenPhotoDetailProps {
  albumId: string;
}

export default function ScreenPhotoDetail({ albumId }: ScreenPhotoDetailProps) {
  return (
    <main className='bg-surface-inverse flex h-dvh w-full flex-col justify-between'>
      <HeaderPhotoDetail />
      <SwiperPhotoList />
      <FooterPhotoDetail />
    </main>
  );
}
