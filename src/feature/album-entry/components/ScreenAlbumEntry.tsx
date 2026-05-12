import LogoHeader from '@/global/components/header/LogoHeader';
import FullSizeLetter from './FullSizeLetter';
import LetterContent from './LetterContent';

interface ScreenAlbumEntryProps {
  albumId: string;
}

export default function ScreenAlbumEntry({ albumId }: ScreenAlbumEntryProps) {
  return (
    <main
      className='bg-background-brand flex min-h-screen flex-col overflow-hidden bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: "url('/assets/album/bg-album-entry.png')" }}
    >
      <LogoHeader bgColor='var(--color-background-brand)' />

      <div className='flex flex-1 flex-col items-center px-[34px] pt-[48px] pb-[29px]'>
        <div className='flex min-h-[508px] w-[325px] flex-1 flex-col overflow-hidden rounded-[20px] bg-white shadow-[0px_0px_25px_5px_rgba(0,0,0,0.08)]'>
          <LetterContent albumId={albumId} />
        </div>
      </div>
    </main>
  );
}
