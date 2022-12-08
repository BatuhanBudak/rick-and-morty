import { render, screen } from "@testing-library/react";
import { FilterButtons } from "@/components/FilterButtons";

describe("FilterButtons", () => {
  test("renders all the buttons", () => {
    render(<FilterButtons />);
    const filterButtons = screen.getAllByRole("link");

    expect(filterButtons).toHaveLength(6);
  });
  test("buttons have the right href", () => {
    render(<FilterButtons />);
    const firstButton = screen.getByText("Male Characters");
    const secondButton = screen.getByText("Female", { exact: false });
    const thirdButton = screen.getByText("Human", { exact: false });
    const fourthButton = screen.getByText("Alien", { exact: false });
    const fifthButton = screen.getByText("Alive", { exact: false });
    const sixthButton = screen.getByText("Dead", { exact: false });

    expect(firstButton).toHaveAttribute("href", "/?page=1&gender=male");
    expect(secondButton).toHaveAttribute("href", "/?page=1&gender=female");
    expect(thirdButton).toHaveAttribute("href", "/?page=1&species=human");
    expect(fourthButton).toHaveAttribute("href", "/?page=1&species=alien");
    expect(fifthButton).toHaveAttribute("href", "/?page=1&status=alive");
    expect(sixthButton).toHaveAttribute("href", "/?page=1&status=dead");
  });
});
