import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { AutoComplete } from "../../components/AutoComplete";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import { CharacterResponse } from "../../apis/types";

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
