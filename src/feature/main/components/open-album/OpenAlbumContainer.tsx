'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAlbumOpenInfiniteQuery,
  type AlbumOpenType,
} from '../../hooks/useAlbumOpenInfiniteQuery';
import { mapOpenAlbumItems } from '../../utils/mapOpenAlbumItems';
import EmptyAlbum from '../EmptyAlbum';
import ButtonMore from './ButtonMore';
import OpenAlbum from './OpenAlbum';
import ToggleAlbumType from './ToggleAlbumType';

const MIN_VISIBLE_COUNT = 2;
const LOADING_TEXT = '불러오는 중...';

interface OpenAlbumContainerProps {}

export default function OpenAlbumContainer({}: OpenAlbumContainerProps) {
  const [albumType, setAlbumType] = useState<AlbumOpenType>('all');
  const [isMoreOpened, setIsMoreOpened] = useState(false);
  const [hasOpenedMine, setHasOpenedMine] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (albumType === 'mine' && !hasOpenedMine) {
      setHasOpenedMine(true);
    }
  }, [albumType, hasOpenedMine]);

  useEffect(() => {
    setIsMoreOpened(false);
  }, [albumType]);

  const allQuery = useAlbumOpenInfiniteQuery({ type: 'all' });
  const mineQuery = useAlbumOpenInfiniteQuery({
    type: 'mine',
    enabled: albumType === 'mine' || hasOpenedMine,
  });

  const activeQuery = albumType === 'all' ? allQuery : mineQuery;
  const {
    items: activeItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = activeQuery;

  const albums = useMemo(() => mapOpenAlbumItems(activeItems), [activeItems]);
  const showing = isMoreOpened ? albums : albums.slice(0, MIN_VISIBLE_COUNT);
  const moreCount = Math.max(albums.length - MIN_VISIBLE_COUNT, 0);
  const showMoreButton = !isMoreOpened && moreCount > 0;
  const showLoadingState = isLoading && albums.length === 0;
  const showEmptyState = !isLoading && albums.length === 0;

  useEffect(() => {
    if (!isMoreOpened) return;
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isMoreOpened]);

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
      <div className='mt-3 mb-5 flex flex-col gap-5'>
        {!showLoadingState &&
          showing.map((album) => <OpenAlbum key={album.code} {...album} />)}
        {!showLoadingState && showEmptyState && (
          <EmptyAlbum
            title={
              albumType === 'all'
                ? `지금 열려 있는 앨범이 없어요`
                : '아직 내가 만든 앨범이 없어요\n앨범을 만들어보세요'
            }
          />
        )}
      </div>
      {showMoreButton && (
        <ButtonMore
          moreCount={moreCount}
          onClick={() => setIsMoreOpened(true)}
        />
      )}
      {isMoreOpened && isFetchingNextPage && (
        <div className='typo-body-sm-medium text-text-subtle py-4 text-center'>
          {LOADING_TEXT}
        </div>
      )}
      <div ref={loadMoreRef} />
    </section>
  );
}
