import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "../rickMorty";
import { APIResponse } from "../types";

export default function useInfiniteCharacters(filter: string | string[]) {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    error,
  } = useInfiniteQuery(
    ["characters"],
    async ({ pageParam = 1 }) => {
      return getCharacters(pageParam, filter);
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
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    status,
    error,
  };
}
