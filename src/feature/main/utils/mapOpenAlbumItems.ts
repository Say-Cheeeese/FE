import { formatEventDate } from '@/global/utils/formatEventDate';
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

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function formatExpirationTime(expiredAt?: string) {
  if (!expiredAt) return '만료됨';
  const expiresAt = new Date(expiredAt).getTime();
  if (Number.isNaN(expiresAt)) return '만료됨';

  const diff = expiresAt - Date.now();
  if (diff <= 0) return '만료됨';

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.max(Math.floor((diff % MINUTE) / 1000), 1);

  if (days > 0) {
    return `${days}일 ${hours}시간`;
  }

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  if (minutes > 0) {
    return `${minutes}분 ${seconds}초`;
  }

  return `${seconds}초`;
}
