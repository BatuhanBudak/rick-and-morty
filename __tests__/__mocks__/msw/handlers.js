import { rest } from "msw";
import {
  summerInfoData,
  summerResultsData,
} from "@/__tests__/__mocks__/fakeData/summerData";
import { fakeEpisodes } from "../fakeData/fakeEpisodes";
import { fakeLocationsFirst } from "../fakeData/fakeLocations/fakeLocationsFirst";
import { fakeLocationsSecond } from "../fakeData/fakeLocations/fakeLocationsSecond";

export const handlers = [
  rest.get(
    "https://rickandmortyapi.com/api/character/",
    async (req, res, ctx) => {
      const name = req.url.searchParams.get("name");
      const page = req.url.searchParams.get("page");
      if (name && page) {
        return res(ctx.json(summerResultsData));
      } else {
        return res(ctx.json(summerInfoData));
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
      ctx.delay(2000);
      if (page === "1") {
        response = fakeLocationsFirst;
      } else if (page === "2") {
        response = fakeLocationsSecond;
      }
      return res(ctx.json(response));
    }
  ),
];
