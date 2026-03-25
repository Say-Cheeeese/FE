'use client';

/**
 * 네컷 프리뷰에서 쓰는 Paperlogy(Paperozi) 폰트 등록.
 * 프레임 템플릿 컴포넌트에서 그대로 포함해 사용합니다.
 */
export default function FourCutPaperoziFontStyle() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: 'Paperozi';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2')
          format('woff2');
        font-weight: 500;
        font-display: swap;
      }

      .four-cut-paperozi {
        font-family: 'Paperozi', sans-serif;
      }
    `}</style>
  );
}
