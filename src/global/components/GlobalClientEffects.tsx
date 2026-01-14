'use client';

import { useEffect } from 'react';
import { GA_EVENTS } from '../constants/gaEvents';
import { trackGaEvent } from '../utils/trackGaEvent';

export default function GlobalClientEffects() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const authType = url.searchParams.get('authType');

    if (authType === 'signup') {
      trackGaEvent(GA_EVENTS.complete_signup);
    } else if (authType === 'login') {
      trackGaEvent(GA_EVENTS.complete_login);
    } else {
      return;
    }

    // 로깅찍고 authType 파라미터는 제거
    url.searchParams.delete('authType');
    window.history.replaceState({}, '', url.toString());
  }, []);

  return null;
}
