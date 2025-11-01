import BottomSheetModal from '@/global/components/modal/BottomSheetModal';

interface ScreenAlbumDetailProps {
  albumId: string;
}

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  return (
    <>
      <BottomSheetModal trigger={<button>btn</button>} showHandle={false}>
        123123
      </BottomSheetModal>
    </>
  );
}
