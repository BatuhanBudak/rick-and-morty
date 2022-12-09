import Episodes from "@/components/Episodes";
import { renderWithQueryClient } from "@/test-utils/index";
import { mockIsIntersecting } from "react-intersection-observer/test-utils";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Episodes component", () => {
  test("Renders correctly before fetching data", async () => {
    renderWithQueryClient(<Episodes />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    const mainHeading = await screen.findByRole("heading", { level: 2 });
    expect(mainHeading).toHaveTextContent("All Episodes");
    const episodeHeadings = screen.queryAllByRole("heading", { level: 6 });
    expect(episodeHeadings).toHaveLength(0);
  });
});
describe("Episodes component", () => {
  beforeEach(async () => {
    renderWithQueryClient(<Episodes />);
    await waitForElementToBeRemoved(() => screen.getByTestId("spinner"));
  });
  test("Renders correctly with fetched data", async () => {
    const episodeHeadings = screen.getAllByRole("heading", { level: 6 });
    expect(episodeHeadings).toHaveLength(20);
    expect(screen.getByText(/S01E01 - Pilot/i)).toBeInTheDocument();
    expect(screen.getByText(/Look Who's Purging Now/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Load More");
  });

  test("Fetches the second page data with intersection observer and renders correctly", async () => {
    const loadMoreButton = await screen.findByRole("button");

    mockIsIntersecting(loadMoreButton, true);

    await waitFor(() => {
      const episodeHeadings = screen.getAllByRole("heading", { level: 6 });
      expect(episodeHeadings).toHaveLength(40);
    });
  });
  test("Fetches the second page data with load more button and renders correctly", async () => {
    userEvent.setup();
    const loadMoreButton = await screen.findByRole("button");
    await userEvent.click(loadMoreButton);

    await waitFor(() => {
      const episodeHeadings = screen.getAllByRole("heading", { level: 6 });
      expect(episodeHeadings).toHaveLength(40);
      expect(screen.getByText(/Rickmancing the Stone/i)).toBeInTheDocument();
    });
  });
});
