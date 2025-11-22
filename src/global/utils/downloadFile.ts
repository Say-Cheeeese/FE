export async function downloadFile(
  urlOrBlob: string | Blob,
  fileName: string,
): Promise<void> {
  let blob: Blob;

  if (urlOrBlob instanceof Blob) {
    // Blob 직접 다운로드
    blob = urlOrBlob;
  } else {
    // URL → Blob 다운로드 후
    const res = await fetch(urlOrBlob, { mode: 'cors' }).catch(() => null);

    if (!res || !res.ok) {
      throw new Error('파일 다운로드에 실패했습니다.');
    }

    blob = await res.blob();
  }

  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(objectUrl);
}
