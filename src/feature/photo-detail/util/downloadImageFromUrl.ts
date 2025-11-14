export async function downloadImageFromUrl(
  imageUrl: string,
  fallbackFileName?: string,
) {
  // TODO : 사진 fetch 시 CORS발생 수정 필요
  const res = await fetch(imageUrl, {
    mode: 'cors',
    credentials: 'include',
    headers: { Accept: 'image/*' },
  });
  if (!res.ok) throw new Error('이미지 요청 실패');

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fallbackFileName || 'download.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}
