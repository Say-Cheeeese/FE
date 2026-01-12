type GaEventParams = Record<string, unknown>;

export const trackGaEvent = (eventName: string, params?: GaEventParams) => {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    return;
  }

  const dataLayer = (window.dataLayer = window.dataLayer ?? []);
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: eventName, ...(params ?? {}) });
  }
};
