import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '치즈',
  description: '치즈',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${pretendard.className} antialiased`}
        style={{
          maxWidth: '430px',
          width: '100vw',
          margin: '0 auto',
          background: '#fff',
        }}
      >
        {children}
      </body>
    </html>
  );
}
