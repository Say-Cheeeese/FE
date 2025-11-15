import { getExifFromUrl, PhotoExifInfo } from '@/global/utils/getExifFromUrl';
import { useQuery } from '@tanstack/react-query';

export function usePhotoExifQuery(imageUrl?: string) {
  return useQuery<PhotoExifInfo>({
    queryKey: ['photoExif', imageUrl],
    queryFn: () => {
      if (!imageUrl) throw new Error('imageUrl이 없습니다.');
      // TODO : exif 가져오는 로직 이슈 있음. 사진 fetch 시 CORS발생
      return getExifFromUrl(imageUrl);
    },
    enabled: !!imageUrl,
  });
}
