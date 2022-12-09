import { waitFor, renderHook } from "@testing-library/react";
import useInfiniteEpisodes from "@/apis/hooks/useInfiniteEpisodes";
import { createWrapper } from "@/test-utils";
import { fakeEpisodesFirst } from "../__mocks__/fakeData/fakeEpisodes/fakeEpisodesFirst";
import { fakeEpisodesSecond } from "../__mocks__/fakeData/fakeEpisodes/fakeEpisodesSecond";

describe("useInfiniteEpisodes", () => {
  it("fetches the episodes list", async () => {
    // Fetches Page 1
    const { result } = renderHook(() => useInfiniteEpisodes(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.status === "success").toBe(true));

    expect(result.current.data?.pages[0]).toStrictEqual(fakeEpisodesFirst);

    // Fetches Page 2

    await result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.data?.pages).toStrictEqual([
        fakeEpisodesFirst,
        fakeEpisodesSecond,
      ])
    );
  });
});
