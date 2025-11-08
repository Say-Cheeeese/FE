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
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 30,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = React.useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition='top-right' /> */}
    </QueryClientProvider>
  );
}
