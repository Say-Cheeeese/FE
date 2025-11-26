import { DownloadSource } from './downloadFile';

export function guessExtension(source: DownloadSource, blob: Blob): string {
  if (blob.type.startsWith('image/')) {
    const subtype = blob.type.split('/')[1] || '';
    if (subtype === 'jpeg') return 'jpg';
    if (subtype) return subtype;
  }

  if (typeof source === 'string') {
    const match = /\.([a-zA-Z0-9]+)(?:\?|#|$)/.exec(source);
    if (match?.[1]) return match[1].toLowerCase();
  }

  // 최종 fallback → png
  return 'png';
}
