import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { EpisodeResponse } from "../apis/types";
import rickMorty from "../apis/rickMorty";
import Grid from "../components/Grid";

export default function Episodes() {
  const { data, status } = useQuery(["episodes"], async () => {
    const { data } = await rickMorty.get("/episode");
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
    <Grid title="All Episodes">
      {data.results?.map((episode: EpisodeResponse) => (
        <article key={episode.id}>
          <Link href={`/episodes/${episode.id}`}>
            <h6>
              {episode.episode} - {episode.name} <em>{episode.air_date}</em>
            </h6>
          </Link>
        </article>
      ))}
    </Grid>
  );
}
