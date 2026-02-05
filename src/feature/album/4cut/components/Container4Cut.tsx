import { useBase64Images } from '@/global/hooks/useBase64Images';
import { useMemo } from 'react';
import { use4CutPreviewQuery } from '../hooks/use4CutPreviewQuery';
import Svg4Cut from '../svg/Svg4Cut';

interface Container4CutProps {
  albumId: string;
  eventName?: string;
  eventDate?: string;
  scale?: number;
  width?: number;
  isFinalized?: boolean;
}

const BASE_WIDTH = 216;
const BASE_HEIGHT = 384;
const BASE_ASPECT_RATIO = BASE_HEIGHT / BASE_WIDTH;
const BASE_FONT_SIZE = 7.963;
const BASE_NAME_POSITION = {
  bottom: 7.4,
  left: 9.6,
};
const BASE_DATE_POSITION = {
  bottom: 7.4,
  right: 10.4,
};

export default function Container4Cut({
  albumId,
  eventDate,
  eventName,
  scale = 1,
  width,
  isFinalized = false,
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

  const calculatedWidth = width ?? BASE_WIDTH * scale;
  const calculatedHeight = calculatedWidth * BASE_ASPECT_RATIO;
  const calculatedScale = calculatedWidth / BASE_WIDTH;

  const scaledFontSize = BASE_FONT_SIZE * calculatedScale;
  const scaledNamePosition = {
    bottom: `${BASE_NAME_POSITION.bottom * calculatedScale}px`,
    left: `${BASE_NAME_POSITION.left * calculatedScale}px`,
  };
  const scaledDatePosition = {
    bottom: `${BASE_DATE_POSITION.bottom * calculatedScale}px`,
    right: `${BASE_DATE_POSITION.right * calculatedScale}px`,
  };

  return (
    <div
      className='border-border-primary text-text-secondary relative border font-medium'
      style={{
        fontSize: scaledFontSize,
        ...(isFinalized && {
          boxShadow: '0px 0px 25px 5px rgba(0, 0, 0, 0.08)',
        }),
      }}
    >
      <Svg4Cut
        width={calculatedWidth}
        height={calculatedHeight}
        photos={base64List}
      />

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
