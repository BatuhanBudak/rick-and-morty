import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Grid from "../../components/Grid";
import Spinner from "../../components/Spinner";

describe("Grid", () => {
  test("renders correctly with props", async () => {
    render(<Grid title="Test" children={<Spinner />} />);

    const headingEle = screen.getByRole("heading");
    expect(headingEle).toBeInTheDocument();
    expect(headingEle).toHaveTextContent("Test");
  });
});
