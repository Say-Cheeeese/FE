import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getPhotoListByAlbumId,
  GetPhotoListParams,
} from '../api/getPhotoListByAlbumId.server';

// getPhotoListByAlbumId의 반환 타입 추론
export type PhotoListResponse = Awaited<
  ReturnType<typeof getPhotoListByAlbumId>
>;

/**
 * 앨범 사진 리스트를 가져오는 react-query 훅
 * @param albumId 앨범 코드(string)
 * @param params page, size, sorting 쿼리 파라미터
 * @param options react-query 옵션
 */
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
