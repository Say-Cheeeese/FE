import { api } from '@/global/utils/api';

export type PresignedUrlRequest = {
  albumCode: string;
  fileInfos: {
    fileName: string;
    fileSize: number;
    contentType: string;
  }[];
};

export type PresignedUrlInfo = {
  photoId: number;
  uploadUrl: string;
};

type ApiResponse = {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    presignedUrlInfos: PresignedUrlInfo[];
  };
};

export async function getPresignedUrl(
  params: PresignedUrlRequest,
): Promise<PresignedUrlInfo[]> {
  const response = await api.post<ApiResponse>({
    path: '/v1/photo/presigned-url',
    body: params,
  });
  console.log(response);
  // 타입 선언 없이 접근 (타입 안전성은 떨어짐)
  return response.result.presignedUrlInfos;
}
