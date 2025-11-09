'use client';
import { useEffect, useState } from 'react';
import EmptyAlbum from '../EmptyAlbum';
import ButtonMore from './ButtonMore';
import OpenAlbum from './OpenAlbum';
import ToggleAlbumType from './ToggleAlbumType';

type AlbumType = 'all' | 'mine';

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
  // {
  //   author: '이유정',
  //   date: '2025.09.20',
  //   expirationTime: '6일 2시간',
  //   joinedMembers: 7,
  //   totalMembers: 8,
  //   title: '큐시즘 MT',
  //   thumbnails: ['/ut/1.jpg', '/ut/2.jpg', '/ut/3.jpg'],
  //   isMine: false,
  // },

  {
    author: '맹소현',
    date: '2025.08.23',
    expirationTime: '4일 2시간',
    joinedMembers: 7,
    totalMembers: 8,
    title: '큐시즘 UT',
    thumbnails: ['/ut/3주차_1.jpg', '/ut/3주차_2.jpg', '/ut/3주차_3.jpg'],
    isMine: true,
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
  {
    author: '김건우',
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
        열린 앨범 {albums.length}
      </h2>
      <ToggleAlbumType
        value={albumType}
        labels={{ all: '전체', mine: '내가 만든 앨범' }}
        onChange={(next) => setAlbumType(next)}
      />
      <div className='mb-5 flex flex-col gap-5'>
        {showing.length > 0 ? (
          showing.map((album, idx) => <OpenAlbum key={idx} {...album} />)
        ) : (
          <EmptyAlbum
            title={
              albumType === 'all'
                ? `지금 열려 있는 앨범이 없어요`
                : '아직 내가 만든 앨범이 없어요\n앨범을 만들어보세요'
            }
          />
        )}
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
