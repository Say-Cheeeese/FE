'use client';

import { ApiReturns, EP } from '@/global/api/ep';
import { useQueryClient } from '@tanstack/react-query';
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
  userId: number | null;
} {
  const queryClient = useQueryClient();

  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const res = await api.get<ApiReturns['user.userMe']>({
          path: EP.user.userMe(),
          redirectOnAuthError: false,
        });

        queryClient.setQueryData([EP.user.userMe()], res.result);

        if (cancelled) return;

        if (res.code === 200 && res.result) {
          const _userId = res.result.userId;

          setIsAuthed(true);
          setUserId(_userId);
          onAuthed?.();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (cancelled) return;

        const status = err?.response?.status;

        if (status === 401) {
          setIsAuthed(false);
          setUserId(null);
          onUnauthed?.();
        }
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, [onAuthed, onUnauthed]);

  return { isAuthed, userId };
}
