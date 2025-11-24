'use client';

import { EP } from '@/global/api/ep';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';

interface UseCheckAuthOptions {
  /** 로그인 되어 있을 때 호출할 콜백 (200) */
  onAuthed?: () => void;
  /** 로그인 안 되어 있을 때 호출할 콜백 (401) */
  onUnauthed?: () => void;
}

export function useCheckAuth({
  onAuthed,
  onUnauthed,
}: UseCheckAuthOptions = {}): {
  isAuthed: boolean | null;
} {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const res = await api.get({
          path: EP.user.userMe(),
          redirectOnAuthError: false,
        });

        if (cancelled) return;

        if (res.code === 200) {
          setIsAuthed(true);
          onAuthed?.();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (cancelled) return;

        const status = err?.response?.status;

        if (status === 401) {
          setIsAuthed(false);
          onUnauthed?.();
          return;
        }

        console.log(err);
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [onAuthed, onUnauthed]);

  return { isAuthed };
}
