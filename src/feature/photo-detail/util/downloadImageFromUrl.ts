export async function downloadImageFromUrl(
  imageUrl: string,
  fallbackFileName: string, // 확장자 없이 전달해도 됨(자동 추론)
) {
  // 1) 이미지 가져오기
  const res = await fetch(imageUrl, { mode: 'cors', credentials: 'include' });
  if (!res.ok) throw new Error('이미지 요청 실패');

  // 2) 파일명/확장자 추론
  const contentType = res.headers.get('content-type') || '';
  const cd = res.headers.get('content-disposition') || '';

  // content-disposition에 filename= 있으면 그걸 사용
  const cdMatch = cd.match(/filename\*?=(?:UTF-8'')?["']?([^"';]+)["']?/i);
  let fileName =
    cdMatch?.[1] ||
    decodeURIComponent(imageUrl.split('?')[0].split('/').pop() || '') ||
    fallbackFileName;

  // 확장자 없으면 content-type 기준으로 붙이기
  const extFromType = contentType.includes('jpeg')
    ? 'jpg'
    : contentType.includes('png')
      ? 'png'
      : contentType.includes('webp')
        ? 'webp'
        : contentType.includes('gif')
          ? 'gif'
          : '';

  if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(fileName) && extFromType) {
    fileName = `${fileName}.${extFromType}`;
  }

  // 3) Blob → ObjectURL → a.click()
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName || 'download';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}
