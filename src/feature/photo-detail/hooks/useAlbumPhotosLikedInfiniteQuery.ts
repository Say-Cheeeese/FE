import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

interface FetchPageParams {
  code: string;
  pageParam: number;
  /** 페이지 사이즈 (기본 20) */
  size: number;
}

const fetchAlbumPhotosPage = async ({
  code,
  pageParam,
  size,
}: FetchPageParams): Promise<
  ApiReturns['album.likedPhotos'] & { page: number }
> => {
  const res = await api.get<ApiReturns['album.likedPhotos']>({
    path: EP.album.likedPhotos(code),
    params: { page: pageParam, size },
  });

  return { ...res.result, page: pageParam };
};

interface UseAlbumPhotosLikedInfiniteQueryProps {
  code: string;
  size?: number;
  enabled?: boolean;
}

export function useAlbumPhotosLikedInfiniteQuery({
  code,
  size = 20,
  enabled = true,
}: UseAlbumPhotosLikedInfiniteQueryProps) {
  const query = useInfiniteQuery({
    queryKey: [EP.album.likedPhotos(code), size],
    initialPageParam: 0,
    enabled: enabled && !!code,
    queryFn: ({ pageParam }) => fetchAlbumPhotosPage({ code, pageParam, size }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });

  const items = query.data?.pages.flatMap((p) => p.responses ?? []) ?? [];

  return {
    ...query,
    items,
  };
}
