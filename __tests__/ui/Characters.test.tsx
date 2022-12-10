import Characters from "@/components/Characters";
import { renderWithQueryClient } from "@/test-utils";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "@/test-utils/createMockRouter";

describe("Characters component", () => {
  beforeEach(async () => {
    renderWithQueryClient(
      <RouterContext.Provider value={createMockRouter({ query: {} })}>
        <Characters />;
      </RouterContext.Provider>
    );

    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
  });
  test("Renders correctly", async () => {
    expect(screen.getByText("All characters")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
    expect(screen.getByText("Male Characters")).toBeInTheDocument();
    expect(screen.getByText("Female Characters")).toBeInTheDocument();
    expect(screen.getByText("Human Characters")).toBeInTheDocument();
    expect(screen.getByText("Alien Characters")).toBeInTheDocument();
    expect(screen.getByText("Alive Characters")).toBeInTheDocument();
    expect(screen.getByText("Dead Characters")).toBeInTheDocument();
  });
  test("Correctly fetches and renders data", async () => {
    userEvent.setup();
    const headers = screen.getAllByRole("heading", { level: 2 });
    expect(headers).toHaveLength(21);
    expect(
      screen.getByRole("heading", { name: "Abradolf Lincler" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Annie" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Load More" }));

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(41);
    expect(
      screen.getByRole("heading", { name: "Bearded Lady" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Armothy" })
    ).toBeInTheDocument();
  });
});
describe("Characters component", () => {
  beforeEach(async () => {
    const router = createMockRouter({ query: { gender: "male", page: "1" } });
    renderWithQueryClient(
      <RouterContext.Provider value={createMockRouter(router)}>
        <Characters />;
      </RouterContext.Provider>
    );

    await waitForElementToBeRemoved(screen.getByTestId("spinner"));
  });
  test("Correctly fetches and renders data with filters applied", async () => {
    userEvent.setup();
    const headers = screen.getAllByRole("heading", { level: 2 });
    expect(headers).toHaveLength(21);
    expect(
      screen.getByRole("heading", { name: "Armothy" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Armagheadon" })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Load More" }));

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(41);
    expect(
      screen.getByRole("heading", { name: "Bootleg Portal Chemist Rick" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Blue Footprint Guy" })
    ).toBeInTheDocument();
  });
});

describe("Characters component", () => {
  test("Calls router correctly", async () => {
    const router = createMockRouter({ query: { gender: "male", page: "1" } });

    renderWithQueryClient(
      <RouterContext.Provider value={createMockRouter(router)}>
        <Characters />;
      </RouterContext.Provider>
    );

    await waitForElementToBeRemoved(screen.getByTestId("spinner"));

    const characterLink = screen.getByRole("link", { name: "thumb Armothy" });
    await userEvent.click(characterLink);
    expect(router.push).toHaveBeenCalledWith(
      "/characters/25",
      "/characters/25",
      { locale: undefined, scroll: undefined, shallow: undefined }
    );
  });
});
