'use client';

import Script from 'next/script';

interface KakaoProviderProps {
  children: React.ReactNode;
}

export default function KakaoProvider({ children }: KakaoProviderProps) {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '';

  return (
    <>
      <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js'
        integrity='sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p'
        crossOrigin='anonymous'
        strategy='afterInteractive'
        onLoad={() => {
          if (!window.Kakao) return;
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
          }
        }}
      />
      {children}
    </>
  );
}
