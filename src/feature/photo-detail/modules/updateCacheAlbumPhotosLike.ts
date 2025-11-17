import { ApiReturns, EP } from '@/global/api/ep';
import { InfiniteData, QueryClient } from '@tanstack/react-query';

interface ToggleAlbumPhotoLikeInCacheParams {
  queryClient: QueryClient;
  albumId: string;
  photoId: number;
  isCurrentlyLiked: boolean;
}

export function updateCacheAlbumPhotosLike({
  queryClient,
  albumId,
  photoId,
  isCurrentlyLiked,
}: ToggleAlbumPhotoLikeInCacheParams) {
  queryClient.setQueriesData<InfiniteData<ApiReturns['album.photos']>>(
    { queryKey: [EP.album.photos(albumId)] },
    // TODO : any타입없애기
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (old: any) => {
      if (!old) return old;

      return {
        ...old,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pages: old.pages.map((page: any) => ({
          ...page,
          ...(page?.responses !== undefined && {
            responses:
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              page.responses?.map((res: any) => {
                if (res.photoId !== photoId) return res;

                const updated = { ...res };

                if (res.isLiked !== undefined) {
                  updated.isLiked = !res.isLiked;
                }

                if (res.likeCnt !== undefined) {
                  updated.likeCnt = isCurrentlyLiked
                    ? res.likeCnt - 1
                    : res.likeCnt + 1;
                }

                return updated;
              }) ?? page.responses,
          }),
        })),
      };
    },
  );
}
