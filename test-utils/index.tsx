/* eslint-disable no-console */

import { render, RenderResult } from "@testing-library/react";
import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { generateQueryClient } from "../react-query/queryClient";

// // suppress errors written to console
// setLogger({
//   log: console.log,
//   warn: console.warn,
//   error: () => {
//     // swallow the errors
//   },
// });

// make this a function for unique queryClient per test
const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}
