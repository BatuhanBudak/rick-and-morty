import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { APIResponse, EpisodeResponse } from "../../apis/types";
import rickMorty from "../../apis/rickMorty";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";

export default function Episodes() {
  const { ref, inView } = useInView();
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error </p>;
  }

  return (
    <main
      className="text-white mt-16 h-full grid items-center px-5 gap-3"
      style={{ backgroundColor: "rgb(32, 35, 41)" }}
    >
      <h2 className="text-3xl mt-5 text-center">All Episodes</h2>
      {data.pages.map((page) =>
        page.results?.map((episode: EpisodeResponse) => (
          <article className="justify-self-start " key={episode.id}>
            <h6 className="text-xl ">
              {episode.episode} - {episode.name} <em>{episode.air_date}</em>
            </h6>
          </article>
        ))
      )}
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        className=" shadow-sm text-white font-semibold text-sm py-2 px-4 bg-sky-500 rounded-none my-5 mx-auto"
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>

      <div>{isFetchingNextPage || isFetching ? <Spinner /> : null}</div>
    </main>
  );
}
