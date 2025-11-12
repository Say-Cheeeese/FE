import { EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useQuery } from '@tanstack/react-query';

const getData = async (code: string) => {
  const data = api.get({ path: EP.album.photos(code) });

  return data;
};

interface UseAlbumPhotosQueryProps {
  code: string;
}

export const useAlbumPhotosQuery = ({ code }: UseAlbumPhotosQueryProps) => {
  const query = useQuery({
    queryKey: [EP.album.photos(code)],
    queryFn: async () => {
      await getData(code);
    },
  });

  return query;
};
