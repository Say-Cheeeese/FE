import { useBase64Images } from '@/global/hooks/useBase64Images';
import { useMemo } from 'react';
import { use4CutPreviewQuery } from '../hooks/use4CutPreviewQuery';
import Svg4Cut from '../svg/Svg4Cut';

interface Container4CutProps {
  albumId: string;
  eventName?: string;
  eventDate?: string;
  scale?: number;
}

export default function Container4Cut({
  albumId,
  eventDate,
  eventName,
  scale = 1,
}: Container4CutProps) {
  // TODO : openapi type이 이상해서 임시 any처리. 백엔드랑 협의 필요
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data }: any = use4CutPreviewQuery(albumId);

  const images = useMemo(() => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.previewPhotos?.map((item: any) => item.imageUrl) ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.photos?.map((item: any) => item.imageUrl) ??
      []
    );
  }, [data]);

  const { base64List } = useBase64Images({ imageUrls: images });

  const scaledFontSize = 7.963 * scale;
  const scaledNamePosition = {
    bottom: `${7.4 * scale}px`,
    left: `${9.6 * scale}px`,
  };
  const scaledDatePosition = {
    bottom: `${7.4 * scale}px`,
    right: `${10.4 * scale}px`,
  };

  return (
    <div
      className='border-border-primary text-text-secondary relative border font-medium'
      style={{ fontSize: scaledFontSize }}
    >
      <Svg4Cut width={216 * scale} height={384 * scale} photos={base64List} />

      {eventName && (
        <span
          className='paperozi-font absolute'
          style={{ ...scaledNamePosition, fontSize: scaledFontSize }}
        >
          {eventName}
        </span>
      )}

      {eventDate && (
        <span
          className='paperozi-font absolute'
          style={{ ...scaledDatePosition, fontSize: scaledFontSize }}
        >
          {eventDate}
        </span>
      )}

      {/* 이 컴포넌트에서만 사용되는 폰트 */}
      <style jsx global>{`
        @font-face {
          font-family: 'Paperozi';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2')
            format('woff2');
          font-weight: 500;
          font-display: swap;
        }

        .paperozi-font {
          font-family: 'Paperozi', sans-serif;
        }
      `}</style>
    </div>
  );
}
