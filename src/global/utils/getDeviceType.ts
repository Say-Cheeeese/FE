export type DeviceType = 'ios' | 'android' | 'pc';

export function getDeviceType(userAgent?: string): DeviceType {
  const ua = (
    userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '')
  ).toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios';
  }

  if (/android/.test(ua)) {
    return 'android';
  }

  // 그 외는 전부 PC 취급
  return 'pc';
}
