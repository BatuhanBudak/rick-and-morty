import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { AutoComplete } from "../components/AutoComplete";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import { CharacterResponse } from "../apis/types";

// const server = setupServer(
//   rest.get(
//     "https://rickandmortyapi.com/api/character/?name=rick",
//     (_req, res, ctx) => {
//       return res(
//         ctx.json<CharacterResponse>({
//           id: 1,
//           name: "Rick Sanchez",
//           status: "Alive",
//           species: "Human",
//           type: "",
//           gender: "Male",
//           origin: {
//             name: "Earth",
//             url: "https://rickandmortyapi.com/api/location/1",
//           },
//           location: {
//             name: "Earth",
//             url: "https://rickandmortyapi.com/api/location/20",
//           },
//           image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//           episode: [
//             "https://rickandmortyapi.com/api/episode/1",
//             "https://rickandmortyapi.com/api/episode/2",
//           ],
//           url: "https://rickandmortyapi.com/api/character/1",
//           created: "2017-11-04T18:48:46.250Z",
//         })
//       );
//     }
//   )
// );

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe("Autocomplete", () => {
  test("Correctly renders the data", () => {
    render(<AutoComplete />);
    const inputEle = screen.getByRole("textbox");
    expect(inputEle).toBeInTheDocument();
    const nonExistantListElements = screen.queryAllByTestId("listItem");
    expect(nonExistantListElements).toHaveLength(0);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("Correctly renders the data", async () => {
    user.setup();
    render(<AutoComplete />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "rick");
    // const listItem = await waitFor(() => screen.getByRole("listitem"));
    expect(searchInput).toHaveTextContent("rick");
  });
});
