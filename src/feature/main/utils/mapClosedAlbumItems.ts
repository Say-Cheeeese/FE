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

function formatEventDate(date?: string) {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
