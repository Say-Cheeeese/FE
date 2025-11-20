import { useBase64Images } from '@/global/hooks/useBase64Images';
import { useMemo } from 'react';
import { use4CutPreviewQuery } from '../hooks/use4CutPreviewQuery';
import Svg4Cut from '../svg/Svg4Cut';

interface Container4CutProps {
  albumId: string;
  eventName?: string;
  eventDate?: string;
}

export default function Container4Cut({
  albumId,
  eventDate,
  eventName,
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

  return (
    <div className='border-border-primary text-text-secondary relative border text-[7.963px] font-medium'>
      <Svg4Cut width={216} height={384} photos={base64List} />

      {eventName && (
        <span className='paperozi-font absolute bottom-[7.4px] left-[9.6px]'>
          {eventName}
        </span>
      )}

      {eventDate && (
        <span className='paperozi-font absolute right-[10.4px] bottom-[7.4px] text-[7.963px]'>
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
