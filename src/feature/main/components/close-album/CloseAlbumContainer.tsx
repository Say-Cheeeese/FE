import { ChevronRight } from 'lucide-react';
import CloseAlbum from './CloseAlbum';
import Link from 'next/link';

interface CloseAlbumContainerProps {}

export default function CloseAlbumContainer({}: CloseAlbumContainerProps) {
  return (
    <section className='mb-10 px-5'>
      {/* TODO : 링크주소 변경 필요 */}
      <Link href='/'>
        <h3 className='text-heading-md-semibold text-text-subtle mb-4 flex items-center'>
          닫힌 앨범 4{' '}
          <ChevronRight
            width={24}
            height={24}
            color='var(--color-icon-basic)'
          />
        </h3>
      </Link>
      <div className='flex flex-col gap-4'>
        <CloseAlbum
          title='큐시즘 MT'
          date='2025.08.23'
          author='맹소현'
          images={[
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba',
            'https://images.unsplash.com/photo-1506765515384-028b60a970df',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
          ]}
        />
        <CloseAlbum
          title='큐시즘 MT'
          date='2025.08.23'
          author='맹소현'
          images={[
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba',
            'https://images.unsplash.com/photo-1506765515384-028b60a970df',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
          ]}
        />
        <CloseAlbum
          title='큐시즘 MT'
          date='2025.08.23'
          author='맹소현'
          images={[
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba',
            'https://images.unsplash.com/photo-1506765515384-028b60a970df',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
          ]}
        />
        <CloseAlbum
          title='큐시즘 MT'
          date='2025.08.23'
          author='맹소현'
          images={[
            'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba',
            'https://images.unsplash.com/photo-1506765515384-028b60a970df',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
          ]}
        />
      </div>
    </section>
  );
}
