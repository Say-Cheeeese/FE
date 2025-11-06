'use client';
import ToggleAlbumType from '@/feature/main/components/open-album/ToggleAlbumType';
import { Download, Plus } from 'lucide-react';

interface FooterAlbumDetailProps {}

export default function FooterAlbumDetail({}: FooterAlbumDetailProps) {
  return (
    <section className='fixed bottom-0 flex w-full items-center justify-between px-4 pb-5'>
      <button
        type='button'
        className='bg-element-gray-light rounded-full p-2.5'
      >
        <Plus width={24} height={24} color={'var(--color-icon-basic)'} />
      </button>
      <ToggleAlbumType
        onChange={() => {}}
        value={'all'}
        labels={{ all: '전체', deep: '띱한 사진' }}
      />
      <button
        type='button'
        className='bg-element-gray-light rounded-full p-2.5'
      >
        <Download width={24} height={24} color={'var(--color-icon-basic)'} />
      </button>
    </section>
  );
}
