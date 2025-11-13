import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface FetchPageParams {
  code: string;
  pageParam: number;
  /** 페이지 사이즈 (기본 20) */
  size: number;
  /** API가 받는 정렬 형식: 예) 'CREATED_AT' */
  sorting: string;
}

async function fetchAlbumPhotosPage({
  code,
  pageParam,
  size,
  sorting,
}: FetchPageParams): Promise<ApiReturns['album.photos'] & { page: number }> {
  const res = await api.get<ApiReturns['album.photos']>({
    path: EP.album.photos(code),
    params: { page: pageParam, size, sorting },
  });

  return { ...res.result, page: pageParam };
}

interface UseAlbumPhotosInfiniteQueryProps {
  code: string;
  size?: number;
  sorting?: string;
}

export function useAlbumPhotosInfiniteQuery({
  code,
  size = 20,
  sorting = 'CREATED_AT',
}: UseAlbumPhotosInfiniteQueryProps) {
  const query = useInfiniteQuery({
    queryKey: [EP.album.photos(code), size, sorting],
    initialPageParam: 0,
    enabled: !!code,
    queryFn: ({ pageParam }) =>
      fetchAlbumPhotosPage({ code, pageParam, size, sorting }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });

  const items = query.data?.pages.flatMap((p) => p.responses ?? []) ?? [];

  const thumbnails = items.map((it) => it.thumbnailUrl);

  return {
    ...query,
    items,
    thumbnails,
  };
}
