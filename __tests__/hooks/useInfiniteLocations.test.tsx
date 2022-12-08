import { waitFor, renderHook } from "@testing-library/react";
import useInfiniteLocations from "@/apis/hooks/useInfiniteLocations";
import { createWrapper } from "@/test-utils";
import { fakeLocationsFirst } from "../__mocks__/fakeData/fakeLocations/fakeLocationsFirst";
import { fakeLocationsSecond } from "../__mocks__/fakeData/fakeLocations/fakeLocationsSecond";

describe("useInfiniteLocations", () => {
  it("fetches the locations list", async () => {
    // Fetches Page 1
    const { result } = renderHook(() => useInfiniteLocations(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.status === "success").toBe(true));

    expect(result.current.data?.pages[0]).toStrictEqual(fakeLocationsFirst);

    // Fetches Page 2

    result.current.fetchNextPage();
    await waitFor(() => expect(result.current.isFetchingNextPage).toBe(true));
    await waitFor(() => expect(result.current.isFetchingNextPage).toBe(false));

    expect(result.current.data?.pages).toStrictEqual([
      fakeLocationsFirst,
      fakeLocationsSecond,
    ]);
  });
});
