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
    (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page) => {
          if (!page) return page;
          if (!page.responses) return page;

          return {
            ...page,
            responses: page.responses.map((res) => {
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
            }),
          };
        }),
      };
    },
  );
}
