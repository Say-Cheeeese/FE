const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatExpirationTime(expiredAt?: string) {
  if (!expiredAt) return '만료됨';

  // 타임존 정보가 없으면 UTC로 강제 파싱
  const utcTime =
    expiredAt.endsWith('Z') ||
    expiredAt.includes('+') ||
    expiredAt.includes('-', 10)
      ? expiredAt
      : expiredAt + 'Z';

  const expiresAt = new Date(utcTime).getTime();
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

/** expiredAt 이 현재 시각 기준 만료됐는지 여부만 반환 */
export function getIsExpired(expiredAt?: string): boolean {
  if (!expiredAt) return true;
  const expiresAt = new Date(expiredAt).getTime();
  if (Number.isNaN(expiresAt)) return true;
  return expiresAt - Date.now() <= 0;
}
