import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "../components/Header";

describe("AutoComplete", () => {
  test("renders correctly with props", async () => {
    render(<Header />);

    const listElements = screen.getAllByRole("listitem");
    expect(listElements).toHaveLength(3);
    const anchorElements = screen.getAllByRole("link");
    expect(anchorElements).toHaveLength(3);
    expect(anchorElements[1]).toHaveAttribute("href", "/episodes");
  });
});
