import PhotoBox from '@/global/components/photo/PhotoBox';
import { useRouter } from 'next/navigation';
import type { Photo } from '../api/getPhotoListByAlbumId.server';
import { AlbumDetailMode } from './ScreenAlbumDetail';

interface PhotoListProps {
  selectable?: boolean;
  onTogglePhoto?: (photoId: string) => void;
  selectedList: string[];
  changeMode: (newMode: AlbumDetailMode) => void;
  mode: AlbumDetailMode;
  photos: Photo[]; // 실제 사진 데이터
}

export default function PhotoList({
  selectable = false,
  onTogglePhoto,
  selectedList,
  changeMode,
  mode,
  photos,
}: PhotoListProps) {
  const router = useRouter();

  const handlePhotoPress = (photoId: string) => {
    if (!selectable) return;
    onTogglePhoto?.(photoId);
  };

  return (
    <section className='p-4'>
      <div className='mb-3 flex justify-between'>
        <span className='typo-body-lg-regular text-text-subtle'>
          총 {photos.length ?? 0}장
        </span>
        {mode === 'default' && (
          <button
            type='button'
            className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill rounded-lg px-3 py-1.5'
            onClick={() => changeMode('select')}
          >
            선택
          </button>
        )}
        {mode === 'select' && (
          <button
            type='button'
            className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill rounded-lg px-3 py-1.5'
            onClick={() => changeMode('default')}
          >
            취소
          </button>
        )}
      </div>
      <div className='grid grid-cols-3 gap-0.5'>
        {photos.map((photo) => (
          <PhotoBox
            key={photo.photoId}
            pressed={selectedList.includes(String(photo.photoId))}
            likeCount={photo.likesCnt}
            imageSrc={photo.thumbnailUrl}
            responsive
            onPress={() => {
              if (mode === 'default') {
                router.push(`/photo/${photo.photoId}`);
              } else {
                handlePhotoPress(String(photo.photoId));
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
