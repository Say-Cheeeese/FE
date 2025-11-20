/**
 * MIME 타입 문자열을 기반으로 적절한 이미지 파일 확장자를 반환합니다.
 *
 * - 'image/jpeg' → 'jpg'
 * - 'image/png'  → 'png'
 * - 'image/webp' → 'webp'
 * - 그 외 또는 undefined일 경우 기본값 'png'를 반환합니다.
 *
 * @param {string | undefined} mime - Blob 또는 HTTP 응답에서 얻은 MIME 타입 문자열.
 * @returns {'png' | 'jpg' | 'webp'} MIME 타입에 매칭되는 이미지 확장자.
 */
export const getExtensionFromMime = (
  mime: string | undefined,
): 'png' | 'jpg' | 'webp' => {
  if (!mime) return 'png';
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'png';
};
