import CustomHeader from '@/global/components/header/CustomHeader';
import { ArrowDownUp, Menu } from 'lucide-react';
import AlbumInfos from './AlbumInfos';
import PhotoList from './PhotoList';

interface ScreenAlbumDetailProps {
  albumId: string;
}

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  return (
    <>
      <CustomHeader
        isShowBack
        title=''
        rightContent={
          <div className='flex gap-4'>
            <button type='button'>
              <ArrowDownUp
                width={24}
                height={24}
                color='var(--color-icon-basic)'
              />
            </button>
            <button type='button'>
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </button>
          </div>
        }
      />
      <div className='flex flex-col'>
        <AlbumInfos />
        <PhotoList />
      </div>
    </>
  );
}
