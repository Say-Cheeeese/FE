import { api } from '@/global/utils/api';
import Toast from '../components/toast/Toast';

export type PresignedUrlRequest = {
  albumCode: string;
  fileInfos: {
    fileName: string;
    fileSize: number;
    contentType: string;
    captureTime: string; // yyyy-MM-ddTHH:mm:ss
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
  } catch (error: unknown) {
    console.error('Presigned URL 조회 실패:', error);

    if (error && typeof error === 'object' && 'message' in error) {
      Toast.alert(error.message as string);
    } else if (error instanceof Error) {
      Toast.alert(error.message);
    } else {
      Toast.alert('오류가 발생했습니다.');
    }

    throw error;
  }
}
