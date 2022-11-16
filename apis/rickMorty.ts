import axios from "axios";
import { CharacterResponse } from "./types";

export default axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const getCharacter = async (id = "1"): Promise<CharacterResponse> => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return response.data;
};

export const getCharacterByName = async (
  name = ""
): Promise<CharacterResponse[][] | undefined> => {
  let characters: CharacterResponse[][] = [];

  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
    const total_pages = response.data.info.pages;
    for (let index = 1; index < total_pages + 1; index++) {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${index}&name=${name}`
      );
      characters.push(response.data.results);
    }

    return characters;
  } catch (err) {
    console.error(err);
  }
};
