import { describe, expect, it } from 'vitest';
import { guessExtension } from './guessExtension';

describe('guessExtension', () => {
  it('returns jpg for image/jpeg blob', () => {
    const blob = new Blob(['data'], { type: 'image/jpeg' });
    expect(guessExtension('ignored', blob)).toBe('jpg');
  });

  it('returns subtype for other image types (e.g. image/png)', () => {
    const blob = new Blob(['data'], { type: 'image/png' });
    expect(guessExtension('ignored', blob)).toBe('png');
  });

  it('uses extension from URL when blob type is not image', () => {
    const blob = new Blob(['data'], { type: 'application/octet-stream' });
    const url = 'https://example.com/file.WEBP?foo=1#hash';

    expect(guessExtension(url, blob)).toBe('webp');
  });

  it('falls back to png when both blob type and URL extension are not useful', () => {
    const blob = new Blob(['data'], { type: '' });
    const url = 'https://example.com/download?id=123';

    expect(guessExtension(url, blob)).toBe('png');
  });
});
