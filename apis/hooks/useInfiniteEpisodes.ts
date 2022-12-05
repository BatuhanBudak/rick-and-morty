import { useInfiniteQuery } from "@tanstack/react-query";
import rickMorty from "../rickMorty";
import { APIResponse } from "../types";

export default function useInfiniteEpisodes() {
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["episodes"],
    async ({ pageParam = 1 }) => {
      const res = await rickMorty.get(`/episode?page=${pageParam}`);
      return res.data;
    },
    {
      getNextPageParam: (lastPage: APIResponse, pages: APIResponse[]) => {
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
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}
