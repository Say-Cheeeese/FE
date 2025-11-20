'use client';
import EmptyAlbum from '@/feature/main/components/EmptyAlbum';
import { useAlbumClosedInfiniteQuery } from '@/feature/main/hooks/useAlbumClosedInfiniteQuery';
import CustomHeader from '@/global/components/header/CustomHeader';
import { useEffect, useMemo, useRef } from 'react';
import { buildClosedAlbumSections } from '../utils/buildClosedAlbumSections';
import ClosedAlbumSectionList from './ClosedAlbumSectionList';

const LOADING_TEXT = '불러오는 중...';

interface ScreenMainClosedAlbumProps {}

export default function ScreenMainClosedAlbum({}: ScreenMainClosedAlbumProps) {
  const { items, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAlbumClosedInfiniteQuery();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const sections = useMemo(() => buildClosedAlbumSections(items), [items]);
  const showLoadingState = isLoading && items.length === 0;
  const showEmptyState = !isLoading && items.length === 0;

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
      { rootMargin: '200px 0px' },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className='min-h-screen'>
      <CustomHeader title='닫힌 앨범' isShowBack />
      <main className='px-4 pt-6 pb-10'>
        {showLoadingState && (
          <div className='typo-body-md-medium text-text-subtle rounded-2xl bg-white py-10 text-center'>
            {LOADING_TEXT}
          </div>
        )}

        {!showLoadingState && showEmptyState && (
          <EmptyAlbum title={`앨범이 일주일이 지나 닫히면\n여기에 표시돼요`} />
        )}

        {!showLoadingState && <ClosedAlbumSectionList sections={sections} />}

        {isFetchingNextPage && (
          <div className='typo-body-sm-medium text-text-subtle py-4 text-center'>
            {LOADING_TEXT}
          </div>
        )}
        <div ref={loadMoreRef} />
      </main>
    </div>
  );
}
