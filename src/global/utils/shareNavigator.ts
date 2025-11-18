import Toast from '@/global/components/toast/Toast';

interface ShareViaNavigatorParams {
  data: ShareData;
  fallbackMessage?: string;
  errorMessage?: string;
}

export const shareViaNavigator = async ({
  data,
  fallbackMessage = '이 브라우저는 공유하기 기능을 지원하지 않습니다.',
  errorMessage,
}: ShareViaNavigatorParams): Promise<boolean> => {
  if (!navigator.share) {
    Toast.alert(fallbackMessage);
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    console.error('공유 취소 또는 실패:', error);
    if (errorMessage) {
      Toast.alert(errorMessage);
    }
    return false;
  }
};
