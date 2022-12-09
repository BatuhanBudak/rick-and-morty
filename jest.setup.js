// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { defaultFallbackInView } from "react-intersection-observer";

defaultFallbackInView(true);
// polyfill necessary for jsdom test environment
// reference: https://stackoverflow.com/a/68468204
import { TextDecoder, TextEncoder } from "util";

import { server } from "@/__tests__/__mocks__/msw/server";
import { QueryCache } from "@tanstack/react-query";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const queryCache = new QueryCache();
// Establish API mocking before all tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        "Found an unhandled %s request to %s",
        req.method,
        req.url.href
      );
    },
  })
);

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
