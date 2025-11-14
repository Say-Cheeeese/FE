import PhotoBox from '@/global/components/photo/PhotoBox';
import { buildQuery } from '@/global/utils/buildQuery';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import type { Photo } from '../api/getPhotoListByAlbumId.server';
import { AlbumDetailMode } from './ScreenAlbumDetail';

const SELECT_MODE_MIN_HEIGHT = '800px';

export const ID_PHOTO_LIST = 'photo-list';
export const ID_PHOTO_LIST_ANCHOR = 'photo-list-anchor';

interface PhotoListProps {
  albumId: string;
  selectable?: boolean;
  onTogglePhoto?: (photoId: string) => void;
  selectedList: string[];
  changeMode: (newMode: AlbumDetailMode) => void;
  mode: AlbumDetailMode;
  photos: Photo[]; // 실제 사진 데이터
}

export default function PhotoList({
  albumId,
  selectable = false,
  onTogglePhoto,
  selectedList,
  changeMode,
  mode,
  photos,
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
            key={photo.photoId}
            pressed={selectedList.includes(String(photo.photoId))}
            likeCount={photo.likesCnt}
            imageSrc={photo.thumbnailUrl}
            responsive
            onPress={() => {
              if (mode === 'default') {
                router.push(
                  `/photo/detail/${albumId}${buildQuery({ photoId: photo.photoId })}`,
                );
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
