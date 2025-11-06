'use client';
import { useEffect, useState } from 'react';
import ButtonMore from './ButtonMore';
import OpenAlbum from './OpenAlbum';
import ToggleAlbumType, { AlbumType } from './ToggleAlbumType';

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

// 실제 데이터라고 가정
const albums: OpenAlbumItem[] = [
  {
    author: '임민서',
    date: '2025.08.09',
    expirationTime: '2일 2시간',
    joinedMembers: 7,
    totalMembers: 8,
    title: '큐시즘 OT',
    thumbnails: [
      '/ut/1주차_1.jpg',
      '/ut/1주차_2.jpg',
      '/ut/1주차_3.jpg',
      '/ut/1주차_4.jpg',
    ],
    isMine: true,
  },
  {
    author: '이유정',
    date: '2025.08.16',
    expirationTime: '3일 12시간',
    joinedMembers: 7,
    totalMembers: 8,
    title: '집중협업세션',
    thumbnails: [
      '/ut/2주차_1.jpg',
      '/ut/2주차_2.jpg',
      '/ut/2주차_3.jpg',
      '/ut/2주차_4.jpg',
    ],
    isMine: false,
  },
  {
    author: '맹소현',
    date: '2025.08.23',
    expirationTime: '4일 2시간',
    joinedMembers: 7,
    totalMembers: 8,
    title: '큐시즘 UT',
    thumbnails: ['/ut/3주차_1.jpg', '/ut/3주차_2.jpg', '/ut/3주차_3.jpg'],
    isMine: false,
  },
  {
    author: '정윤서',
    date: '2025.08.30',
    expirationTime: '5일 2시간',
    joinedMembers: 7,
    totalMembers: 8,
    title: '파트별 상호 피드백',
    isMine: false,
  },
];

interface OpenAlbumContainerProps {}

export default function OpenAlbumContainer({}: OpenAlbumContainerProps) {
  const [albumType, setAlbumType] = useState<AlbumType>('all');
  const [visibleCount, setVisibleCount] = useState(2);

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
