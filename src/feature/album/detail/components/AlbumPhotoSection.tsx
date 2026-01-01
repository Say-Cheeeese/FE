import { PhotoListResponseSchema } from '@/global/api/ep';
import Spinner from '@/global/components/Spinner';
import { useAlbumTypeStore } from '@/store/useAlbumTypeStore';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useShallow } from 'zustand/shallow';
import NoPhotoBody from './NoPhotoBody';
import PhotoList from './PhotoList';
import { AlbumDetailMode } from './ScreenAlbumDetail';

interface AlbumPhotoSectionProps {
  isLoading: boolean;
  photos: PhotoListResponseSchema[];
  selectionResetKey: number;
  albumId: string;
  mode: AlbumDetailMode;
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
  onChangeMode,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  totalPhotoCount,
}: AlbumPhotoSectionProps) {
  const { albumType } = useAlbumTypeStore(
    useShallow((state) => ({
      albumType: state.albumType,
      setAlbumType: state.setAlbumType,
    })),
  );

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (photos.length === 0) {
    return (
      <NoPhotoBody
        text={
          albumType === 'all'
            ? '앨범에 아직 사진이 없어요'
            : '아직 띱한 사진이 없어요'
        }
        isRefresh={albumType === 'all'}
      />
    );
  }

  return (
    <PhotoList
      key={selectionResetKey}
      albumId={albumId}
      selectable={mode === 'select'}
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
