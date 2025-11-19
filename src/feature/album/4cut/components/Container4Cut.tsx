import { use4CutPreviewQuery } from '../hooks/use4CutPreviewQuery';
import Svg4Cut from '../svg/Svg4Cut';

interface Container4CutProps {
  albumId: string;
}

export default function Container4Cut({ albumId }: Container4CutProps) {
  // TODO : openapi type이 이상해서 임시 any처리. 백엔드랑 협의 필요
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data }: any = use4CutPreviewQuery(albumId);

  return (
    <div className='border-border-primary text-text-secondary relative border text-[7.963px] font-medium'>
      <Svg4Cut
        width={216}
        height={384}
        photos={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.previewPhotos?.map((item: any) => item.imageUrl) ??
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.photos?.map((item: any) => item.imageUrl) ??
          []
        }
      />
      <span className='paperozi-font absolute bottom-[7.4px] left-[9.6px]'>
        큐시즘 MT
      </span>
      <span className='paperozi-font absolute right-[10.4px] bottom-[7.4px] text-[7.963px]'>
        2025.09.20
      </span>
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
