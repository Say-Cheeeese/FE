import exifr from 'exifr';

export interface PhotoExifInfo {
  takenAt?: string; // DateTimeOriginal
  createdAt?: string; // CreateDate
  modifiedAt?: string; // ModifyDate
}

/**
 * 이미지 URL에서 EXIF 메타데이터(촬영 시점 등)를 추출하는 함수
 * - CORS 허용된 URL이어야 함
 */
export async function getExifFromUrl(imageUrl: string): Promise<PhotoExifInfo> {
  const res = await fetch(imageUrl, { mode: 'cors' });
  console.log(res);
  if (!res.ok) {
    throw new Error('이미지를 불러오지 못했습니다.');
  }

  const blob = await res.blob();

  // exifr로 EXIF 파싱
  // DateTimeOriginal: 실제 촬영 시점
  // CreateDate: 파일이 생성된 시점
  // ModifyDate: 수정된 시점
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exif: any = await exifr.parse(blob, [
    'DateTimeOriginal',
    'CreateDate',
    'ModifyDate',
  ]);

  if (!exif) return {};

  const toISOString = (date: Date | undefined) =>
    date ? new Date(date).toISOString() : undefined;

  return {
    takenAt: toISOString(exif.DateTimeOriginal),
    createdAt: toISOString(exif.CreateDate),
    modifiedAt: toISOString(exif.ModifyDate),
  };
}
