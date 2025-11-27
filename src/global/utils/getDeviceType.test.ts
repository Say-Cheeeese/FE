import { describe, expect, it } from 'vitest';
import { getDeviceType } from './getDeviceType';

describe('getDeviceType()', () => {
  //
  // --- iOS ---
  //
  it('should return "ios" for iPhone userAgent', () => {
    expect(
      getDeviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)'),
    ).toBe('ios');
  });

  it('should return "ios" for iPad userAgent', () => {
    expect(getDeviceType('Mozilla/5.0 (iPad; CPU OS 15_2 like Mac OS X)')).toBe(
      'ios',
    );
  });

  it('should return "ios" when userAgent includes wv inside iPhone WebView', () => {
    expect(
      getDeviceType(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1 wv',
      ),
    ).toBe('ios');
  });

  it('should return "ios" for KakaoTalk iOS WebView userAgent', () => {
    expect(
      getDeviceType(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 KAKAOTALK 9.8.5',
      ),
    ).toBe('ios');
  });

  //
  // --- Android ---
  //
  it('should return "android" for typical Android userAgent', () => {
    expect(getDeviceType('Mozilla/5.0 (Linux; Android 12; Pixel 6)')).toBe(
      'android',
    );
  });

  it('should return "android" when userAgent includes wv (Android WebView)', () => {
    expect(
      getDeviceType(
        'Mozilla/5.0 (Linux; Android 11; SM-G973N Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.152 Mobile Safari/537.36',
      ),
    ).toBe('android');
  });

  it('should return "android" for KakaoTalk Android WebView userAgent', () => {
    expect(
      getDeviceType(
        'Mozilla/5.0 (Linux; Android 12; SM-G991N Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.65 Mobile Safari/537.36 KAKAOTALK 10.0.3',
      ),
    ).toBe('android');
  });

  //
  // --- PC ---
  //
  it('should return "pc" for Windows userAgent', () => {
    expect(getDeviceType('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).toBe(
      'pc',
    );
  });

  it('should return "pc" for macOS desktop userAgent', () => {
    expect(
      getDeviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'),
    ).toBe('pc');
  });

  it('should return "pc" when userAgent is empty string', () => {
    expect(getDeviceType('')).toBe('pc');
  });

  it('should return "pc" when userAgent is undefined', () => {
    expect(getDeviceType()).toBe('pc'); // fallback 가정
  });
});
