import { checkAvailableCount } from '@/feature/create-album/api/checkAvailableCount';
import { validateImageCount } from '@/feature/create-album/utils/validateImages';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { validateUpload } from './validateUpload';

// Mock dependencies
vi.mock('@/feature/create-album/api/checkAvailableCount', () => ({
  checkAvailableCount: vi.fn(),
}));

vi.mock('@/feature/create-album/utils/validateImages', () => ({
  validateImageCount: vi.fn(),
}));

describe('validateUpload', () => {
  const mockFiles = [new File([], 'test1.jpg'), new File([], 'test2.jpg')];
  const albumId = 'test-album-id';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return ok: true when validation passes', async () => {
    // Mock validateImageCount to return 0 (no oversized files)
    (validateImageCount as any).mockReturnValue(0);
    // Mock checkAvailableCount to return enough space
    (checkAvailableCount as any).mockResolvedValue(5);

    const result = await validateUpload(mockFiles, albumId);

    expect(result).toEqual({ ok: true });
  });

  it('should return ok: false with reason: size when files are oversized', async () => {
    // Mock validateImageCount to return 1 (1 oversized file)
    (validateImageCount as any).mockReturnValue(1);
    // Mock checkAvailableCount to return enough space
    (checkAvailableCount as any).mockResolvedValue(5);

    const result = await validateUpload(mockFiles, albumId);

    expect(result).toEqual({ ok: false, reason: 'size' });
  });

  it('should return ok: false with reason: count when file count exceeds limit', async () => {
    // Mock validateImageCount to return 0
    (validateImageCount as any).mockReturnValue(0);
    // Mock checkAvailableCount to return less than file count
    (checkAvailableCount as any).mockResolvedValue(1);

    const result = await validateUpload(mockFiles, albumId);

    expect(result).toEqual({ ok: false, reason: 'count' });
  });

  it('should return ok: false with reason: both when both checks fail', async () => {
    // Mock validateImageCount to return 1
    (validateImageCount as any).mockReturnValue(1);
    // Mock checkAvailableCount to return less than file count
    (checkAvailableCount as any).mockResolvedValue(1);

    const result = await validateUpload(mockFiles, albumId);

    expect(result).toEqual({ ok: false, reason: 'both' });
  });
});
