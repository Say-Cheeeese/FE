import { shareViaNavigator } from '../shareNavigator';
import { getExtensionFromMime } from './getExtensionFromMime';

interface ShareImagesWithNavigatorParams {
  /** 공유할 이미지 URL */
  imageUrls?: string | string[];

  /** 공유할 이미지 제목 */
  imageTitle?: string;

  /** 공유할 이미지 Blob */
  imageBlobs?: Blob | Blob[];

  /** 공유 성공 시 실행할 콜백  */
  onSuccess?: () => void;

  /** 이미지 준비 중 에러 발생 시 실행할 콜백  */
  onError?: (error: unknown) => void;
}

/**
 * 주어진 이미지 URL 또는 Blob을 File 객체로 변환한 뒤,
 * navigator.share를 통해 파일 공유를 시도하는 유틸 함수입니다.
 */
export async function shareImage({
  imageUrls,
  imageBlobs,
  imageTitle,
  onSuccess,
  onError,
}: ShareImagesWithNavigatorParams): Promise<boolean> {
  const urlList = Array.isArray(imageUrls)
    ? imageUrls
    : imageUrls
      ? [imageUrls]
      : [];
  const blobList = Array.isArray(imageBlobs)
    ? imageBlobs
    : imageBlobs
      ? [imageBlobs]
      : [];

  if (urlList.length === 0 && blobList.length === 0) {
    console.warn('shareImage: No imageUrls or imageBlobs provided.');
    return false;
  }

  try {
    const urlFiles = await Promise.all(
      urlList.map(async (url, index) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('사진 파일을 불러오지 못했습니다.');
        }
        const blob = await response.blob();
        const ext = getExtensionFromMime(blob.type);

        return new File([blob], `${imageTitle ?? index}.${ext}`, {
          type: blob.type || 'image/png',
        });
      }),
    );

    const blobFiles = blobList.map((blob, index) => {
      const ext = getExtensionFromMime(blob.type);
      return new File([blob], `${imageTitle ?? index}.${ext}`, {
        type: blob.type || 'image/png',
      });
    });

    const allFiles = [...urlFiles, ...blobFiles];

    const success = await shareViaNavigator({
      data: { files: allFiles },
      errorMessage: '사진 공유에 실패했습니다. 다시 시도해주세요.',
      fileNotSupportedMessage:
        '이 브라우저에서는 선택한 사진의 공유를 지원하지 않습니다.',
    });

    if (success && onSuccess) {
      onSuccess();
    }

    return success;
  } catch (error) {
    console.error('Failed to share photos:', error);

    if (onError) onError(error);
    return false;
  }
}
