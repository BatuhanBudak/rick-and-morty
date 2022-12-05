import { useInfiniteQuery } from "@tanstack/react-query";
import rickMorty from "../rickMorty";
import { APIResponse } from "../types";

export default function useInfiniteLocations() {
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["locations"],
    async ({ pageParam = 1 }) => {
      const res = await rickMorty.get(`/location?page=${pageParam}`);
      return res.data;
    },
    {
      getNextPageParam: (lastPage: APIResponse, pages) => {
        if (lastPage.info.next) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );
  return {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}
