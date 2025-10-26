import OpenAlbum from './album/OpenAlbum';
import ProfileMypage from './profile/ProfileMypage';

interface ScreenMainProps {}

export default function ScreenMain({}: ScreenMainProps) {
  return (
    <>
      <ProfileMypage />
      <OpenAlbum />
    </>
  );
}
