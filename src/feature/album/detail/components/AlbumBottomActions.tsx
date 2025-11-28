import DownloadActionBar from './DownloadActionBar';
import NavBarAlbumDetail from './NavBarAlbumDetail';
import { AlbumDetailMode } from './ScreenAlbumDetail';
import UploadButtonInDetail from './UploadButtonInDetail';

interface AlbumBottomActionsProps {
  mode: AlbumDetailMode;
  albumId: string;
  changeAlbumMode: (newMode: AlbumDetailMode) => void;
  selectedCount: number;
  totalPhotoCount?: number;
  isLoading: boolean;
}

export default function AlbumBottomActions({
  mode,
  albumId,
  changeAlbumMode,
  selectedCount,
  totalPhotoCount,
  isLoading,
}: AlbumBottomActionsProps) {
  if (isLoading) return null;

  if (!totalPhotoCount)
    return <UploadButtonInDetail buttonText='앨범 채우기' />;

  if (mode === 'default') {
    return <NavBarAlbumDetail albumId={albumId} />;
  }

  if (mode === 'select') {
    return (
      <DownloadActionBar
        albumId={albumId}
        selectedCount={selectedCount}
        changeAlbumMode={changeAlbumMode}
      />
    );
  }

  return null;
}
