import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Episode from "@/components/Episode";
import { renderWithQueryClient } from "@/test-utils/index";

test("renders response from query", async () => {
  renderWithQueryClient(<Episode id="1" />);

  const heading = await screen.findByRole("heading", { level: 6 });
  expect(heading).toHaveTextContent("S01E01. Pilot - December 2, 2013");
});
