interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (options: {
      objectType: 'feed' | string;
      content: KakaoShareContent;
      buttons?: KakaoShareButton[];
    }) => void;
  };
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
