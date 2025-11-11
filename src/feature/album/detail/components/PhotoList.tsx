import PhotoBox from '@/global/components/photo/PhotoBox';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { AlbumDetailMode } from './ScreenAlbumDetail';

// TODO : Mock Dat로 api연동되면 삭제예정
const photos = [
  {
    id: 'photo-1',
    imageSrc: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
  },
  {
    id: 'photo-2',
    imageSrc: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
  },
  {
    id: 'photo-3',
    imageSrc: 'https://images.unsplash.com/photo-1506765515384-028b60a970df',
  },
  {
    id: 'photo-4',
    imageSrc: 'https://images.unsplash.com/photo-1438109491414-7198515b166b',
  },
  {
    id: 'photo-5',
    imageSrc: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf',
  },
  {
    id: 'photo-6',
    imageSrc: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
  },
  {
    id: 'photo-7',
    imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
];

const SELECT_MODE_MIN_HEIGHT = '800px';

export const ID_PHOTO_LIST = 'photo-list';
export const ID_PHOTO_LIST_ANCHOR = 'photo-list-anchor';

interface PhotoListProps {
  selectable?: boolean;
  onTogglePhoto?: (photoId: string) => void;
  selectedList: string[];
  changeMode: (newMode: AlbumDetailMode) => void;
  mode: AlbumDetailMode;
}

export default function PhotoList({
  selectable = false,
  onTogglePhoto,
  selectedList,
  changeMode,
  mode,
}: PhotoListProps) {
  const router = useRouter();

  const photoListRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handlePhotoPress = (photoId: string) => {
    if (!selectable) return;
    onTogglePhoto?.(photoId);
  };

  const handleChangeMode = (nextMode: AlbumDetailMode) => {
    const photoListEl = photoListRef.current;
    const anchorEl = anchorRef.current;

    if (nextMode === 'select') {
      if (photoListEl) {
        photoListEl.style.minHeight = SELECT_MODE_MIN_HEIGHT;
      }

      if (anchorEl) {
        anchorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // behavior:smooth동작 끝나면 min-height 원복
      setTimeout(() => {
        if (photoListEl) {
          photoListEl.style.minHeight = '';
        }
      }, 300);
    }

    changeMode(nextMode);
  };

  return (
    <section ref={photoListRef} className='relative p-4'>
      <div ref={anchorRef} className='invisible absolute top-[-72px] left-0' />
      <div className='mb-3 flex justify-between'>
        <span className='typo-body-lg-regular text-text-subtle'>
          총 {photos.length ?? 0}장
        </span>
        {mode === 'default' && (
          <button
            type='button'
            className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill rounded-[4px] px-3 py-1.5'
            onClick={() => handleChangeMode('select')}
          >
            선택
          </button>
        )}
        {mode === 'select' && (
          <button
            type='button'
            className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill rounded-[4px] px-3 py-1.5'
            onClick={() => handleChangeMode('default')}
          >
            취소
          </button>
        )}
      </div>
      <div className='grid grid-cols-3 gap-0.5'>
        {photos.map((photo) => (
          <PhotoBox
            key={photo.id}
            pressed={selectedList.includes(photo.id)}
            likeCount={0}
            imageSrc={photo.imageSrc}
            responsive
            onPress={() => {
              if (mode === 'default') {
                router.push('/photo/ID바꿔야함');
              } else {
                handlePhotoPress(photo.id);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}
