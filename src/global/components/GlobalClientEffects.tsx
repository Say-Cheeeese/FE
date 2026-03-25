'use client';

import { useEffect } from 'react';
import { GA_EVENTS } from '../constants/gaEvents';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { trackGaEvent, trackGaSet } from '../utils/trackGaEvent';

export default function GlobalClientEffects() {
  const { userId } = useCheckAuth();

  useEffect(() => {
    // A/B Test Group Allocation
    const match = document.cookie.match(/(^| )ab_test_group=([^;]+)/);
    let group = match ? match[2] : null;

    if (!group) {
      group = Math.random() < 0.5 ? 'A' : 'B';
      const d = new Date();
      d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      document.cookie = `ab_test_group=${group};path=/;expires=${d.toUTCString()}`;
    }

    trackGaEvent('ab_test_group_trigger', {
      ab_test_group: group,
    });
  }, []);

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

  useEffect(() => {
    if (userId) {
      trackGaSet('user_id', `${userId}`);
    }
  }, [userId]);

  return null;
}
