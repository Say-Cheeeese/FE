import { api } from '@/global/utils/api';

export type AlbumInvitationResponse = {
  title: string;
  themeEmoji: string;
  eventDate: string;
  expiredAt: string;
  makerName: string;
  makerProfileImage: string;
  isExpired: boolean;
};

/**
 * 앨범 초대 정보 조회 (Client Component용)
 * @param code 앨범 코드
 * @returns 앨범 초대 정보
 */
export async function getAlbumInvitation(
  code: string,
): Promise<AlbumInvitationResponse> {
  const response = await api.get<AlbumInvitationResponse>({
    path: `/v1/album/${code}/invitation`,
  });
  return response.result;
}
