import { type AlbumClosedItem } from '@/feature/main/hooks/useAlbumClosedInfiniteQuery';

const MAX_IMAGES = 4;

export interface ClosedAlbumSectionItem {
  code: string;
  title: string;
  date: string;
  author: string;
  images: string[];
  rawDate: string;
}

export interface ClosedAlbumSection {
  year: string;
  albums: ClosedAlbumSectionItem[];
}

export function buildClosedAlbumSections(
  items: AlbumClosedItem[],
): ClosedAlbumSection[] {
  const grouped = items.reduce<Record<string, ClosedAlbumSectionItem[]>>(
    (acc, item) => {
      const year = extractYear(item.eventDate);
      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push({
        code: item.code,
        title: item.title ?? '',
        date: formatEventDate(item.eventDate),
        author: item.makerName ?? '',
        images:
          item.thumbnails
            ?.filter((thumbnail): thumbnail is string => Boolean(thumbnail))
            ?.slice(0, MAX_IMAGES) ?? [],
        rawDate: item.eventDate ?? '',
      });

      return acc;
    },
    {},
  );

  return Object.entries(grouped)
    .sort(([a], [b]) => toComparableYear(b) - toComparableYear(a))
    .map(([year, albums]) => ({
      year,
      albums: albums.sort((a, b) => compareByDateDesc(a.rawDate, b.rawDate)),
    }));
}

function toComparableYear(year: string) {
  const yearNumber = Number(year);
  return Number.isNaN(yearNumber) ? 0 : yearNumber;
}

function compareByDateDesc(a: string, b: string) {
  const aTime = Date.parse(a);
  const bTime = Date.parse(b);
  if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
    return 0;
  }

  return bTime - aTime;
}

function extractYear(date?: string) {
  if (!date) return '기타';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date.slice(0, 4) || '기타';
  }

  return String(parsed.getFullYear());
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
