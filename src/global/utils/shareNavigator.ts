import Toast from '@/global/components/toast/Toast';

interface ShareViaNavigatorParams {
  data: ShareData;
  fallbackMessage?: string;
  errorMessage?: string;
  fileNotSupportedMessage?: string;
}

export const shareViaNavigator = async ({
  data,
  fallbackMessage = '이 브라우저는 공유하기 기능을 지원하지 않습니다.',
  fileNotSupportedMessage = '이 브라우저는 파일 공유를 지원하지 않습니다.',
  errorMessage,
}: ShareViaNavigatorParams): Promise<boolean> => {
  if (!navigator.share) {
    Toast.alert(fallbackMessage);
    return false;
  }

  if (
    data.files?.length &&
    (!navigator.canShare || !navigator.canShare({ files: data.files }))
  ) {
    Toast.alert(fileNotSupportedMessage);
    return false;
  }

  try {
    await navigator.share(data);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      return false;
    }

    console.error('공유 실패:', error);
    if (errorMessage) {
      Toast.alert('공유에 실패하였습니다.');
    }
    return false;
  }
};
