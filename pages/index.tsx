import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { APIResponse, CharacterResponse } from "../apis/types";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Spinner from "../components/Spinner";
import { AutoComplete } from "../components/AutoComplete";
import { getCharacters } from "../apis/rickMorty";

export default function characters() {
  const [filter, setFilter] = useState("");
  const queryClient = useQueryClient();
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["characters"],
      async ({ pageParam = 1 }) => {
        const res = getCharacters(pageParam, filter);
        return res;
      },
      {
        getNextPageParam: (lastPage: APIResponse, pages: APIResponse[]) => {
          if (lastPage.info.next) {
            return pages.length + 1;
          }
          return undefined;
        },
        enabled: !!filter,
      }
    );

  useEffect(() => {
    if (filter) {
      queryClient.removeQueries({ queryKey: ["characters"], exact: true });
      fetchNextPage();
    }
  }, [fetchNextPage, filter]);

  if (status === "error") {
    return <p>Error </p>;
  }

  return (
    <main className="h-screen ">
      <div
        className="p-10 flex flex-col justify-center "
        style={{ backgroundColor: "rgb(32, 35, 41)" }}
      >
        <AutoComplete />
        <div className="flex flex-wrap md:flex-row md:flex-nowrap justify-center gap-3 md:gap-4">
          <button
            className="button leading-4 w-2/5 md:w-auto px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
            onClick={() => setFilter("male")}
          >
            Male Characters
          </button>
          <button
            className="button leading-4 w-2/5 md:w-auto px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
            onClick={() => setFilter("female")}
          >
            Female Characters
          </button>
          <button
            className="button leading-4 w-2/5 md:w-auto px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
            onClick={() => setFilter("human")}
          >
            Human Characters
          </button>
          <button
            className="button leading-4 w-2/5 md:w-auto px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
            onClick={() => setFilter("alien")}
          >
            Alien Characters
          </button>
          <button
            className="button leading-4 w-2/5 md:w-auto px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
            onClick={() => setFilter("alive")}
          >
            Alive Characters
          </button>
          <button
            className="button leading-4 w-2/5 md:w-auto px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
            onClick={() => setFilter("dead")}
          >
            Dead Characters
          </button>
        </div>

        <Grid title={filter ? `All ${filter} characters` : ""}>
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
          onClick={() => fetchNextPage()}
          className=" shadow-sm text-white font-semibold text-sm py-2 px-4 bg-sky-500 rounded-none mt-5 mx-auto hover:bg-sky-600"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>

        <div>{isFetchingNextPage ? <Spinner /> : null}</div>
      </div>
    </main>
  );
}
