import LogoHeader from '@/global/components/LogoHeader';
import FullSizeLetter from './FullSizeLetter';

export default function ScreenAlbumEntry() {
  return (
    <main className='bg-background-brand relative min-h-screen overflow-hidden'>
      {/* PNG 배경 */}
      <div
        className='absolute inset-0 z-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: "url('/assets/album/bg-album-entry.png')",
        }}
      />

      {/* 상단 로고 */}
      <LogoHeader />

      {/* 편지지 */}
      <div className='border-border-primary-lighter relative z-15 mx-9 mt-12 h-[1000px] rounded-[20px] border bg-white'>
        편지지
      </div>

      <FullSizeLetter />
    </main>
  );
}
