import { ApiReturns, EP } from '@/global/api/ep';
import { InfiniteData, QueryClient } from '@tanstack/react-query';

interface UpdateCacheAlbumPhotosDownloadParams {
  queryClient: QueryClient;
  albumId: string;
  photoId: number;
}

export function updateCacheAlbumPhotosDownload({
  queryClient,
  albumId,
  photoId,
}: UpdateCacheAlbumPhotosDownloadParams) {
  queryClient.setQueriesData<InfiniteData<ApiReturns['album.photos']>>(
    { queryKey: [EP.album.photos(albumId)] },
    (old) => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page) => {
          if (!page || !page.responses) return page;

          return {
            ...page,
            responses: page.responses.map((res) =>
              res.photoId === photoId
                ? {
                    ...res,
                    isRecentlyDownloaded: true,
                    isDownloaded: true,
                  }
                : res,
            ),
          };
        }),
      };
    },
  );
}
