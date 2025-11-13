'use client';
import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import ToggleAlbumType from '@/feature/main/components/open-album/ToggleAlbumType';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import Toast from '@/global/components/toast/Toast';
import { ArrowDownUp, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { PhotoSortType } from '../constants/photoSort';
import SelectPhotoSortType from './SelectPhotoSortType';

interface NavBarAlbumDetailProps {
  albumId: string;
  sortType: PhotoSortType;
  changeSortType: (newType: PhotoSortType) => void;
}

type AlbumType = 'all' | 'deep';

export default function NavBarAlbumDetail({
  albumId,
  changeSortType,
  sortType,
}: NavBarAlbumDetailProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [albumType, setAlbumType] = useState<AlbumType>('all');

  const handleToggleChange = (value: AlbumType) => {
    setAlbumType(value);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await handleFileUpload(e, albumId, router);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.alert(error.message);
      } else {
        Toast.alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <section className='fixed bottom-0 flex w-full items-center justify-between gap-3 bg-[linear-gradient(180deg,rgba(24,25,27,0)_0%,rgba(24,25,27,0.8)_60.1%)] px-4 py-5'>
      <BottomSheetModal
        trigger={
          <button
            type='button'
            className='bg-element-gray-light rounded-full p-2.5'
          >
            <ArrowDownUp
              width={24}
              height={24}
              color='var(--color-icon-basic)'
            />
          </button>
        }
      >
        <SelectPhotoSortType
          sort={sortType}
          onChange={(newType) => changeSortType(newType)}
        />
      </BottomSheetModal>

      <ToggleAlbumType
        onChange={handleToggleChange}
        value={albumType}
        labels={{ all: '전체', deep: '띱한 사진' }}
      />
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        onChange={onFileChange}
        className='hidden'
      />
      <button
        type='button'
        onClick={handleButtonClick}
        className='bg-element-gray-light rounded-full p-2.5'
      >
        <Plus width={24} height={24} color={'var(--color-icon-basic)'} />
      </button>
    </section>
  );
}
