import GlobalClientEffects from '@/global/components/GlobalClientEffects';
import KakaoProvider from '@/global/context/KakaoProvider';
import QueryProvider from '@/global/context/QueryProvider';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
  preload: false,
});

export const metadata: Metadata = {
  title: '치이이즈: 추억은 따끈할 때 제맛',
  description: '딱 7일만 열리는 특별한 공유 앨범 서비스',
  metadataBase: new URL('https://say-cheese.me'),
  openGraph: {
    title: '치이이즈: 추억은 따끈할 때 제맛',
    description: '딱 7일만 열리는 특별한 공유 앨범 서비스',
    url: 'https://say-cheese.me/main',
    siteName: '치이이즈',
    images: [
      {
        url: '/og/default_og.png',
        width: 1200,
        height: 630,
        alt: '치이이즈',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <meta
          name='description'
          content='딱 7일만 열리는 특별한 공유 앨범 서비스'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '치이이즈',
              description: '딱 7일만 열리는 특별한 공유 앨범 서비스',
              url: 'https://say-cheese.me',
              applicationCategory: 'PhotographyApplication',
            }),
          }}
        />
        {process.env.NODE_ENV === 'production' && (
          <meta
            name='google-site-verification'
            content='1mgjA-uwRMiKC5wK5856E1uwWcuUl0UTZRuDcpfG214'
          />
        )}
      </head>
      {/* <Script id='maze-snippet' strategy='lazyOnload'>
        {`(function (m, a, z, e) {
  var s, t, u, v;
  try {
    t = m.sessionStorage.getItem('maze-us');
  } catch (err) {}
  if (!t) {
    t = new Date().getTime();
    try {
      m.sessionStorage.setItem('maze-us', t);
    } catch (err) {}
  }
  u = document.currentScript || (function () {
    var w = document.getElementsByTagName('script');
    return w[w.length - 1];
  })();
  v = u && u.nonce;
  s = a.createElement('script');
  s.src = z + '?apiKey=' + e;
  s.async = true;
  if (v) s.setAttribute('nonce', v);
  a.getElementsByTagName('head')[0].appendChild(s);
  m.mazeUniversalSnippetApiKey = e;
})(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '65a6039c-2384-4c2d-a8e1-546a4f859a08');`}
      </Script> */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <GoogleAnalytics gaId='G-2EN8NDYR97' />
        </>
      )}
      <body
        className={`${pretendard.className} min-h-screen w-full antialiased`}
      >
        <div className='min-h-screen w-full bg-white'>
          <div className='mx-auto flex min-h-screen w-full max-w-[430px] flex-col'>
            <QueryProvider>
              <GlobalClientEffects />
              <KakaoProvider>{children}</KakaoProvider>
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
