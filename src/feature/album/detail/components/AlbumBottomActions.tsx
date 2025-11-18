import { PhotoSortType } from '../constants/photoSort';
import DownloadActionBar from './DownloadActionBar';
import NavBarAlbumDetail, { AlbumType } from './NavBarAlbumDetail';
import { AlbumDetailMode } from './ScreenAlbumDetail';
import UploadButtonInDetail from './UploadButtonInDetail';

interface AlbumBottomActionsProps {
  mode: AlbumDetailMode;
  albumId: string;
  sortType: PhotoSortType;
  changeSortType: (newType: PhotoSortType) => void;
  albumType: AlbumType;
  changeAlbumType: (newType: AlbumType) => void;
  changeAlbumMode: (newMode: AlbumDetailMode) => void;
  selectedCount: number;
  totalPhotoCount?: number;
  isLoading: boolean;
}

export default function AlbumBottomActions({
  mode,
  albumId,
  sortType,
  changeSortType,
  albumType,
  changeAlbumType,
  changeAlbumMode,
  selectedCount,
  totalPhotoCount,
  isLoading,
}: AlbumBottomActionsProps) {
  if (isLoading) return null;

  if (!totalPhotoCount)
    return <UploadButtonInDetail buttonText='앨범 채우기' />;

  if (mode === 'default') {
    return (
      <NavBarAlbumDetail
        albumId={albumId}
        sortType={sortType}
        changeSortType={changeSortType}
        albumType={albumType}
        changeAlbumType={changeAlbumType}
      />
    );
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
