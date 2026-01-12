'use client';

import { useEffect } from 'react';
import { GA_EVENTS } from '../constants/gaEvents';
import { trackGaEvent } from '../utils/trackGaEvent';

const KAKAO_REFERER_PREFIX = 'https://accounts.kakao.com';

export default function GlobalClientEffects() {
  useEffect(() => {
    if (document.referrer.startsWith(KAKAO_REFERER_PREFIX)) {
      trackGaEvent(GA_EVENTS.complete_login);
    }
  }, []);

  return null;
}
