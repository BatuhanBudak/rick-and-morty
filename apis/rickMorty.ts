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
    for (let index = 1; index <= total_pages; index++) {
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
export const getCharacters = async (page: number, filter: string) => {
  if (filter === "alive" || filter === "dead" || filter === "unknown") {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}&status=${filter}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } else if (filter === "male" || filter === "female") {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}&gender=${filter}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } else if (filter === "human" || filter === "alien") {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}&species=${filter}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  } else if (!filter) {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
};
