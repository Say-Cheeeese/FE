import { getFilesWithCaptureTime } from './getFilesWithCaptureTime';

// captureTime(yyyy-MM-ddTHH:mm:ss) 기준 최신순 내림차순 정렬
export async function sortImagesByDate(files: File[]): Promise<File[]> {
  const filesWithCapture = await getFilesWithCaptureTime(files);
  filesWithCapture.sort(
    (a, b) =>
      new Date(b.captureTime).getTime() - new Date(a.captureTime).getTime(),
  );
  return filesWithCapture.map((f) => f.file);
}
