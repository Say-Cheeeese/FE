import JSZip from 'jszip';

type DownloadSource = string | Blob;
type DownloadSources = DownloadSource | DownloadSource[];

export async function downloadFile(
  urlOrBlobs: DownloadSources,
  fileName?: string,
): Promise<void> {
  const sources = Array.isArray(urlOrBlobs) ? urlOrBlobs : [urlOrBlobs];
  if (sources.length === 0) return;

  // 기본 파일명 설정
  const isSingle = sources.length === 1;
  const finalName = fileName || (isSingle ? 'download' : 'photos.zip');

  // Blob으로 변환하는 공통 함수
  const toBlob = async (item: DownloadSource): Promise<Blob> => {
    if (item instanceof Blob) return item;

    const res = await fetch(item, { mode: 'cors' }).catch(() => null);
    if (!res || !res.ok) throw new Error('파일 다운로드에 실패했습니다.');

    return res.blob();
  };

  // 1장 다운로드
  if (isSingle) {
    const blob = await toBlob(sources[0]);
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectUrl;

    // 확장자가 없으면 blob 타입 기준으로 자동 유추
    const ext = guessExtension(sources[0], blob);
    const dotIndex = finalName.lastIndexOf('.');
    const baseName =
      dotIndex > -1 ? finalName.substring(0, dotIndex) : finalName;
    const downloadName = `${baseName}.${ext}`;

    link.download = downloadName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
    return;
  }

  // 여러 장 ZIP
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
  const zipName = finalName.toLowerCase().endsWith('.zip')
    ? finalName
    : `${finalName}.zip`;

  link.href = objectUrl;
  link.download = zipName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(objectUrl);
}

/** 확장자 유추 */
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
