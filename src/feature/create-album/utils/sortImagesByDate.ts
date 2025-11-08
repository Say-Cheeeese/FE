import exifr from 'exifr';

// EXIF DateTimeOriginal > CreateDate > ModifyDate > lastModified 우선순위로 최신순 정렬
export async function sortImagesByDate(files: File[]): Promise<File[]> {
  async function getImageCreatedMs(
    file: File,
  ): Promise<{ ts: number; source: 'exif' | 'file' }> {
    try {
      const tags = await exifr.parse(file, {
        pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate'],
        translateValues: true,
      });
      const dt: Date | undefined =
        (tags?.DateTimeOriginal as Date | undefined) ??
        (tags?.CreateDate as Date | undefined) ??
        (tags?.ModifyDate as Date | undefined);
      if (dt && typeof dt.getTime === 'function') {
        const ms = dt.getTime();
        if (!Number.isNaN(ms)) return { ts: ms, source: 'exif' };
      }
    } catch {}
    return { ts: file.lastModified, source: 'file' };
  }

  const fileWithDate = await Promise.all(
    files.map(async (file) => {
      const { ts } = await getImageCreatedMs(file);
      return { file, ts };
    }),
  );
  // 최신순 내림차순 정렬
  fileWithDate.sort((a, b) => b.ts - a.ts);
  return fileWithDate.map((f) => f.file);
}
