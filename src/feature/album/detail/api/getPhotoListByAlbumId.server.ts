import { serverApi } from '@/global/utils/serverApi';

export type PhotoListSorting = 'CREATED_AT' | 'POPULAR' | 'CAPTURED_AT';

export interface GetPhotoListParams {
  page?: number;
  size?: number;
  sorting?: PhotoListSorting;
}

export interface Photo {
  photoId: number;
  thumbnailUrl: string;
  likesCnt: number;
  isLiked: boolean;
  isDownloaded: boolean;
  isRecentlyDownloaded: boolean;
}

export interface PhotoListResult {
  responses: Photo[];
  listSize: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
}

/**
 * 앨범의 사진 리스트를 가져오는 API (서버/클라이언트 공용)
 * @param albumId 앨범 코드(string)
 * @param params page, size, sorting 쿼리 파라미터
 * @returns 사진 리스트
 */
export async function getPhotoListByAlbumId(
  albumId: string,
  params?: GetPhotoListParams,
): Promise<PhotoListResult> {
  if (!albumId) throw new Error('albumId가 필요합니다');
  const queryParams: Record<string, string | number> = {};
  if (params) {
    if (params.page !== undefined) queryParams.page = params.page;
    if (params.size !== undefined) queryParams.size = params.size;
    if (params.sorting !== undefined) queryParams.sorting = params.sorting;
  }
  const res = await serverApi.get({
    path: `/v1/album/${albumId}/photos`,
    params: queryParams,
  });
  console.log('res', res);
  return res.result as PhotoListResult;
}
