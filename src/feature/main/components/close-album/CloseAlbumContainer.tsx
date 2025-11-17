'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import {
  useAlbumClosedInfiniteQuery,
  type AlbumClosedItem,
} from '../../hooks/useAlbumClosedInfiniteQuery';
import EmptyAlbum from '../EmptyAlbum';
import CloseAlbum from './CloseAlbum';

interface CloseAlbumListItem {
  code: string;
  title: string;
  date: string;
  author: string;
  images: string[];
}

const MAX_IMAGES = 4;
const LOADING_TEXT = '불러오는 중...';

export default function CloseAlbumContainer() {
  const { items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAlbumClosedInfiniteQuery();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const albums = useMemo(() => mapClosedAlbumItems(items), [items]);
  const showLoadingState = isLoading && albums.length === 0;
  const showEmptyState = !isLoading && albums.length === 0;

  useEffect(() => {
    if (!hasNextPage) return;
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '200px 0px',
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className='mb-20 px-5'>
      <Link href='#'>
        <h3 className='typo-heading-md-semibold text-text-subtle mb-4 flex items-center'>
          닫힌 앨범 {albums.length}
          {/* TODO : Link연동 전까지 화살표 주석 */}
          {/* <ChevronRight
            width={24}
            height={24}
            color='var(--color-icon-basic)'
          /> */}
        </h3>
      </Link>
      <div className='flex flex-col gap-4'>
        {showLoadingState && (
          <div className='typo-body-md-medium text-text-subtle bg-element-gray-light rounded-2xl py-10 text-center'>
            {LOADING_TEXT}
          </div>
        )}
        {!showLoadingState &&
          albums.map((album) => (
            <CloseAlbum
              key={album.code}
              title={album.title}
              date={album.date}
              author={album.author}
              images={album.images}
            />
          ))}
        {!showLoadingState && showEmptyState && (
          <EmptyAlbum title={`앨범이 일주일이 지나 닫히면\n여기에 표시돼요`} />
        )}
      </div>
      {isFetchingNextPage && (
        <div className='typo-body-sm-medium text-text-subtle py-4 text-center'>
          {LOADING_TEXT}
        </div>
      )}
      <div ref={loadMoreRef} />
    </section>
  );
}

function mapClosedAlbumItems(items: AlbumClosedItem[]): CloseAlbumListItem[] {
  return items.map((item) => ({
    code: item.code,
    title: item.title ?? '',
    date: formatEventDate(item.eventDate),
    author: item.makerName ?? '',
    images:
      item.thumbnails
        ?.filter((thumbnail): thumbnail is string => Boolean(thumbnail))
        ?.slice(0, MAX_IMAGES) ?? [],
  }));
}

function formatEventDate(date?: string) {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
