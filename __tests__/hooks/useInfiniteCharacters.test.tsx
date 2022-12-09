import { waitFor, renderHook } from "@testing-library/react";
import useInfiniteCharacters from "@/apis/hooks/useInfiniteCharacters";
import { createWrapper } from "@/test-utils";
import { fakeCharactersFirst } from "../__mocks__/fakeData/fakeCharacters/fakeCharactersFirst";
import { fakeCharactersSecond } from "../__mocks__/fakeData/fakeCharacters/fakeCharactersSecond";

describe("useInfiniteCharacters", () => {
  it("fetches the characters list", async () => {
    // Fetches Page 1
    const { result } = renderHook(() => useInfiniteCharacters(""), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.status === "success").toBe(true));

    expect(result.current.data?.pages[0]).toStrictEqual(fakeCharactersFirst);

    // Fetches Page 2

    await result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.data?.pages).toStrictEqual([
        fakeCharactersFirst,
        fakeCharactersSecond,
      ])
    );
  });
});
