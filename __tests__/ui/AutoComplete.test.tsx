import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AutoComplete } from "../../components/AutoComplete";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";

describe("Autocomplete", () => {
  test("Correctly renders", () => {
    render(<AutoComplete />);
    const inputEle = screen.getByRole("textbox");
    expect(inputEle).toBeInTheDocument();
    const nonExistantListElements = screen.queryAllByRole("listitem");
    expect(nonExistantListElements).toHaveLength(0);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
  test("Correctly autocomplete fetched character names", async () => {
    user.setup();
    render(<AutoComplete />);
    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "summer");
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
    const listElements = await screen.findAllByRole("listitem");

    expect(listElements).toHaveLength(12);
    expect(searchInput).toHaveValue("summer");
  });
});
