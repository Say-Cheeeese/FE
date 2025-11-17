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
    <div className='border-border-primary border'>
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
    </div>
  );
}
