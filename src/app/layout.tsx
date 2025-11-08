import QueryProvider from '@/global/context/QueryProvider';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '치즈',
  description: '사진을 함께 나누는 치즈',
  openGraph: {
    title: '치즈',
    description: '사진을 함께 나누는 치즈',
    url: 'https://say-cheese.me',
    siteName: '치즈',
    images: [
      {
        url: '/og_test.png',
        width: 1200,
        height: 630,
        alt: '치즈 오픈그래프 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <Script id='maze-snippet' strategy='afterInteractive'>
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
      </Script>

      <body
        className={`${pretendard.className} antialiased`}
        style={{
          maxWidth: '430px',
          width: '100vw',
          margin: '0 auto',
          background: '#fff',
        }}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
