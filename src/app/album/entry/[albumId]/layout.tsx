import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '앨범에 초대해요',
  description: '치이이즈: 추억은 따끈할 때 제맛',
  openGraph: {
    title: '앨범에 초대해요',
    description: '치이이즈: 추억은 따끈할 때 제맛',
    url: 'https://say-cheese.me',
    siteName: '치이이즈',
    images: [
      {
        url: '/og/invite_og.png',
        width: 1200,
        height: 630,
        alt: '치이이즈. 우리 공유앨범에 초대합니다. 일주일 뒤에는 앨범이 사라져요!',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
