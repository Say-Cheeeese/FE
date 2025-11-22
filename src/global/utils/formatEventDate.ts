/**
 * 이벤트 날짜 문자열을 'YYYY.MM.DD' 형태로 변환하는 함수.
 *
 * 사용 예:
 *   formatEventDate("2025-01-03T10:20:30Z") // "2025.01.03"
 */
export function formatEventDate(date?: string) {
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
