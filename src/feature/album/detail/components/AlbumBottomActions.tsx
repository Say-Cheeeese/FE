import { PhotoSortType } from '../constants/photoSort';
import DownloadActionBar from './DownloadActionBar';
import NavBarAlbumDetail, { AlbumType } from './NavBarAlbumDetail';
import { AlbumDetailMode } from './ScreenAlbumDetail';

interface AlbumBottomActionsProps {
  hasPhotos: boolean;
  mode: AlbumDetailMode;
  albumId: string;
  sortType: PhotoSortType;
  changeSortType: (newType: PhotoSortType) => void;
  albumType: AlbumType;
  changeAlbumType: (newType: AlbumType) => void;
  changeAlbumMode: (newMode: AlbumDetailMode) => void;
  selectedCount: number;
}

export default function AlbumBottomActions({
  hasPhotos,
  mode,
  albumId,
  sortType,
  changeSortType,
  albumType,
  changeAlbumType,
  changeAlbumMode,
  selectedCount,
}: AlbumBottomActionsProps) {
  if (!hasPhotos) return null;

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
