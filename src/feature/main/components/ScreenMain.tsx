import OpenAlbumContainer from './album/OpenAlbumContainer';
import ProfileMypage from './profile/ProfileMypage';

interface ScreenMainProps {}

export default function ScreenMain({}: ScreenMainProps) {
  return (
    <>
      <ProfileMypage />
      <OpenAlbumContainer />
    </>
  );
}
