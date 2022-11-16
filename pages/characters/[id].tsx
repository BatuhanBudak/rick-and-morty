import CharacterInfo from "../../components/CharacterInfo";
import rickMorty, { getCharacter } from "../../apis/rickMorty";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { CharacterResponse } from "../../apis/types";
import { useRouter } from "next/router";
type Props = {
  characterData: CharacterResponse;
};

import React from "react";
import { useQuery } from "@tanstack/react-query";

const CharacterInfoPage: NextPage<Props> = ({ characterData }) => {
  const router = useRouter();
  console.log(router);
  return (
    <main
      className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 p-6 "
      style={{ backgroundColor: "rgb(32, 35, 41)" }}
    >
      <CharacterInfo
        thumbUrl={characterData.image}
        name={characterData.name}
        status={characterData.status}
        species={characterData.species}
        type={characterData.type}
        gender={characterData.gender}
        origin={characterData.origin.name}
        location={characterData.location.name}
      />
      <section className="grid justify-center">
        <h3 className="text-white text-3xl mb-3">Featured Episodes</h3>
        {characterData.episode.map((episode) => {
          const episodeUrlParts = episode.split("/").filter(Boolean);
          const episodeId = episodeUrlParts[episodeUrlParts.length - 1];

          return <Episode id={episodeId} key={`episode-${episodeId}`} />;
        })}
      </section>
    </main>
  );
};

function Episode({ id }: { id: string }) {
  const { data, status } = useQuery(["episode", id], async () => {
    const response = await rickMorty.get(`/episode/${id}`);
    return response.data;
  });

  if (status !== "success") {
    return null;
  }

  return (
    <article key={id} className="mb-2">
      <h6 className="text-white ">
        {data.episode}. {data.name} - {data.air_date}
      </h6>
    </article>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const characterData = await getCharacter(id);

  return {
    props: {
      characterData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await rickMorty.get(
    "https://rickandmortyapi.com/api/character"
  );

  const paths = response.data.results.map((character: CharacterResponse) => ({
    params: { id: String(character.id) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
export default CharacterInfoPage;
