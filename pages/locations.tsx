import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import rickMorty from "../apis/rickMorty";
import { LocationResponse } from "../apis/types";
import Grid from "../components/Grid";

export default function locations() {
  const { data, status } = useQuery(["locations"], async () => {
    const { data } = await rickMorty.get("/location");
    return data;
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error </p>;
  }
  console.log(data);

  return (
    <div>
      <Grid title="All Locations">
        {data.results?.map((location: LocationResponse) => (
          <article key={location.id}>
            <Link href={`/locations/${location.id}`}>
              <h6>
                {location.name} - {location.dimension} -{" "}
                <em>{location.type}</em>
              </h6>
            </Link>
          </article>
        ))}
      </Grid>
    </div>
  );
}
