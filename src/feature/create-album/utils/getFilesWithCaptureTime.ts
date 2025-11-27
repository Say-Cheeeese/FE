import exifr from 'exifr';

export async function getFilesWithCaptureTime(
  files: File[],
): Promise<Array<{ file: File; captureTime: string }>> {
  return Promise.all(
    files.map(async (file) => {
      let date: Date = new Date(file.lastModified);
      try {
        const tags = await exifr.parse(file, {
          pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate'],
          translateValues: true,
        });
        const dt: Date | undefined =
          (tags?.DateTimeOriginal as Date | undefined) ??
          (tags?.CreateDate as Date | undefined) ??
          (tags?.ModifyDate as Date | undefined);
        if (
          dt &&
          typeof dt.getTime === 'function' &&
          !Number.isNaN(dt.getTime())
        ) {
          date = dt;
        }
      } catch {}
      // yyyy-MM-ddTHH:mm:ss 형식으로 변환
      const pad = (n: number) => n.toString().padStart(2, '0');
      const captureTime = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      return { file, captureTime };
    }),
  );
}
