/**
 * Unicode 코드포인트 문자열을 이모지로 변환
 * @param unicodeString 'U+1F60A' 형식의 문자열
 * @returns 실제 이모지 문자
 */
export function convertUnicodeToEmoji(unicodeString: string): string {
  // 'U+1F60A' -> '1F60A'
  const codePoint = unicodeString.replace('U+', '');
  // 16진수를 10진수로 변환 후 이모지 생성
  return String.fromCodePoint(parseInt(codePoint, 16));
}
