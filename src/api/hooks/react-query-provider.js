import React from 'react';
import {QueryClientProvider, QueryClient} from 'react-query';

export function ReactQueryProvider({children}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
