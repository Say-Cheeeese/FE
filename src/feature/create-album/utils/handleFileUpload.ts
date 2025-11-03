import { ChangeEvent } from 'react';
import { validateUpload } from './validateUpload';

export async function handleFileUpload(
  e: ChangeEvent<HTMLInputElement>,
  albumId: string,
  router: { push: (path: string) => void },
) {
  const fl = e.target.files;
  if (!fl) return;
  const files = Array.from(fl).filter((f) => f.type.startsWith('image/'));

  const result = await validateUpload(files, albumId);
  if (!result.ok) {
    if (result.reason === 'size') {
      alert(
        '6MB를 초과한 파일이 있습니다: ' + result.oversizedFiles.join(', '),
      );
    } else if (result.reason === 'count') {
      alert('업로드 가능한 이미지 개수를 초과했습니다.');
    }
    router.push(`/create-album/${albumId}/select`);
    return;
  }
  router.push(`/album/${albumId}`);
}
