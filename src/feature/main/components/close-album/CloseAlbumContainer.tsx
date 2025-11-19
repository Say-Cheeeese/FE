'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { useAlbumClosedInfiniteQuery } from '../../hooks/useAlbumClosedInfiniteQuery';
import { mapClosedAlbumItems } from '../../utils/mapClosedAlbumItems';
import EmptyAlbum from '../EmptyAlbum';
import CloseAlbum from './CloseAlbum';

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
      {albums.length > 0 ? (
        <Link href='/main/closed-album'>
          <h3 className='typo-heading-md-semibold text-text-subtle mb-4 flex items-center'>
            닫힌 앨범 {albums.length}
            <ChevronRight
              width={24}
              height={24}
              color='var(--color-icon-basic)'
            />
          </h3>
        </Link>
      ) : (
        <h3 className='typo-heading-md-semibold text-text-subtle mb-4'>
          닫힌 앨범 0
        </h3>
      )}
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
              code={album.code}
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
