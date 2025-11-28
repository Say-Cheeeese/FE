import { presignedAndUploadToNCP } from '@/global/api/presignedAndUploadToNCP';
import { useUploadingStore } from '@/store/useUploadingStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getFilesWithCaptureTime } from './getFilesWithCaptureTime';
import { handleFileUpload } from './handleFileUpload';
import { convertHeicFilesToJpeg } from './heicToJpeg';
import { saveFilesToStore } from './saveFilesToStore';
import { sortImagesByDate } from './sortImagesByDate';
import { validateUpload } from './validateUpload';

// Mock dependencies
vi.mock('@/global/api/presignedAndUploadToNCP', () => ({
  presignedAndUploadToNCP: vi.fn(),
}));

vi.mock('@/store/useUploadingStore', () => ({
  useUploadingStore: {
    getState: vi.fn().mockReturnValue({
      setUploaded: vi.fn(),
      setUploadedCount: vi.fn(),
    }),
  },
}));

vi.mock('./getFilesWithCaptureTime', () => ({
  getFilesWithCaptureTime: vi.fn(),
}));

vi.mock('./heicToJpeg', () => ({
  convertHeicFilesToJpeg: vi.fn(),
}));

vi.mock('./saveFilesToStore', () => ({
  saveFilesToStore: vi.fn(),
}));

vi.mock('./sortImagesByDate', () => ({
  sortImagesByDate: vi.fn(),
}));

vi.mock('./validateUpload', () => ({
  validateUpload: vi.fn(),
}));

describe('handleFileUpload', () => {
  const mockRouter = { push: vi.fn(), replace: vi.fn() };
  const albumId = 'test-album-id';
  const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
  const mockEvent = {
    target: {
      files: [mockFile],
      value: 'some-value',
    },
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementations
    (sortImagesByDate as any).mockResolvedValue([mockFile]);
    (convertHeicFilesToJpeg as any).mockResolvedValue([mockFile]);
    (validateUpload as any).mockResolvedValue({ ok: true });
    (getFilesWithCaptureTime as any).mockResolvedValue([
      { file: mockFile, captureTime: '2023-01-01' },
    ]);
    (presignedAndUploadToNCP as any).mockResolvedValue({
      success: 1,
      failed: 0,
    });
  });

  it('should orchestrate the upload flow correctly', async () => {
    await handleFileUpload(mockEvent, albumId, mockRouter);

    expect(sortImagesByDate).toHaveBeenCalled();
    expect(convertHeicFilesToJpeg).toHaveBeenCalled();
    expect(validateUpload).toHaveBeenCalled();
    expect(useUploadingStore.getState().setUploaded).toHaveBeenCalledWith(true);
    expect(mockRouter.push).toHaveBeenCalledWith(`/album/${albumId}/waiting`);
    expect(getFilesWithCaptureTime).toHaveBeenCalled();
    expect(presignedAndUploadToNCP).toHaveBeenCalled();
    expect(useUploadingStore.getState().setUploadedCount).toHaveBeenCalledWith(
      1,
    );
  });

  it('should handle validation failure', async () => {
    (validateUpload as any).mockResolvedValue({ ok: false, reason: 'size' });

    await handleFileUpload(mockEvent, albumId, mockRouter);

    expect(saveFilesToStore).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith(`/album/${albumId}/waiting`);
    expect(presignedAndUploadToNCP).not.toHaveBeenCalled();
  });

  it('should not redirect if stay option is true', async () => {
    await handleFileUpload(mockEvent, albumId, mockRouter, { stay: true });

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('should clear input value after execution', async () => {
    await handleFileUpload(mockEvent, albumId, mockRouter);

    expect(mockEvent.target.value).toBe('');
  });
});
