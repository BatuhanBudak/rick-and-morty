import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CharacterResponse } from "../apis/types";
import Card from "../components/Card";
import Grid from "../components/Grid";
import Spinner from "../components/Spinner";
import { AutoComplete } from "../components/AutoComplete";
import { useRouter } from "next/router";
import useInfiniteCharacters from "../apis/hooks/useInfiniteCharacters";
import { FilterButtons } from "../components/FilterButtons";

export default function characters() {
  const router = useRouter();
  const [filter, setFilter] = useState<string | string[]>("");
  const queryClient = useQueryClient();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteCharacters(filter);

  useEffect(() => {
    if (filter) {
      queryClient.removeQueries({ queryKey: ["characters"], exact: true });
      fetchNextPage();
    }
  }, [fetchNextPage, filter, queryClient]);

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

  return (
    <main className="h-screen ">
      <div
        className="p-10 flex flex-col justify-center "
        style={{ backgroundColor: "rgb(32, 35, 41)" }}
      >
        <AutoComplete />
        <FilterButtons />

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
