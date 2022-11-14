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
