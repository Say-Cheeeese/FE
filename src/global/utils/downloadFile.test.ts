import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadFile } from './downloadFile';

const { fileSpy, generateAsyncSpy, JSZipMock, jsZipCtorSpy } = vi.hoisted(
  () => {
    const fileSpy = vi.fn();
    const generateAsyncSpy = vi.fn();
    const jsZipCtorSpy = vi.fn();

    class JSZipMock {
      file = fileSpy;
      generateAsync = generateAsyncSpy;

      constructor() {
        jsZipCtorSpy();
      }
    }

    return { fileSpy, generateAsyncSpy, JSZipMock, jsZipCtorSpy };
  },
);
vi.mock('jszip', () => ({
  default: JSZipMock,
}));

// ======================
// Fake DOM / globals
// ======================
class FakeAnchor {
  href = '';
  download = '';
  click = vi.fn();
}

class FakeBody {
  appendChild = vi.fn((el) => el);
  removeChild = vi.fn((el) => el);
}

class FakeDocument {
  body: FakeBody = new FakeBody();
  createElement(tag: string) {
    if (tag === 'a') return new FakeAnchor();
    throw new Error(`Unsupported tag: ${tag}`);
  }
}

const fetchMock = vi.fn();
const createObjectURLMock = vi.fn(() => 'blob:object-url');
const revokeObjectURLMock = vi.fn();

beforeEach(() => {
  fileSpy.mockReset();
  generateAsyncSpy.mockReset();
  generateAsyncSpy.mockResolvedValue(new Blob(['zip data']));
  jsZipCtorSpy.mockReset();

  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);

  const fakeDoc = new FakeDocument();
  vi.stubGlobal('document', fakeDoc as unknown as Document);

  createObjectURLMock.mockClear();
  revokeObjectURLMock.mockClear();
  vi.stubGlobal('URL', {
    createObjectURL: createObjectURLMock,
    revokeObjectURL: revokeObjectURLMock,
  });
});

afterEach(() => {
  // Vitest 버전에 따라 있을 수도, 없을 수도 있어서 방어적으로 처리
  if (typeof vi.unstubAllGlobals === 'function') {
    vi.unstubAllGlobals();
  }
  vi.restoreAllMocks();
});

// ======================
// downloadFile 테스트
// ======================

describe('downloadFile', () => {
  it('does nothing when given an empty array', async () => {
    await downloadFile([]);

    expect(fetchMock).not.toHaveBeenCalled();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((document.body.appendChild as any).mock.calls.length).toBe(0);
  });

  it('downloads a single Blob without fileName using guessed extension (png)', async () => {
    const imageBlob = new Blob(['png data'], { type: 'image/png' });

    await downloadFile(imageBlob);

    expect(fetchMock).not.toHaveBeenCalled();
    expect(createObjectURLMock).toHaveBeenCalledWith(imageBlob);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendCall = (document.body.appendChild as any).mock.calls[0];
    const link = appendCall[0] as FakeAnchor;

    expect(link.href).toBe('blob:object-url');
    expect(link.download).toBe('download.png');
    expect(link.click).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:object-url');
  });

  it('downloads a single Blob with explicit fileName including extension (uses as-is)', async () => {
    const imageBlob = new Blob(['jpg data'], { type: 'image/jpeg' });

    await downloadFile(imageBlob, 'my-photo.jpg');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendCall = (document.body.appendChild as any).mock.calls[0];
    const link = appendCall[0] as FakeAnchor;

    // 확장자가 이미 있으므로 그대로 사용
    expect(link.download).toBe('my-photo.jpg');
  });

  it('downloads a single Blob with fileName without extension (appends guessed ext)', async () => {
    const imageBlob = new Blob(['jpg data'], { type: 'image/jpeg' });

    await downloadFile(imageBlob, 'my-photo');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendCall = (document.body.appendChild as any).mock.calls[0];
    const link = appendCall[0] as FakeAnchor;

    // jpeg → jpg
    expect(link.download).toBe('my-photo.jpg');
  });

  it('downloads a single URL and derives extension from URL when blob type is empty', async () => {
    const imageBlob = new Blob(['data'], { type: '' });

    fetchMock.mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(imageBlob),
    });

    const url = 'https://example.com/path/photo.jpeg?foo=1#hash';

    await downloadFile(url);

    expect(fetchMock).toHaveBeenCalledWith(url, { mode: 'cors' });
    expect(createObjectURLMock).toHaveBeenCalledWith(imageBlob);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendCall = (document.body.appendChild as any).mock.calls[0];
    const link = appendCall[0] as FakeAnchor;

    // URL에서 .jpeg 추출
    expect(link.download).toBe('download.jpeg');
  });

  it('throws an error when fetch for URL fails', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      blob: () => Promise.resolve(new Blob()),
    });

    await expect(downloadFile('https://example.com/photo')).rejects.toThrow(
      '파일 다운로드에 실패했습니다.',
    );
  });

  it('zips multiple blobs, names inner files, and triggers a download', async () => {
    const b1 = new Blob(['img1'], { type: 'image/jpeg' });
    const b2 = new Blob(['img2'], { type: 'image/png' });

    await downloadFile([b1, b2], 'my-photos');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(jsZipCtorSpy).toHaveBeenCalledTimes(1);

    // 내부 파일 2개 추가
    expect(fileSpy).toHaveBeenCalledTimes(2);
    expect(fileSpy).toHaveBeenNthCalledWith(1, 'image_01.jpg', b1);
    expect(fileSpy).toHaveBeenNthCalledWith(2, 'image_02.png', b2);

    expect(generateAsyncSpy).toHaveBeenCalledWith({ type: 'blob' });

    const zipBlob = (await generateAsyncSpy.mock.results[0].value) as Blob;
    expect(createObjectURLMock).toHaveBeenCalledWith(zipBlob);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendCall = (document.body.appendChild as any).mock.calls[0];
    const link = appendCall[0] as FakeAnchor;

    expect(link.href).toBe('blob:object-url');
    expect(link.download).toBe('my-photos.zip');
    expect(link.click).toHaveBeenCalled();
  });

  it('keeps .zip suffix if fileName already ends with .zip', async () => {
    const b1 = new Blob(['img1'], { type: 'image/png' });

    await downloadFile([b1], 'album.zip');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendCall = (document.body.appendChild as any).mock.calls[0];
    const link = appendCall[0] as FakeAnchor;

    expect(link.download).toBe('album.zip');
  });

  it('handles mixed URLs and Blobs and zips them together', async () => {
    const urlBlob = new Blob(['from-url'], { type: 'image/jpeg' });
    const directBlob = new Blob(['direct'], { type: 'image/png' });

    fetchMock.mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(urlBlob),
    });

    await downloadFile(['https://example.com/a.jpg', directBlob], 'mix');

    expect(fetchMock).toHaveBeenCalledTimes(1);

    // 첫 번째: URL에서 온 jpeg → jpg
    expect(fileSpy).toHaveBeenNthCalledWith(1, 'image_01.jpg', urlBlob);
    // 두 번째: Blob에서 온 png
    expect(fileSpy).toHaveBeenNthCalledWith(2, 'image_02.png', directBlob);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appendCall = (document.body.appendChild as any).mock.calls[0];
    const link = appendCall[0] as FakeAnchor;

    expect(link.download).toBe('mix.zip');
  });
});
