import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/cookies';
import { buildQuery } from './buildQuery';
import { getCookie, removeCookie, setCookie } from './cookies';

// TODO : 공통으로 사용하는 api url 을 사용해야함. 임시 상수 생성
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestOptions = {
  path: string;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
  redirectOnAuthError?: boolean;
  /** 401 발생 시 로그인 후 돌아올 경로를 명시적으로 지정 (없으면 현재 URL 사용) */
  redirectUrlOnAuthError?: string;
};

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

// 토큰 갱신 중복 방지를 위한 Promise 저장소
let refreshTokenPromise: Promise<string> | null = null;

client.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // TODO 401이 떠도 토큰갱신 필요없는경우 정의
      //   if (     originalRequest.url?.includes('/auth/login')) {
      //     return Promise.reject(error);
      //   }

      originalRequest._retry = true;

      try {
        // 이미 토큰 갱신 중이면 해당 Promise를 재사용
        if (!refreshTokenPromise) {
          refreshTokenPromise = (async () => {
            const refreshToken = getCookie(REFRESH_TOKEN_KEY);
            if (!refreshToken) {
              removeCookie(ACCESS_TOKEN_KEY);
              removeCookie(REFRESH_TOKEN_KEY);
              throw new Error('No refresh token');
            }

            const response = await axios.post(`${API_URL}/v1/auth/reissue`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } =
              response.data.result;

            // 쿠키 갱신 - 서버와 동일한 도메인 설정 사용
            const cookieOptions = {
              path: '/',
              domain:
                process.env.NODE_ENV === 'production'
                  ? '.say-cheese.me'
                  : undefined,
            };

            setCookie(ACCESS_TOKEN_KEY, accessToken, cookieOptions);
            setCookie(REFRESH_TOKEN_KEY, newRefreshToken, cookieOptions);

            return accessToken;
          })();
        }

        // 토큰 갱신 완료 대기 (모든 요청이 같은 Promise를 기다림)
        const accessToken = await refreshTokenPromise;

        // 갱신 완료 후 Promise 초기화
        refreshTokenPromise = null;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        // 갱신 실패 시 Promise 초기화
        refreshTokenPromise = null;

        removeCookie(ACCESS_TOKEN_KEY);
        removeCookie(REFRESH_TOKEN_KEY);
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  {
    path,
    params,
    headers,
    body,
    redirectOnAuthError = true,
    redirectUrlOnAuthError,
  }: RequestOptions,
): Promise<{
  result: T;
  code: number;
  isSuccess: boolean;
  message: string;
}> {
  const url = `${path}${buildQuery(params)}`;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    ...(method === 'GET' ? {} : { data: body }),
  };

  try {
    const res = await client.request<{
      result: T;
      code: number;
      isSuccess: boolean;
      message: string;
    }>(config);
    return res.data;
  } catch (err) {
    const e = err as AxiosError<{
      code: number;
      isSuccess: boolean;
      message: string;
    }>;

    const status = e.response?.status;

    if (status === 500 || status === 401) {
      // TODO 에러발생 시 공통 토스트 필요하면 추가
      // toast.show(errorMessage);
    }

    if (status === 401) {
      if (redirectOnAuthError) {
        const redirectTarget = redirectUrlOnAuthError || window.location.href;
        const encodedRedirect = encodeURIComponent(redirectTarget);
        window.location.href = `/login${buildQuery({ redirect: encodedRedirect })}`;
      }
    }

    if (e.response?.data) {
      throw e.response.data;
    }

    const statusText = e.message || 'Unknown Error';
    const errorMessage = `API Error: ${status ?? 'N/A'}`;

    throw new Error(`${errorMessage} ${statusText}`);
  }
}

export const api = {
  get: <T>(options: RequestOptions) => request<T>('GET', options),
  post: <T>(options: RequestOptions) => request<T>('POST', options),
  put: <T>(options: RequestOptions) => request<T>('PUT', options),
  delete: <T>(options: RequestOptions) => request<T>('DELETE', options),
  patch: <T>(options: RequestOptions) => request<T>('PATCH', options),
};
