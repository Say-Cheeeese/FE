'use client';
import { handleFileUpload } from '@/feature/create-album/utils/handleFileUpload';
import ToggleAlbumType from '@/feature/main/components/open-album/ToggleAlbumType';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import Toast from '@/global/components/toast/Toast';
import { useAlbumSortStore } from '@/store/useAlbumSortStore';
import { useAlbumTypeStore } from '@/store/useAlbumTypeStore';
import { ArrowDownUp, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import SelectPhotoSortType from './SelectPhotoSortType';

export type AlbumType = 'all' | 'deep';

interface NavBarAlbumDetailProps {
  albumId: string;
}

export default function NavBarAlbumDetail({ albumId }: NavBarAlbumDetailProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sortType, setSortType } = useAlbumSortStore(
    useShallow((state) => ({
      sortType: state.sortType,
      setSortType: state.setSortType,
    })),
  );
  const { albumType, setAlbumType } = useAlbumTypeStore(
    useShallow((state) => ({
      albumType: state.albumType,
      setAlbumType: state.setAlbumType,
    })),
  );

  const handleToggleChange = (value: AlbumType): void => {
    setAlbumType(value);
  };

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    try {
      const result = await handleFileUpload(e, albumId, router, {
        stay: true,
      });
      const success = result?.success ?? 0;

      if (success) {
        setTimeout(
          () => Toast.check(`총 ${success}장을 앨범에 채웠어요.`),
          2000,
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.alert(error.message);
      } else {
        Toast.alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <section className='fixed bottom-0 z-40 flex w-full max-w-[430px] items-center justify-between gap-3 bg-[linear-gradient(180deg,rgba(24,25,27,0)_0%,rgba(24,25,27,0.8)_60.1%)] px-4 py-5'>
      <BottomSheetModal
        trigger={
          <button
            type='button'
            className='bg-element-gray-light rounded-full p-2.5'
            aria-label='사진 정렬'
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
          onChange={(newType) => setSortType(newType)}
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
        aria-label='사진 추가'
      >
        <Plus width={24} height={24} color={'var(--color-icon-basic)'} />
      </button>
    </section>
  );
}
