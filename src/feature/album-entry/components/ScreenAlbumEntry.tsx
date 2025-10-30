import LogoHeader from '@/global/components/header/LogoHeader';
import FullSizeLetter from './FullSizeLetter';

export default function ScreenAlbumEntry() {
  return (
    <main className='bg-background-brand relative min-h-screen overflow-hidden'>
      <LogoHeader bgColor='var(--color-background-brand)' />

      <div
        className='absolute inset-0 z-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/assets/album/bg-album-entry.png')" }}
      />

      <FullSizeLetter />
    </main>
  );
}
