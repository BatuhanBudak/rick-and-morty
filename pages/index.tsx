import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { APIResponse, CharacterResponse } from "../apis/types";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Spinner from "../components/Spinner";
import { AutoComplete } from "../components/AutoComplete";
import { getCharacters } from "../apis/rickMorty";
import { useRouter } from "next/router";
export default function characters() {
  const router = useRouter();

  const [filter, setFilter] = useState<string | string[]>("");
  const queryClient = useQueryClient();
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
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
        // enabled: !!filter,
      }
    );

  useEffect(() => {
    if (filter) {
      queryClient.removeQueries({ queryKey: ["characters"], exact: true });
      fetchNextPage();
    }
  }, [fetchNextPage, filter]);

  useEffect(() => {
    if (router.isReady) {
      const { gender, species, status } = router.query;
      if (gender) {
        setFilter(gender);
      } else if (species) {
        setFilter(species);
      } else if (status) {
        setFilter(status);
      }
    }
  }, [router.isReady, router.query]);

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
          <Link
            href={`/?page=1&gender=male`}
            className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
          >
            Male Characters
          </Link>
          <Link
            href={`/?page=1&gender=female`}
            className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
          >
            Female Characters
          </Link>
          <Link
            href={`/?page=1&species=human`}
            className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
          >
            Human Characters
          </Link>
          <Link
            href={`/?page=1&species=alien`}
            className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
          >
            Alien Characters
          </Link>
          <Link
            href={`/?page=1&status=alive`}
            className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
          >
            Alive Characters
          </Link>
          <Link
            href={`/?page=1&status=dead`}
            className="button leading-4 w-2/5 md:w-auto md:leading-6 px-2 py-1 text-white bg-sky-500 hover:bg-sky-600 shadow-sm"
            // onClick={() => setFilter("dead")}
          >
            Dead Characters
          </Link>
        </div>

        <Grid title={filter ? `All ${filter} characters` : "All characters"}>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.results?.map((person: CharacterResponse) => (
                <article
                  className="mt-4 cursor-pointer hover:opacity-80 duration-300"
                  key={person.id}
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
