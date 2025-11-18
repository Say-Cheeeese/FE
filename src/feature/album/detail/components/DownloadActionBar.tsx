import { usePhotoDownloadMutation } from '@/feature/photo-detail/hooks/usePhotoDownloadMutation';
import { useSelectedPhotosStore } from '@/store/useSelectedPhotosStore';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { mutateAsync } = usePhotoDownloadMutation();
  const { selectedPhotoIds, clearSelectedPhotos } = useSelectedPhotosStore(
    useShallow((state) => ({
      selectedPhotoIds: state.selectedPhotoIds,
      clearSelectedPhotos: state.clearSelectedPhotos,
    })),
  );

  const handleDownload = async () => {
    if (selectedCount === 0) return;

    const res = await mutateAsync({ albumId, photoIds: selectedPhotoIds });

    res?.downloadFiles.forEach(({ downloadUrl, fileName }) => {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

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
        className='typo-body-sm-medium text-text-primary bg-button-primary-fill rounded-[4px] px-3 py-1.5 disabled:opacity-40'
        disabled={isDisabled}
        onClick={handleDownload}
      >
        다운로드
      </button>
    </section>
  );
}
