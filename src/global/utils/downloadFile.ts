import JSZip from 'jszip';

type DownloadSource = string | Blob;
type DownloadSources = DownloadSource | DownloadSource[];

/**
 * 사진이 1장이면 그대로 다운로드,
 * 여러 장이면 zip으로 묶어서 다운로드
 */
export async function downloadFile(
  urlOrBlobs: DownloadSources,
  fileName: string, // 최종 다운로드 파일 이름 (zip일 수도, 단일 파일일 수도)
): Promise<void> {
  const sources = Array.isArray(urlOrBlobs) ? urlOrBlobs : [urlOrBlobs];

  if (sources.length === 0) return;

  // Blob으로 변환하는 공통 함수
  const toBlob = async (item: DownloadSource): Promise<Blob> => {
    if (item instanceof Blob) {
      return item;
    }

    const res = await fetch(item, { mode: 'cors' }).catch(() => null);
    if (!res || !res.ok) {
      throw new Error('파일 다운로드에 실패했습니다.');
    }

    return res.blob();
  };

  // 1장인 경우: 기존처럼 바로 다운로드
  if (sources.length === 1) {
    const blob = await toBlob(sources[0]);

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = objectUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
    return;
  }

  // 여러 장인 경우: ZIP으로 묶기
  const zip = new JSZip();

  const blobs = await Promise.all(sources.map((s) => toBlob(s)));

  blobs.forEach((blob, index) => {
    const ext = guessExtension(sources[index], blob);
    const innerName = `image_${String(index + 1).padStart(2, '0')}.${ext}`;
    zip.file(innerName, blob);
  });

  const zipBlob = await zip.generateAsync({ type: 'blob' });

  const objectUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');

  const zipFileName = fileName.toLowerCase().endsWith('.zip')
    ? fileName
    : `${fileName}.zip`;

  link.href = objectUrl;
  link.download = zipFileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(objectUrl);
}

/**
 * Blob MIME 타입이나 URL에서 확장자 대충 추측
 */
function guessExtension(source: DownloadSource, blob: Blob): string {
  if (blob.type.startsWith('image/')) {
    const subtype = blob.type.split('/')[1] || '';
    if (subtype === 'jpeg') return 'jpg';
    if (subtype) return subtype;
  }

  if (typeof source === 'string') {
    const match = /\.([a-zA-Z0-9]+)(?:\?|#|$)/.exec(source);
    if (match?.[1]) return match[1].toLowerCase();
  }

  return 'bin';
}
