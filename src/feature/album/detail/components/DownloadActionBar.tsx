import Toast from '@/global/components/toast/Toast';
import { shareImage } from '@/global/utils/image/shareImage';
import { useSelectedPhotosStore } from '@/store/useSelectedPhotosStore';
import { useShallow } from 'zustand/shallow';
import { AlbumDetailMode } from './ScreenAlbumDetail';

interface DownloadActionBarProps {
  albumId: string;
  selectedCount: number;
  changeAlbumMode: (newMode: AlbumDetailMode) => void;
}

export default function DownloadActionBar({
  albumId,
  selectedCount,
  changeAlbumMode,
}: DownloadActionBarProps) {
  const { selectedPhotos, clearSelectedPhotos } = useSelectedPhotosStore(
    useShallow((state) => ({
      selectedPhotos: state.selectedPhotos,
      clearSelectedPhotos: state.clearSelectedPhotos,
    })),
  );

  const handleDownload = async () => {
    if (selectedCount === 0) return;

    const photoUrls = selectedPhotos.map((photo) => photo.url);
    await shareImage({
      imageUrls: photoUrls,
      onSuccess: () => {
        changeAlbumMode('default');
        clearSelectedPhotos();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: () => {
        Toast.alert('사진을 준비하는 중 오류가 발생했습니다.');
      },
    });
  };

  const isDisabled = selectedCount === 0;

  return (
    <section className='bg-background-dim-darkest fixed bottom-0 flex h-18 w-full items-center justify-between gap-3 px-4'>
      <div className='typo-heading-sm-semibold text-white'>
        {selectedCount}장의 사진이 선택됨
      </div>
      <button
        type='button'
        className='typo-body-sm-medium text-text-primary bg-button-primary-fill disabled:bg-button-disabled-fill disabled:text-text-disabled rounded-[4px] px-3 py-1.5'
        disabled={isDisabled}
        onClick={handleDownload}
      >
        다운로드
      </button>
    </section>
  );
}
