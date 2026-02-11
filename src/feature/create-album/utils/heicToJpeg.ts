import Toast from '@/global/components/toast/Toast';
import { heicTo } from 'heic-to';

// 배치 병렬 처리를 위한 헬퍼 함수
async function convertSingleHeicFile(file: File): Promise<File> {
  try {
    const jpegBlob = await heicTo({
      blob: file,
      type: 'image/jpeg',
      quality: 0.9,
    });
    return new File([jpegBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
      type: 'image/jpeg',
      lastModified: file.lastModified,
    });
  } catch (e) {
    Toast.alert(`${file.name} 파일의 변환에 실패했습니다.`);
    return file;
  }
}

// 메인 스레드 양보를 위한 delay 함수
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function convertHeicFilesToJpeg(files: File[]): Promise<File[]> {
  const heicFiles = files.filter(
    (file) =>
      /heic|heif/i.test(file.type) || /\.heic$|\.heif$/i.test(file.name),
  );

  if (heicFiles.length === 0) {
    return files;
  }

  const totalCount = heicFiles.length;
  let convertedCount = 0;

  // 초기 메시지 표시
  Toast.alert(`변환 중... 0/${totalCount}`);

  // 파일을 HEIC와 non-HEIC로 분리
  const heicFileSet = new Set(heicFiles);
  const nonHeicFiles = files.filter((file) => !heicFileSet.has(file));

  // 배치 크기 (한 번에 3개씩 병렬 처리)
  const BATCH_SIZE = 3;
  const convertedHeicFiles: File[] = [];

  // 배치별로 처리
  for (let i = 0; i < heicFiles.length; i += BATCH_SIZE) {
    const batch = heicFiles.slice(i, i + BATCH_SIZE);

    // 배치 내에서는 병렬 처리
    const batchResults = await Promise.all(
      batch.map((file) => convertSingleHeicFile(file)),
    );

    convertedHeicFiles.push(...batchResults);
    convertedCount += batch.length;

    // 진행률 업데이트
    Toast.alert(`변환 중... ${convertedCount}/${totalCount}`);

    // 다음 배치 전에 메인 스레드에 양보 (UI 반응성 확보)
    if (i + BATCH_SIZE < heicFiles.length) {
      await delay(10);
    }
  }

  // 원본 파일 순서 유지하면서 병합
  const fileMap = new Map<File, File>();
  heicFiles.forEach((original, index) => {
    fileMap.set(original, convertedHeicFiles[index]);
  });

  return files.map((file) => fileMap.get(file) || file);
}
