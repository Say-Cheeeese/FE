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
  title: '치이이즈: 추억은 따끈할 때 제맛',
  openGraph: {
    title: '치이이즈: 추억은 따끈할 때 제맛',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
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
        className={`${pretendard.className} max-w-[430px] antialiased`}
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
