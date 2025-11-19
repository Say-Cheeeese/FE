import { PhotoListResponseSchema } from '@/global/api/ep';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import NoPhotoBody from './NoPhotoBody';
import PhotoList from './PhotoList';
import { AlbumDetailMode } from './ScreenAlbumDetail';

interface AlbumPhotoSectionProps {
  isLoading: boolean;
  photos: PhotoListResponseSchema[];
  selectionResetKey: number;
  albumId: string;
  mode: AlbumDetailMode;
  selectedPhotoIds: number[];
  onTogglePhoto: (photoId: number) => void;
  onChangeMode: (mode: AlbumDetailMode) => void;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  totalPhotoCount?: number;
}

export default function AlbumPhotoSection({
  isLoading,
  photos,
  selectionResetKey,
  albumId,
  mode,
  selectedPhotoIds,
  onTogglePhoto,
  onChangeMode,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  totalPhotoCount,
}: AlbumPhotoSectionProps) {
  if (isLoading) return null;

  if (photos.length === 0) {
    return <NoPhotoBody />;
  }

  return (
    <PhotoList
      key={selectionResetKey}
      albumId={albumId}
      selectable={mode === 'select'}
      onTogglePhoto={onTogglePhoto}
      selectedList={selectedPhotoIds}
      mode={mode}
      changeMode={onChangeMode}
      photos={photos}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      totalPhotoCount={totalPhotoCount}
    />
  );
}
