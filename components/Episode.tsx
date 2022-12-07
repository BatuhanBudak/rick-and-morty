import { useQuery } from "@tanstack/react-query";
import React from "react";
import rickMorty from "../apis/rickMorty";

export default function Episode({ id }: { id: string }) {
  const { data, status } = useQuery(["episode", id], async () => {
    const response = await rickMorty.get(`/episode/${id}`);
    return response.data;
  });

  if (status !== "success") {
    return null;
  }

  return (
    <article key={id} className="mb-2">
      <h6 className="text-white">
        {data.episode}. {data.name} - {data.air_date}
      </h6>
    </article>
  );
}
