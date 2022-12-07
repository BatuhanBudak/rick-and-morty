import { rest } from "msw";
import {
  summerInfoData,
  summerResultsData,
} from "@/__tests__/__mocks__/fakeData/summerData";

export const handlers = [
  rest.get("https://rickandmortyapi.com/api/character/"),
  async (req, res, ctx) => {
    const name = req.url.searchParams.get("name");
    const page = req.url.searchParams.get("page");
    if (name && page) {
      return res(ctx.json({ data: summerResultsData }));
    } else {
      return res(ctx.json({ data: summerInfoData }));
    }
  },
];
