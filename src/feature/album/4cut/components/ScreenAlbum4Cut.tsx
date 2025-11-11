'use client';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import PersonSvg from '@/global/svg/PersonSvg';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Container4Cut from './Container4Cut';

interface ScreenAlbum4CutProps {
  albumId: string;
}

export default function ScreenAlbum4Cut({ albumId }: ScreenAlbum4CutProps) {
  const router = useRouter();

  return (
    <>
      <CustomHeader
        isShowBack
        title='김수한무거북이와두루미삼천'
        rightContent={
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => router.push(`/album/detail/${albumId}/sidebar`)}
            >
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </button>
          </div>
        }
      />
      <section className='mt-8 flex flex-col items-center'>
        <div className='typo-body-lg-semibold mb-2'>현재 TOP 4 사진</div>
        <Container4Cut />
      </section>

      <div className='fixed bottom-5 flex w-full flex-col items-center px-4'>
        <div className='typo-body-sm-semibold flex items-center gap-2 pb-3'>
          <span>띱 진행상황</span>
          <div className='flex items-center'>
            <span className='p-[5px]'>
              <PersonSvg />
            </span>
            <span>7 / 8 명</span>
          </div>
        </div>
        <LongButton text='사진 확정하기' noFixed />
      </div>
    </>
  );
}
