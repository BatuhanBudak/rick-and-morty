import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "../../components/Spinner";

describe("AutoComplete", () => {
  test("renders correctly with props", async () => {
    render(<Spinner />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
