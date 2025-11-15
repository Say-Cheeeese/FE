'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CardAlbumQrcode from './CardAlbumQrcode';

interface ScreenAlbumQrcodeProps {
  albumId: string;
}

export default function ScreenAlbumQrcode({ albumId }: ScreenAlbumQrcodeProps) {
  const router = useRouter();

  return (
    <div className="drop-shadow-25-5 bg-element-primary-lightest relative min-h-screen bg-[url('/background/bg_qrcode.svg')] bg-contain bg-top bg-repeat-y">
      <button
        onClick={() => router.back()}
        type='button'
        className='absolute top-6 right-5'
      >
        <X width={24} height={24} color='var(--color-icon-basic)' />
      </button>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <CardAlbumQrcode albumId={albumId} />
      </div>
    </div>
  );
}
