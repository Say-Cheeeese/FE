import { api } from '../../../global/utils/api';

export interface CreateAlbumRequest {
  themeEmoji: string; // U+1F9C0 형식의 유니코드
  title: string;
  participant: number;
  eventDate: string; // YYYY-MM-DD 형식
}

export interface CreateAlbumResponse {
  themeEmoji: string;
  title: string;
  eventDate: string;
  currentPhotoCnt: number;
  code: string;
}

/**
 * 앨범 생성 API
 * @param data 앨범 생성 요청 데이터
 * @returns 생성된 앨범 정보
 */
export async function createAlbumApi(
  data: CreateAlbumRequest,
): Promise<CreateAlbumResponse> {
  const response = await api.post<CreateAlbumResponse>({
    path: '/v1/album',
    body: {
      themeEmoji: data.themeEmoji,
      title: data.title,
      participant: data.participant,
      eventDate: data.eventDate,
    },
  });
  console.log('Create Album Response:', response.result);
  return response.result;
}
