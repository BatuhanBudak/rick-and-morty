import { rest } from "msw";
import {
  summerInfoData,
  summerResultsData,
} from "@/__tests__/__mocks__/fakeData/summerData";
import { fakeEpisodes } from "../fakeData/fakeEpisodes";
import { fakeLocationsFirst } from "../fakeData/fakeLocations/fakeLocationsFirst";
import { fakeLocationsSecond } from "../fakeData/fakeLocations/fakeLocationsSecond";
import { fakeEpisodesFirst } from "../fakeData/fakeEpisodes/fakeEpisodesFirst";
import { fakeEpisodesSecond } from "../fakeData/fakeEpisodes/fakeEpisodesSecond";
import { fakeCharactersFirst } from "../fakeData/fakeCharacters/fakeCharactersFirst";
import { fakeCharactersSecond } from "../fakeData/fakeCharacters/fakeCharactersSecond";

export const handlers = [
  rest.get(
    "https://rickandmortyapi.com/api/character/",
    async (req, res, ctx) => {
      const name = req.url.searchParams.get("name");
      const page = req.url.searchParams.get("page");

      if (name === "summer" && page) {
        return res(ctx.json(summerResultsData));
      } else if (name === "summer") {
        return res(ctx.json(summerInfoData));
      } else if (page === "1") {
        return res(ctx.json(fakeCharactersFirst));
      } else if (page === "2") {
        return res(ctx.json(fakeCharactersSecond));
      }
    }
  ),
  rest.get(
    "https://rickandmortyapi.com/api/episode/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      return res(ctx.json(fakeEpisodes.results[Number(id) - 1]));
    }
  ),
  rest.get(
    "https://rickandmortyapi.com/api/location/",
    async (req, res, ctx) => {
      const page = req.url.searchParams.get("page");
      let response;

      if (page === "1") {
        response = fakeLocationsFirst;
      } else if (page === "2") {
        response = fakeLocationsSecond;
      }
      ctx.delay(1200);
      return res(ctx.json(response));
    }
  ),
  rest.get(
    "https://rickandmortyapi.com/api/episode/",
    async (req, res, ctx) => {
      const page = req.url.searchParams.get("page");
      let response;

      if (page === "1") {
        response = fakeEpisodesFirst;
      } else if (page === "2") {
        response = fakeEpisodesSecond;
      }
      ctx.delay(1200);
      return res(ctx.json(response));
    }
  ),
];
