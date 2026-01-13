type GaEventParams = Record<string, unknown>;

export const trackGaEvent = (eventName: string, params?: GaEventParams) => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, params);
};
