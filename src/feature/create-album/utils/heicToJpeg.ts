import Toast from '@/global/components/toast/Toast';
import { heicTo } from 'heic-to';

export async function convertHeicFilesToJpeg(files: File[]): Promise<File[]> {
  const heicFiles = files.filter(
    (file) =>
      /heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name),
  );

  if (heicFiles.length === 0) {
    return files;
  }

  let convertedCount = 0;
  const totalCount = heicFiles.length;

  // 초기 메시지 표시
  Toast.alert(`변환 중... 0/${totalCount}`);

  const convertedFiles: File[] = [];

  for (const file of files) {
    if (/heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name)) {
      try {
        const jpegBlob = await heicTo({
          blob: file,
          type: 'image/jpeg',
          quality: 0.9,
        });
        const convertedFile = new File(
          [jpegBlob],
          file.name.replace(/\.(heic|heif)$/i, '.jpg'),
          {
            type: 'image/jpeg',
            lastModified: file.lastModified,
          },
        );
        convertedFiles.push(convertedFile);

        // 변환 완료마다 진행률 업데이트
        convertedCount++;
        Toast.alert(`변환 중... ${convertedCount}/${totalCount}`);
      } catch (e) {
        Toast.alert(`${file.name} 파일의 변환에 실패했습니다.`);
        convertedFiles.push(file);
      }
    } else {
      convertedFiles.push(file);
    }
  }

  return convertedFiles;
}
