import Locations from "@/components/Locations";
import { renderWithQueryClient } from "@/test-utils/index";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Locations component", () => {
  test("Renders correctly before fetching data", async () => {
    renderWithQueryClient(<Locations />);

    await waitForElementToBeRemoved(screen.getByText("Loading..."));

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Dimension")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
describe("Locations component", () => {
  beforeEach(async () => {
    renderWithQueryClient(<Locations />);
    await waitForElementToBeRemoved(screen.getByText("Loading..."));
  });
  test("Renders correctly with fetched data", async () => {
    const locationHeaders = screen.getAllByRole("table-header");
    expect(locationHeaders).toHaveLength(20);

    expect(screen.getAllByText("Planet")).toHaveLength(12);
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(screen.getAllByText(/Dimension C-137/i)).toHaveLength(3);
    expect(screen.getByRole("button")).toHaveTextContent("Load More");
  });

  test("Fetches the second page data with load more button and renders correctly", async () => {
    userEvent.setup();
    const loadMoreButton = await screen.findByRole("button");
    await userEvent.click(loadMoreButton);

    await waitFor(() => {
      const locationHeaders = screen.getAllByRole("table-header");
      expect(locationHeaders).toHaveLength(40);
      expect(screen.getByText(/Gazorpazorp/i)).toBeInTheDocument();
    });
  });
});
