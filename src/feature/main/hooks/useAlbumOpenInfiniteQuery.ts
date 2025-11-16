import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

type AlbumOpenType = 'all' | 'mine';
type AlbumOpenPage = NonNullable<ApiReturns['album.albumOpen']>;
type AlbumOpenItem = AlbumOpenPage['responses'][number];

interface FetchPageParams {
  pageParam: number;
  /** 페이지 사이즈 (기본 20) */
  size: number;
  path: string;
}

const fetchData = async ({
  pageParam,
  size,
  path,
}: FetchPageParams): Promise<AlbumOpenPage & { page: number }> => {
  const res = await api.get<ApiReturns['album.albumOpen']>({
    path,
    params: { page: pageParam, size },
  });

  const result: AlbumOpenPage = res.result ?? createEmptyPage({ pageParam });

  return { ...result, page: pageParam };
};

const createEmptyPage = ({
  pageParam,
}: {
  pageParam: number;
}): AlbumOpenPage => ({
  responses: [],
  listSize: 0,
  isFirst: pageParam === 0,
  isLast: true,
  hasNext: false,
});

interface UseAlbumOpenInfiniteQueryProps {
  size?: number;
  enabled?: boolean;
  type?: AlbumOpenType;
}

export function useAlbumOpenInfiniteQuery({
  size = 20,
  enabled = true,
  type = 'all',
}: UseAlbumOpenInfiniteQueryProps = {}) {
  const path = type === 'mine' ? EP.album.albumOpenMe() : EP.album.albumOpen();
  const query = useInfiniteQuery({
    queryKey: ['album-open', path, size],
    initialPageParam: 0,
    enabled: enabled,
    queryFn: ({ pageParam }) => fetchData({ pageParam, size, path }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });

  const items: AlbumOpenItem[] =
    query.data?.pages.flatMap((p) => p.responses ?? []) ?? [];

  return {
    type,
    ...query,
    items,
  };
}

export type { AlbumOpenType, AlbumOpenItem };
