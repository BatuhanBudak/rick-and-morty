import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import rickMorty from "../../apis/rickMorty";
import { APIResponse, CharacterResponse } from "../../apis/types";
import Card from "../../components/Card";
import Grid from "../../components/Grid";
import { useInView } from "react-intersection-observer";

export default function characters() {
  const { ref, inView } = useInView();
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["characters"],
    async ({ pageParam = 1 }) => {
      const res = await rickMorty.get(`/character?page=${pageParam}`);
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
  }, [inView]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error </p>;
  }

  return (
    <div className="px-10 flex flex-col justify-center ">
      <Grid title={"All Characters"}>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.results?.map((person: CharacterResponse) => (
              <article
                className="cursor-pointer hover:opacity-80 duration-300"
                key={person.id}
                style={{ margin: "16px 0 0" }}
              >
                <Link href={`/characters/${person.id}`}>
                  <Card imgUrl={person.image} title={person.name} />
                </Link>
              </article>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        className=" shadow-sm text-white font-semibold text-sm py-2 px-4 bg-sky-500 rounded-none mt-5 mx-auto"
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>

      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
}
