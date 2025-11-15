import Toast from '@/global/components/toast/Toast';
import { heicTo } from 'heic-to';

// heic/heif 이미지를 jpeg로 변환하는 함수
export async function convertHeicFilesToJpeg(files: File[]): Promise<File[]> {
  console.log('Converting HEIC/HEIF files to JPEG...', files);
  const convertedFiles = await Promise.all(
    files.map(async (file) => {
      console.log('Processing file:', file.name, 'of type:', file.type);
      if (/heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name)) {
        console.log('Converting HEIC/HEIF file:', file.name);
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
        } catch {
          Toast.alert(`${file.name} 파일의 변환에 실패했습니다.`);
          return file;
        }
      }
      return file;
    }),
  );
  return convertedFiles;
}
