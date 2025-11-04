import axios, { type AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN_KEY } from '../constants/cookies';
import { buildQuery } from './buildQuery';

const API_URL = 'https://dev.say-cheese.me';

const serverClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Server Component용 요청 인터셉터 - cookies()에서 토큰 가져오기
serverClient.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

type RequestOptions = {
  path: string;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  body?: unknown;
};

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  { path, params, headers, body }: RequestOptions,
): Promise<{
  result: T;
  code: number;
  isSuccess: boolean;
  message: string;
}> {
  const queryString = buildQuery(params);
  const url = `${path}${queryString || ''}`;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data: body,
  };

  try {
    const response = await serverClient.request(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusText = error.response?.statusText || 'Unknown Error';
      const errorMessage = error.response?.data?.message || 'API Error: N/A';

      // 401 또는 "인증이 필요합니다" 메시지 시 로그인 페이지로 리다이렉트
      if (
        error.response?.status === 401 ||
        errorMessage.includes('인증이 필요합니다')
      ) {
        // redirect('/login');
      }

      console.error('Server API Error:', {
        url,
        statusText,
        errorMessage,
        baseURL: API_URL,
      });
      throw new Error(`${errorMessage} ${statusText}`);
    }
    throw error;
  }
}

export const serverApi = {
  get: <T>(options: Omit<RequestOptions, 'body'>) => request<T>('GET', options),
  post: <T>(options: RequestOptions) => request<T>('POST', options),
  put: <T>(options: RequestOptions) => request<T>('PUT', options),
  delete: <T>(options: RequestOptions) => request<T>('DELETE', options),
  patch: <T>(options: RequestOptions) => request<T>('PATCH', options),
};
