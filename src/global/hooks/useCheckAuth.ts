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
        console.log('err 타입', err);
        if (cancelled) return;

        const status = err?.response?.status;
        const code = err?.code;

        // 401 에러 또는 refresh token 없음 에러 처리, 혹은 그 외 에러도 비로그인 처리
        if (
          status === 401 ||
          code === 401 ||
          err?.message?.includes('No refresh token')
        ) {
          setIsAuthed(false);
          setUserId(null);
          onUnauthed?.();
        } else {
          // 그 외 에러 상황에서도(네트워크 에러 등) 일단 비로그인으로 간주하여 무한 로딩 방지
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
