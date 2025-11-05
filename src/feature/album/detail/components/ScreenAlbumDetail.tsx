import CustomHeader from '@/global/components/header/CustomHeader';
import { ArrowDownUp, Menu } from 'lucide-react';

interface ScreenAlbumDetailProps {}

export default function ScreenAlbumDetail({}: ScreenAlbumDetailProps) {
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
    </>
  );
}
