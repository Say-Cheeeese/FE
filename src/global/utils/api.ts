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
};

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

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
        const refreshToken = getCookie(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          removeCookie(ACCESS_TOKEN_KEY);
          removeCookie(REFRESH_TOKEN_KEY);
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_URL}/v1/auth/reissue`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.result;

        // 쿠키 갱신
        setCookie(ACCESS_TOKEN_KEY, accessToken, { path: '/' });
        setCookie(REFRESH_TOKEN_KEY, newRefreshToken, {
          path: '/',
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
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
  { path, params, headers, body, redirectOnAuthError = true }: RequestOptions,
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
    if (e.response?.data) {
      throw e.response.data;
    }

    const status = e.response?.status;
    const statusText = e.message || 'Unknown Error';
    const errorMessage = `API Error: ${status ?? 'N/A'}`;

    if (status === 500 || status === 401) {
      // TODO 에러발생 시 공통 토스트 필요하면 추가
      // toast.show(errorMessage);
    }

    if (status === 401) {
      if (redirectOnAuthError) {
        window.location.href = '/login';
      }
    }

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
