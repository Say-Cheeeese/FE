'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0, // 실패 피드백을 빠르게 주기위해 retry를 하지않음.
        refetchOnWindowFocus: false,
        staleTime: 1000 * 30,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = React.useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
