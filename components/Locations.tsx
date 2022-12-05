import React, { useRef } from "react";
import useInfiniteLocations from "../apis/hooks/useInfiniteLocations";
import { LocationResponse } from "../apis/types";
import Spinner from "./Spinner";

export default function Locations() {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteLocations();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main
      className="flex flex-col justify-center mt-16 p-5 pt-2 md:p-10 md:pt-5"
      style={{ backgroundColor: "rgb(32, 35, 41)" }}
    >
      <div>{isFetchingNextPage ? <Spinner /> : null}</div>
      <table className="w-full text-white text-sm md:text-base table-auto border-collapse border border-slate-400 mt-5 text-left">
        <thead>
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
                  <th className="border border-slate-300 p-1" scope="row">
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
    </main>
  );
}
