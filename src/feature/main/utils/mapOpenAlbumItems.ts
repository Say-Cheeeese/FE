import { formatEventDate } from '@/global/utils/formatEventDate';
import { formatExpirationTime } from '@/global/utils/time/formatExpirationTime';
import { AlbumOpenItem } from '../hooks/useAlbumOpenInfiniteQuery';

interface OpenAlbumListItem {
  code: string;
  author: string;
  date: string;
  expirationTime: string;
  joinedMembers: number;
  totalMembers: number;
  title: string;
  thumbnails: string[];
  emoji: string;
}

export function mapOpenAlbumItems(items: AlbumOpenItem[]): OpenAlbumListItem[] {
  return items.map((item) => ({
    code: item.code,
    author: item.makerName ?? '',
    date: formatEventDate(item.eventDate),
    expirationTime: formatExpirationTime(item.expiredAt),
    joinedMembers: item.currentParticipant ?? 0,
    totalMembers: item.participant ?? 0,
    title: item.title ?? '',
    thumbnails:
      item.recentPhotoThumbnails
        ?.slice(0, 3)
        .filter((thumbnail): thumbnail is string => Boolean(thumbnail)) ?? [],
    emoji: item.themeEmoji,
  }));
}
