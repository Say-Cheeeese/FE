'use client';
import { useEffect, useState } from 'react';
import ButtonMore from './ButtonMore';
import OpenAlbum from './OpenAlbum';
import ToggleAlbumType, { AlbumType } from './ToggleAlbumType';

interface OpenAlbumContainerProps {}

interface OpenAlbumItem {
  author: string;
  date: string;
  expirationTime: string;
  joinedMembers: number;
  totalMembers: number;
  title: string;
  thumbnails?: string[];
  isMine: boolean;
}

export default function OpenAlbumContainer({}: OpenAlbumContainerProps) {
  const [albumType, setAlbumType] = useState<AlbumType>('all');
  const [visibleCount, setVisibleCount] = useState(2);

  // 실제 데이터라고 가정
  const albums: OpenAlbumItem[] = [
    {
      author: '맹소현',
      date: '2025.08.23',
      expirationTime: '3일 2시간',
      joinedMembers: 7,
      totalMembers: 8,
      title: '큐시즘 MT',
      thumbnails: [
        'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
        'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
        'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
      ],
      isMine: true,
    },
    {
      author: '맹소현',
      date: '2025.08.23',
      expirationTime: '3일 2시간',
      joinedMembers: 7,
      totalMembers: 8,
      title: '큐시즘 MT',
      thumbnails: [
        'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
        'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
      ],
      isMine: false,
    },
    {
      author: '맹소현',
      date: '2025.08.23',
      expirationTime: '3일 2시간',
      joinedMembers: 7,
      totalMembers: 8,
      title: '큐시즘 MT',
      thumbnails: [
        'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
      ],
      isMine: false,
    },
    {
      author: '맹소현',
      date: '2025.08.23',
      expirationTime: '3일 2시간',
      joinedMembers: 7,
      totalMembers: 8,
      title: '큐시즘 MT',
      isMine: false,
    },
  ];

  useEffect(() => {
    setVisibleCount(2);
  }, [albumType]);

  const filteredAlbums =
    albumType === 'mine' ? albums.filter((album) => album.isMine) : albums;
  const showing = filteredAlbums.slice(0, visibleCount);
  const moreCount = Math.max(filteredAlbums.length - visibleCount, 0);

  return (
    <section className='mb-16 px-5'>
      <h2 className='typo-heading-md-semibold pb-4'>
        열린 앨범 {filteredAlbums.length}
      </h2>
      <ToggleAlbumType
        value={albumType}
        onChange={(next) => setAlbumType(next)}
      />
      <div className='mb-5 flex flex-col gap-5'>
        {showing.map((album, idx) => (
          <OpenAlbum key={idx} {...album} />
        ))}
      </div>
      {/* 더 볼 게 있을 때만 버튼 보여주기 */}
      {moreCount > 0 && (
        <ButtonMore
          moreCount={moreCount}
          onClick={() => setVisibleCount(filteredAlbums.length)}
        />
      )}
    </section>
  );
}
