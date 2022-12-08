import { QueryCache, QueryClient } from "@tanstack/react-query";

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "error connecting to server";
  console.error(title);
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),
    defaultOptions: {
      queries: {
        staleTime: 600000,
        cacheTime: 900000,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    },
  });
}

export const queryClient = generateQueryClient();
