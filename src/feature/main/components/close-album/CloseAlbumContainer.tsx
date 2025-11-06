import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import EmptyAlbum from '../EmptyAlbum';
import CloseAlbum from './CloseAlbum';

interface CloseAlbumData {
  title: string;
  date: string;
  author: string;
  images: string[];
}

const closeAlbums: CloseAlbumData[] = [
  {
    title: '큐시즘 OT',
    date: '2025.08.09',
    author: '임민서',
    images: [
      '/ut/1주차_1.jpg',
      '/ut/1주차_2.jpg',
      '/ut/1주차_3.jpg',
      '/ut/1주차_4.jpg',
    ],
  },
];

export default function CloseAlbumContainer() {
  return (
    <section className='mb-20 px-5'>
      <Link href='/'>
        <h3 className='typo-heading-md-semibold text-text-subtle mb-4 flex items-center'>
          닫힌 앨범 {closeAlbums.length}
          <ChevronRight
            width={24}
            height={24}
            color='var(--color-icon-basic)'
          />
        </h3>
      </Link>
      <div className='flex flex-col gap-4'>
        {closeAlbums.length < 0 ? (
          closeAlbums.map((album, index) => (
            <CloseAlbum
              key={index}
              title={album.title}
              date={album.date}
              author={album.author}
              images={album.images}
            />
          ))
        ) : (
          <EmptyAlbum title={`앨범이 일주일이 지나 닫히면\n여기에 표시돼요`} />
        )}
      </div>
    </section>
  );
}
