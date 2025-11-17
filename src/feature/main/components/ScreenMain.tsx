'use client';
import LogoHeader from '@/global/components/header/LogoHeader';
import LongButton from '@/global/components/LongButton';
import { useRouter } from 'next/navigation';
import CloseAlbumContainer from './close-album/CloseAlbumContainer';
import OpenAlbumContainer from './open-album/OpenAlbumContainer';
import ProfileMypage from './profile/ProfileMypage';

interface ScreenMainProps {}

export default function ScreenMain({}: ScreenMainProps) {
  const router = useRouter();

  return (
    <main className=''>
      <LogoHeader />
      <ProfileMypage />
      <OpenAlbumContainer />
      <CloseAlbumContainer />
      <div className='sticky bottom-0 z-50 bg-white/80 px-5 pb-[calc(20px+env(safe-area-inset-bottom))]'>
        <LongButton
          text='앨범 만들기'
          onClick={() => router.push('/create-album')}
        />
      </div>
    </main>
  );
}
