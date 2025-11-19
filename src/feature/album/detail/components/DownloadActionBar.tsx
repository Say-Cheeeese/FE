import { usePhotoDownloadMutation } from '@/feature/photo-detail/hooks/usePhotoDownloadMutation';
import { shareViaNavigator } from '@/global/utils/shareNavigator';
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
  const { mutateAsync } = usePhotoDownloadMutation();
  const { selectedPhotos, clearSelectedPhotos } = useSelectedPhotosStore(
    useShallow((state) => ({
      selectedPhotos: state.selectedPhotos,
      clearSelectedPhotos: state.clearSelectedPhotos,
    })),
  );

  const handleDownload = async () => {
    if (selectedCount === 0) return;

    try {
      const photoUrls = selectedPhotos.map((photo) => photo.url);

      if (photoUrls.length > 0) {
        const files = await Promise.all(
          photoUrls.map(async (photoUrl, index) => {
            const response = await fetch(photoUrl);
            if (!response.ok) {
              throw new Error('사진 파일을 불러오지 못했습니다.');
            }
            const blob = await response.blob();
            return new File([blob], `${index}`, {
              type: blob.type || 'image/png',
            });
          }),
        );

        await shareViaNavigator({
          data: {
            files,
            title: '선택한 사진을 공유해요',
            text: '치즈 앨범에서 선택한 사진들입니다.',
          },
          errorMessage: '사진 공유에 실패했습니다. 다시 시도해주세요.',
          fileNotSupportedMessage:
            '이 브라우저는 선택한 사진의 공유를 지원하지 않습니다.',
        });
      }
    } catch (error) {
      console.error('Failed to share downloaded photos:', error);
    }

    changeAlbumMode('default');
    clearSelectedPhotos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
