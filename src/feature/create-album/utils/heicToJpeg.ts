import Toast from '@/global/components/toast/Toast';
import { heicTo } from 'heic-to';

// heic/heif 이미지를 jpeg로 변환하는 함수
export async function convertHeicFilesToJpeg(files: File[]): Promise<File[]> {
  // HEIC 파일 개수 체크
  const heicFiles = files.filter(
    (file) => /heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name)
  );

  // HEIC 파일이 있으면 변환 중 Toast 표시
  if (heicFiles.length > 0) {
    Toast.alert(`${heicFiles.length}개의 HEIC 파일을 변환 중입니다...`);
  }

  const convertedFiles = await Promise.all(
    files.map(async (file) => {
      if (/heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name)) {
        try {
          const jpegBlob = await heicTo({
            blob: file,
            type: 'image/jpeg',
            quality: 0.9,
          });
          return new File(
            [jpegBlob],
            file.name.replace(/\.(heic|heif)$/i, '.jpg'),
            {
              type: 'image/jpeg',
              lastModified: file.lastModified,
            },
          );
        } catch (e) {
          Toast.alert(`${file.name} 파일의 변환에 실패했습니다.`);
          return file;
        }
      }
      return file;
    }),
  );



  return convertedFiles;
}
