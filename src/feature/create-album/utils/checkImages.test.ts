import { checkAvailableCount } from '@/feature/create-album/api/checkAvailableCount';
import { validateImages } from '@/feature/create-album/utils/validateImages';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { checkImages } from './checkImages';

// Mock dependencies
vi.mock('@/feature/create-album/api/checkAvailableCount', () => ({
  checkAvailableCount: vi.fn(),
}));

vi.mock('@/feature/create-album/utils/validateImages', () => ({
  validateImages: vi.fn(),
}));

describe('checkImages', () => {
  const mockFiles = [new File([], 'test1.jpg')];
  const albumId = 'test-album-id';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return oversized files and available count', async () => {
    const mockOversizedFiles = ['oversized.jpg'];
    const mockAvailableCount = 10;

    (validateImages as any).mockReturnValue({
      oversizedFiles: mockOversizedFiles,
    });
    (checkAvailableCount as any).mockResolvedValue(mockAvailableCount);

    const result = await checkImages(mockFiles, albumId);

    expect(result).toEqual({
      oversizedFiles: mockOversizedFiles,
      availableCount: mockAvailableCount,
    });
    expect(validateImages).toHaveBeenCalledWith(mockFiles);
    expect(checkAvailableCount).toHaveBeenCalledWith(albumId);
  });
});
