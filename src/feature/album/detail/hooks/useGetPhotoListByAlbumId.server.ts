import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getPhotoListByAlbumId,
  GetPhotoListParams,
} from '../api/getPhotoListByAlbumId.server';

export type PhotoListResponse = Awaited<
  ReturnType<typeof getPhotoListByAlbumId>
>;

export function useGetPhotoListByAlbumId(
  albumId: string,
  params?: GetPhotoListParams,
  options?: UseQueryOptions<PhotoListResponse, Error>,
) {
  return useQuery<PhotoListResponse, Error>({
    queryKey: ['albumPhotos', albumId, params],
    queryFn: () => getPhotoListByAlbumId(albumId, params),
    enabled: !!albumId,
    ...options,
  });
}
