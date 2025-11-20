import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

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
  const mutation = useMutation({
    mutationFn: ({ albumId, photoIds }: UsePhotoDownloadMutationProps) =>
      fetchData({ albumId, photoIds }),
  });

  return mutation;
}
