import Toast from '@/global/components/toast/Toast';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { convertHeicFilesToJpeg } from './heicToJpeg';

// Mock dependencies
vi.mock('@/global/components/toast/Toast', () => ({
  default: {
    alert: vi.fn(),
  },
}));

vi.mock('heic-to', () => ({
  heicTo: vi.fn().mockImplementation(async ({ blob }) => {
    // Return a dummy blob as if it were a JPEG
    return new Blob(['dummy-jpeg-content'], { type: 'image/jpeg' });
  }),
}));

describe('convertHeicFilesToJpeg', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return original files if no HEIC files are present', async () => {
    const files = [
      new File(['content'], 'test1.jpg', { type: 'image/jpeg' }),
      new File(['content'], 'test2.png', { type: 'image/png' }),
    ];

    const result = await convertHeicFilesToJpeg(files);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('test1.jpg');
    expect(result[1].name).toBe('test2.png');
    expect(Toast.alert).not.toHaveBeenCalled();
  });

  it('should convert HEIC files to JPEG', async () => {
    const files = [
      new File(['heic-content'], 'image.heic', { type: 'image/heic' }),
      new File(['jpg-content'], 'image.jpg', { type: 'image/jpeg' }),
    ];

    const result = await convertHeicFilesToJpeg(files);

    expect(result).toHaveLength(2);
    // The first file should be converted to jpg
    expect(result[0].name).toBe('image.jpg');
    expect(result[0].type).toBe('image/jpeg');
    // The second file should remain as is
    expect(result[1].name).toBe('image.jpg');
    expect(Toast.alert).toHaveBeenCalledWith('변환 중... 0/1');
    expect(Toast.alert).toHaveBeenCalledWith('변환 중... 1/1');
  });

  it('should handle conversion failure gracefully', async () => {
    const { heicTo } = await import('heic-to');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (heicTo as any).mockRejectedValueOnce(new Error('Conversion failed'));

    const files = [
      new File(['heic-content'], 'fail.heic', { type: 'image/heic' }),
    ];

    const result = await convertHeicFilesToJpeg(files);

    expect(result).toHaveLength(1);
    // Should return original file on failure
    expect(result[0].name).toBe('fail.heic');
    expect(Toast.alert).toHaveBeenCalledWith(
      'fail.heic 파일의 변환에 실패했습니다.',
    );
  });
});
