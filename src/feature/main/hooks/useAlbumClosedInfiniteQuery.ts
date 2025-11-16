import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

type AlbumClosedPage = NonNullable<ApiReturns['album.albumClosed']>;
type AlbumClosedItem = AlbumClosedPage['responses'][number];

interface FetchPageParams {
  pageParam: number;
  /** 페이지 사이즈 (기본 20) */
  size: number;
}

const fetchData = async ({
  pageParam,
  size,
}: FetchPageParams): Promise<AlbumClosedPage & { page: number }> => {
  const res = await api.get<ApiReturns['album.albumClosed']>({
    path: EP.album.albumClosed(),
    params: { page: pageParam, size },
  });

  const result: AlbumClosedPage = res.result ?? createEmptyPage({ pageParam });

  return { ...result, page: pageParam };
};

const createEmptyPage = ({
  pageParam,
}: {
  pageParam: number;
}): AlbumClosedPage => ({
  responses: [],
  listSize: 0,
  isFirst: pageParam === 0,
  isLast: true,
  hasNext: false,
});

interface UseAlbumClosedInfiniteQueryProps {
  size?: number;
  enabled?: boolean;
}

export function useAlbumClosedInfiniteQuery({
  size = 20,
  enabled = true,
}: UseAlbumClosedInfiniteQueryProps = {}) {
  const query = useInfiniteQuery({
    queryKey: [EP.album.albumClosed(), size],
    initialPageParam: 0,
    enabled: enabled,
    queryFn: ({ pageParam }) => fetchData({ pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });

  const items: AlbumClosedItem[] =
    query.data?.pages.flatMap((p) => p.responses ?? []) ?? [];

  return {
    ...query,
    items,
  };
}
