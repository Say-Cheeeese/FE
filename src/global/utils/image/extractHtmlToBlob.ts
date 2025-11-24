import { toBlob } from 'html-to-image';

/** html요소를 받아 Blob형태 이미지로 반환 */
export const extractHtmlToBlob = async (node: HTMLElement): Promise<Blob> => {
  const blob = await toBlob(node, {
    cacheBust: true,
  });

  if (!blob) {
    throw new Error('이미지 생성 실패');
  }

  return blob;
};
