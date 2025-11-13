import { getExifFromUrl, PhotoExifInfo } from '@/global/utils/getExifFromUrl';
import { useQuery } from '@tanstack/react-query';

export function usePhotoExifQuery(imageUrl?: string) {
  return useQuery<PhotoExifInfo>({
    queryKey: ['photoExif', imageUrl],
    queryFn: () => {
      if (!imageUrl) throw new Error('imageUrl이 없습니다.');
      return getExifFromUrl(imageUrl);
    },
    enabled: !!imageUrl,
  });
}
