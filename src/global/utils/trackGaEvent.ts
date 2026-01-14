type GaParams = Record<string, string>;

export const trackGaEvent = (eventName: string, params?: GaParams): void => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, params);
};

export const trackGaConfig = (tagId: string, params?: GaParams): void => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('config', tagId, params);
};

export const trackGaSet = (name: string, value: string): void => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('set', name, value);
};
