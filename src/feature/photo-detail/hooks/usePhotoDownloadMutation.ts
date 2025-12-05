import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCacheAlbumPhotosDownload } from '../modules/updateCacheAlbumPhotosDownload';

const fetchData = async ({
  albumId,
  photoIds,
}: UsePhotoDownloadMutationProps) => {
  const response = await api.post<ApiReturns['photo.presignedDownload']>({
    path: EP.photo.presignedDownload(),
    body: { code: albumId, photoIds: photoIds },
  });

  return response.result;
};

interface UsePhotoDownloadMutationProps {
  albumId: string;
  photoIds: number[];
}

export function usePhotoDownloadMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ albumId, photoIds }: UsePhotoDownloadMutationProps) =>
      fetchData({ albumId, photoIds }),
    onSuccess: (_data, variables) => {
      const { albumId, photoIds } = variables;
      photoIds.forEach((photoId) =>
        updateCacheAlbumPhotosDownload({ albumId, photoId, queryClient }),
      );
    },
  });

  return mutation;
}
