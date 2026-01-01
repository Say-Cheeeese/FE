import { serverApi } from '@/global/utils/serverApi';
import type { AlbumInvitationResponse } from './getAlbumInvitation';

/**
 * 앨범 초대 정보 조회 (Server Component용)
 * @param code 앨범 코드
 * @returns 앨범 초대 정보
 */
export async function getAlbumInvitationServer(
  code: string,
): Promise<AlbumInvitationResponse> {
  const response = await serverApi.get<AlbumInvitationResponse>({
    path: `/v1/album/${code}/invitation`,
  });
  return response.result;
}
