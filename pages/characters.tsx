import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import rickMorty from "../apis/rickMorty";
import { CharacterResponse } from "../apis/types";
import Grid from "../components/Grid";

export default function characters() {
  const { data, status } = useQuery(["characters"], async () => {
    const { data } = await rickMorty.get("/character");
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
      <Grid title={"All Characters"}>
        {data.results?.map((person: CharacterResponse) => (
          <article key={person.id} style={{ margin: "16px 0 0" }}>
            <Link href={`/characters/${person.id}`}>
              <h6>
                {person.name} - {person.gender}: {person.species}
              </h6>
            </Link>
          </article>
        ))}
      </Grid>
    </div>
  );
}
