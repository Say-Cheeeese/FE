import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

const fetchData = async (albumId: string, photoId: number) => {
  const res = await api.delete<ApiReturns['album.albumPhoto']>({
    path: EP.album.albumPhoto(albumId, photoId),
  });
  return res.result;
};

interface DeleteAlbumPhotoMutateProps {
  albumId: string;
  photoId: number;
}

export function useDeleteAlbumPhotoMutation() {
  const mutation = useMutation({
    mutationFn: ({ albumId, photoId }: DeleteAlbumPhotoMutateProps) =>
      fetchData(albumId, photoId),
  });

  return mutation;
}
