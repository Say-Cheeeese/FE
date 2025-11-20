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
  presignedUrlInfos: PresignedUrlInfo[];
};

export async function getPresignedUrl(
  params: PresignedUrlRequest,
): Promise<PresignedUrlInfo[]> {
  try {
    const response = await api.post<ApiResponse>({
      path: '/v1/photo/presigned-url',
      body: { albumCode: params.albumCode, fileInfos: params.fileInfos },
    });
    return response.result.presignedUrlInfos;
  } catch (error) {
    console.error('Presigned URL 조회 실패:', error);
    throw { stage: 'presigned', error };
  }
}
