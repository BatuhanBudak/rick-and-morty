import CharacterInfo from "../../components/CharacterInfo";
import { getCharacter } from "../../apis/rickMorty";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { CharacterResponse } from "../../apis/types";

type Props = {
  characterData: CharacterResponse;
};

import React from "react";

const CharacterInfoPage: NextPage<Props> = ({ characterData }) => {
  return (
    <main>
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
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const characterData = await getCharacter(id);
  console.log(characterData);

  return {
    props: {
      characterData,
    },
    revalidate: 60 * 60 * 24, // Re-build page every 24 hours
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export default CharacterInfoPage;
