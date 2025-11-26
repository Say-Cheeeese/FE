// getExifFromUrl.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getExifFromUrl, type PhotoExifInfo } from './getExifFromUrl';

// exifr.parse mock을 hoisted로 정의
const { parseMock } = vi.hoisted(() => {
  const parseMock = vi.fn();
  return { parseMock };
});

// exifr 모듈 mock
vi.mock('exifr', () => ({
  default: {
    parse: parseMock,
  },
}));

describe('getExifFromUrl', () => {
  const IMAGE_URL = 'http://localhost:3000/test/exif-extract-test.jpeg';

  beforeEach(() => {
    parseMock.mockReset();
  });

  it('reads EXIF from image URL and maps date fields to strings', async () => {
    const dateOriginal = new Date('2025-01-02T03:04:05Z');
    const createDate = new Date('2025-01-01T10:00:00Z');
    const modifyDate = new Date('2025-01-03T20:30:40Z');

    // exifr.parse가 리턴할 값
    parseMock.mockResolvedValue({
      DateTimeOriginal: dateOriginal,
      CreateDate: createDate,
      ModifyDate: modifyDate,
    });

    const result = await getExifFromUrl(IMAGE_URL);

    // exifr.parse가 한 번 호출됐는지 + url을 인자로 받았는지
    expect(parseMock).toHaveBeenCalledTimes(1);

    // 날짜들이 string으로 매핑되는지 (toISOString 기준이라고 가정)
    expect(result).toEqual<PhotoExifInfo>({
      takenAt: dateOriginal.toISOString(),
      createdAt: createDate.toISOString(),
      modifiedAt: modifyDate.toISOString(),
    });
  });

  it('handles missing EXIF fields gracefully', async () => {
    const dateOriginal = new Date('2025-01-02T03:04:05Z');

    parseMock.mockResolvedValue({
      DateTimeOriginal: dateOriginal,
      // CreateDate, ModifyDate 없음
    });

    const result = await getExifFromUrl(IMAGE_URL);

    expect(result.takenAt).toBe(dateOriginal.toISOString());
    expect(result.createdAt).toBeUndefined();
    expect(result.modifiedAt).toBeUndefined();
  });

  it('returns empty object when EXIF data is null/undefined', async () => {
    parseMock.mockResolvedValue(null);

    const result = await getExifFromUrl(IMAGE_URL);

    expect(result).toEqual<PhotoExifInfo>({});
  });
});
