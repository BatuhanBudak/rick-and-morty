import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import rickMorty from "../apis/rickMorty";
import { APIResponse, LocationResponse } from "../apis/types";

export default function locations() {
  const ref = useRef<HTMLButtonElement | null>(null);
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
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error </p>;
  }

  return (
    <div className="flex flex-col justify-center p-5 pt-2 md:p-10 md:pt-5">
      <table className="w-full text-sm md:text-base table-auto border-collapse border border-slate-400 mt-5 text-left">
        <thead
          style={{
            color: "rgb(79,89,102)",
          }}
        >
          <tr>
            <th className="border border-slate-300 p-1" scope="col">
              ID
            </th>
            <th className="border border-slate-300 p-1" scope="col">
              Name
            </th>
            <th className="border border-slate-300 p-1" scope="col">
              Type
            </th>
            <th className="border border-slate-300 p-1" scope="col">
              Dimension
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.results?.map((location: LocationResponse) => (
                <tr key={location.id}>
                  <th
                    style={{
                      color: "rgb(79,89,102)",
                    }}
                    className="border border-slate-300 p-1"
                    scope="row"
                  >
                    {location.id}-
                  </th>
                  <td className="border border-slate-300 p-1">
                    {location.name}
                  </td>
                  <td className="border border-slate-300 p-1">
                    {location.type}
                  </td>
                  <td className="border border-slate-300 p-1">
                    {location.dimension}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

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
