import { formatEventDate } from '@/global/utils/formatEventDate';
import { AlbumClosedItem } from '../hooks/useAlbumClosedInfiniteQuery';

const MAX_IMAGES = 4;

interface CloseAlbumListItem {
  code: string;
  title: string;
  date: string;
  author: string;
  images: string[];
}

export function mapClosedAlbumItems(
  items: AlbumClosedItem[],
): CloseAlbumListItem[] {
  return items.map((item) => ({
    code: item.code,
    title: item.title ?? '',
    date: formatEventDate(item.eventDate),
    author: item.makerName ?? '',
    images:
      item.thumbnails
        ?.filter((thumbnail): thumbnail is string => Boolean(thumbnail))
        ?.slice(0, MAX_IMAGES) ?? [],
  }));
}
